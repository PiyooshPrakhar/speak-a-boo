package com.hackathon.assistance.model;

import com.hackathon.assistance.model.Message;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Choices {
    private Integer index;
    private Message message;
}