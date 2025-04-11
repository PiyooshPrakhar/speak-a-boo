package com.hackathon.assistance.model;

import com.hackathon.assistance.dto.Gender;

public interface UserProjection {
    public String getId();
    public String getFirstName();
    public String getLastName();
    public String getDob();
    public Gender getGender();
    public String getEmailAddress();
    public AvatarPreference getAvatarPreference();
}
