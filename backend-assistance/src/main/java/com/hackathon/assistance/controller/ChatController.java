package com.hackathon.assistance.controller;

import com.hackathon.assistance.dto.ChatsDto;
import com.hackathon.assistance.dto.DataPoint;
import com.hackathon.assistance.dto.UserDto;
import com.hackathon.assistance.model.OpenAIResponse;
import com.hackathon.assistance.model.Prompt;
import com.hackathon.assistance.service.ChatService;
import com.hackathon.assistance.service.UserService;
import com.hackathon.assistance.util.WebClientUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RequestMapping("/api/v1/chat")
@RestController()
public class ChatController {
    @Autowired
    private UserService userService;
    @Autowired
    private ChatService chatService;
    @Autowired
    private WebClientUtil webClientUtil;
    @PostMapping("/update")
    public <R> ResponseEntity<R> chat(@RequestBody Prompt prompt) {
        try {
            OpenAIResponse response=webClientUtil.execute(HttpMethod.POST,"/pgchat", prompt, OpenAIResponse.class);
            return new ResponseEntity<>((R) response, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<R>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/startUserSession")
    public ResponseEntity<ChatsDto> startUserSession(@RequestBody ChatsDto chatsDto) {
        return new ResponseEntity<>(chatService.startUserSession(chatsDto), HttpStatus.OK);
    }
    @PostMapping("/getNextStatement")
    public ResponseEntity<ChatsDto> getNextStatement(@RequestBody ChatsDto chatsDto) {
        return new ResponseEntity<>(chatService.getNextStatement(chatsDto), HttpStatus.OK);
    }
    @PostMapping("/saveAvatar")
    public ResponseEntity<UserDto> saveAvatar(@RequestBody UserDto userDto) {
        return new ResponseEntity<>(userService.savePreference(userDto), HttpStatus.OK);
    }

    @PostMapping("/getChatHistory")
    public ResponseEntity<List<ChatsDto>> getChatHistory(@RequestBody UserDto userDto) {
        return new ResponseEntity<>(chatService.getChatHistory(userDto), HttpStatus.OK);
    }

    @PostMapping("/getDataPoint")
    public ResponseEntity<Map<String, List<DataPoint>>> getDataPoint(@RequestBody UserDto userDto) {
        return new ResponseEntity<>(chatService.getDataPoint(userDto), HttpStatus.OK);
    }
}
