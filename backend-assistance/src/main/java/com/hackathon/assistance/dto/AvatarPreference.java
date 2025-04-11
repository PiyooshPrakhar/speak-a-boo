package com.hackathon.assistance.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AvatarPreference {
    private Integer key;
    private String name;
    private String companionType;
}
