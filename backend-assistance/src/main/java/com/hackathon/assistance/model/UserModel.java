package com.hackathon.assistance.model;

import com.hackathon.assistance.dto.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "UserProfile")
public class UserModel {
    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String dob;
    private Gender gender;
    @Indexed
    private String emailAddress;
    private String password;
    private AvatarPreference avatarPreference;
    private List<String> chatIds;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
