package com.hackathon.assistance.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatsDto {
    private String id;
    private AvatarPreference avatarPreference;
    private String emailAddress;
    private List<Message> chatList;
    private LocalDateTime createdAt;
}
