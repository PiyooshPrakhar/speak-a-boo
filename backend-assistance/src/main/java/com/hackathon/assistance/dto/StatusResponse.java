package com.hackathon.assistance.dto;

import com.hackathon.assistance.exceptions.ApplicationCode;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StatusResponse {
    private Boolean status;
    private ApplicationCode statusCode;
    private String statusMessage;
}
