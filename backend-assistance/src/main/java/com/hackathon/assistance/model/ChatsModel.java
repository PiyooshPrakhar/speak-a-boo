package com.hackathon.assistance.model;

import com.hackathon.assistance.dto.AvatarPreference;
import com.hackathon.assistance.model.Message;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "UserChats")
public class ChatsModel {
    private String id;
    private AvatarPreference avatarPreference;
    @Indexed
    private String emailAddress;
    private List<Message> chatList;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
