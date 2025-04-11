package com.hackathon.assistance.serviceImpl;

import com.hackathon.assistance.dto.Constants;
import com.hackathon.assistance.dto.DataPoint;
import com.hackathon.assistance.dto.UserDto;
import com.hackathon.assistance.model.OpenAIResponse;
import com.hackathon.assistance.dto.ChatsDto;
import com.hackathon.assistance.dto.Role;
import com.hackathon.assistance.exceptions.ApplicationCode;
import com.hackathon.assistance.exceptions.ApplicationException;
import com.hackathon.assistance.model.ChatsModel;
import com.hackathon.assistance.model.Message;
import com.hackathon.assistance.model.Prompt;
import com.hackathon.assistance.model.UserModel;
import com.hackathon.assistance.repository.ChatRepository;
import com.hackathon.assistance.repository.UserRepository;
import com.hackathon.assistance.service.ChatService;
import com.hackathon.assistance.util.MapperUtil;
import com.hackathon.assistance.util.WebClientUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ChatServiceImpl implements ChatService {
    @Autowired
    private MapperUtil mapperUtil;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ChatRepository chatRepository;
    @Autowired
    private WebClientUtil webClientUtil;

    @Override
    public ChatsDto startUserSession(ChatsDto chatsDto) {
        ChatsModel chatsModel = this.mapperUtil.convertToModel(chatsDto, ChatsModel.class);
        Optional<UserModel> matchedUser = userRepository.findByEmailAddress(chatsModel.getEmailAddress(), null);
        chatsModel.setCreatedAt(LocalDateTime.now());
        ChatsModel insertedChat = chatRepository.insert(chatsModel);
        if(insertedChat.getId() != null && matchedUser.isPresent()) {
            UserModel userModel = matchedUser.get();
            List<String> chatIds = userModel.getChatIds();
            if(chatIds == null){
                chatIds = new ArrayList<>();
            }
            chatIds.add(insertedChat.getId());
            userModel.setChatIds(chatIds);
            userRepository.save(userModel);
            return this.mapperUtil.convertToModel(insertedChat, ChatsDto.class);
        } else throw new ApplicationException("Failed to update chats",
                    ApplicationCode.UPDATE_CHAT_FAILED, HttpStatus.BAD_REQUEST);
    }

    @Override
    public ChatsDto getNextStatement(ChatsDto chatsDto) {
        ChatsModel chatsModel = this.mapperUtil.convertToModel(chatsDto, ChatsModel.class);
        Optional<ChatsModel> foundChats = chatRepository.findById(chatsModel.getId());
        OpenAIResponse openAIResponse = null;
        if(foundChats.isPresent()){
            ChatsModel foundChatModel = foundChats.get();
            List<Message> chatList = chatsModel.getChatList();
            // Call external OpenAI API to get the next generated statement
            try {
                openAIResponse = webClientUtil
                        .execute(HttpMethod.POST,"/pgchat", createPayloadForOpenAINextStatement(chatList), OpenAIResponse.class);
                if(openAIResponse != null && openAIResponse.getChoices().size() > 0) {
                    Message message = openAIResponse.getChoices().get(0).getMessage();
                    chatList.add(message);
                }
            } catch (Exception e) {
                throw new ApplicationException("Failed to update chats",
                        ApplicationCode.UPDATE_CHAT_FAILED, HttpStatus.BAD_REQUEST);
            }
            foundChatModel.setChatList(chatList);
            foundChatModel.setUpdatedAt(LocalDateTime.now());
            chatRepository.save(foundChats.get());
            return this.mapperUtil.convertToModel(foundChatModel, ChatsDto.class);
        } else throw new ApplicationException("Failed to update chats",
                ApplicationCode.UPDATE_CHAT_FAILED, HttpStatus.BAD_REQUEST);
    }

    @Override
    public List<ChatsDto> getChatHistory(UserDto userDto) {
        UserModel userModel = this.mapperUtil.convertToDto(userDto, UserModel.class);
        Optional<UserModel> matchedUser = userRepository.findByEmailAddress(userModel.getEmailAddress(),
                userModel.getDob());
        List<ChatsDto> historicChats = new ArrayList<>();
        if(matchedUser.isPresent()) {
            UserModel getUser = matchedUser.get();
            if(getUser.getChatIds() != null && getUser.getChatIds().size() != 0) {
                List<String> chatIds = getUser.getChatIds();
                for (String chatId:chatIds) {
                    ChatsModel chatById = chatRepository.findById(chatId).get();
                    ChatsDto chatDtoById = this.mapperUtil.convertToModel(chatById, ChatsDto.class);
                    historicChats.add(chatDtoById);
                }
                return historicChats;
            } else
                throw new ApplicationException("No chat history found",
                        ApplicationCode.CHAT_HISTORY_NOT_FOUND, HttpStatus.BAD_REQUEST);
        } else
            throw new ApplicationException("User does not exist",
                    ApplicationCode.USER_DOES_NOT_EXISTS, HttpStatus.BAD_REQUEST);
    }

    @Override
    public Map<String, List<DataPoint>> getDataPoint(UserDto userDto) {
        Map<String, List<DataPoint>> datapointsMap = new HashMap<>();
        List<DataPoint> brushChartDataPointList = new ArrayList<>();
        List<DataPoint> scatterChartDataPointList = new ArrayList<>();
        String analysisStatement = "";
        UserModel userModel = this.mapperUtil.convertToDto(userDto, UserModel.class);
        Optional<UserModel> matchedUser = userRepository.findByEmailAddress(userModel.getEmailAddress(),
                userModel.getDob());
        OpenAIResponse openAIResponse = null;

        if(matchedUser.isPresent()) {
            UserModel getUser = matchedUser.get();
            if(getUser.getChatIds() != null && getUser.getChatIds().size() != 0) {
                List<String> chatIds = getUser.getChatIds();
                for (String chatId:chatIds) {
                    ChatsModel chatById = chatRepository.findById(chatId).get();
                    LocalDateTime createdAt = chatById.getCreatedAt();
                    LocalDateTime updatedAt = chatById.getUpdatedAt();
                    // Extract datapoints for BrushChart and ScatterChart
                    if(updatedAt != null) {
                        DataPoint dataPoint = new DataPoint();
                        Duration duration = Duration.between(createdAt, updatedAt);
                        long minutes = duration.toMinutes() % 60;
                        dataPoint.setKey(createdAt.getDayOfWeek().toString());
                        dataPoint.setValue(String.valueOf(minutes));
                        brushChartDataPointList.add(dataPoint);
                    }

                    if(chatById.getChatList().size() != 0) {
                        DataPoint scatterDataPoint = new DataPoint();
                        scatterDataPoint.setKey(String.valueOf(createdAt.getDayOfWeek().getValue()));
                        scatterDataPoint.setValue(String.valueOf(chatById.getChatList().size()));
                        scatterChartDataPointList.add(scatterDataPoint);
                    }

                    // Extract datapoints for AreaChart
                    List<Message> chatList = chatById.getChatList();
                    int maxTwoContextStatementInAllChat = 0;
                    if(chatList.size() >= 3){
                        for(Message chat: chatList) {
                            if(chat.getRole().equals(Role.user)){
                                ++maxTwoContextStatementInAllChat;
                                analysisStatement += chat.getContent();
                            }
                            if(maxTwoContextStatementInAllChat == 2)
                                break;
                        }
                    }
                }
                try {
                    Prompt prompt = new Prompt(analysisStatement, Constants.EMOTIONAL_ANALYSIS_PROMPT);
                    openAIResponse = webClientUtil
                            .execute(HttpMethod.POST,"/pgchat", prompt, OpenAIResponse.class);
                    if(openAIResponse != null && openAIResponse.getChoices().size() > 0) {
                        Message message = openAIResponse.getChoices().get(0).getMessage();
                        DataPoint dataPoint = new DataPoint();
                        dataPoint.setKey("emotionalAnalysis");
                        dataPoint.setValue(message.getContent());
                        datapointsMap.put("RadarChart", List.of(dataPoint));
                    }
                } catch (Exception e) {
                    throw new ApplicationException("Failed to update chats",
                            ApplicationCode.UPDATE_CHAT_FAILED, HttpStatus.BAD_REQUEST);
                }

                datapointsMap.put("ScatterChart", scatterChartDataPointList);
                datapointsMap.put("BrushChart", brushChartDataPointList);

                return datapointsMap;
            } else
                throw new ApplicationException("No chat history found",
                        ApplicationCode.CHAT_HISTORY_NOT_FOUND, HttpStatus.BAD_REQUEST);
        } else
            throw new ApplicationException("User does not exist",
                    ApplicationCode.USER_DOES_NOT_EXISTS, HttpStatus.BAD_REQUEST);
    }

    private Prompt createPayloadForOpenAINextStatement(List<Message> chatList) {
        Message userMessage = chatList.get(chatList.size() - 1);
        if(userMessage.getRole().equals(Role.user)) {
           String query = userMessage.getContent();
           String prompt = chatList.stream()
                .limit(chatList.size() - 1)
                .map(message -> "{'role':'" + message.getRole().toString() + "','content':'" + message.getContent() + "'}")
                .collect(Collectors.joining("," , "[", "]"));

           return new Prompt(query, prompt);
        }
        else throw new ApplicationException("Role should be user",
                ApplicationCode.INVALID_ROLE, HttpStatus.BAD_REQUEST);
    }
}
