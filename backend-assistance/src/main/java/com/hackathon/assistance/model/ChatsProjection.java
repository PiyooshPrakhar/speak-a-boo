package com.hackathon.assistance.model;

import com.hackathon.assistance.dto.Gender;

import java.util.List;

public interface ChatsProjection {
    public String getId();
    public List<Message> getChats();
    public String getEmailAddress();
    public AvatarPreference getAvatarPreference();
}
