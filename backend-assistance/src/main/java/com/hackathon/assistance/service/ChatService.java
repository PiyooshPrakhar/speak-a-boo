package com.hackathon.assistance.service;

import com.hackathon.assistance.dto.ChatsDto;
import com.hackathon.assistance.dto.DataPoint;
import com.hackathon.assistance.dto.UserDto;

import java.util.List;
import java.util.Map;

public interface ChatService {
    public ChatsDto startUserSession(ChatsDto chatsDto);
    public ChatsDto getNextStatement(ChatsDto chatsDto);
    public List<ChatsDto> getChatHistory (UserDto userDto);
    public Map<String, List<DataPoint>> getDataPoint(UserDto userDto);

}
