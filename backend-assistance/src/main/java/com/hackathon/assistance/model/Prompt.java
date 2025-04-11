package com.hackathon.assistance.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Prompt {
    private String query;
    private String prompt;
    private Integer tokens = 200;
    private Double temp = 1.0;
    private Double top_p = 1.0;
    private Double freq_penalty = 0.0;
    private Double pres_penalty = 0.0;
    private String stop_s = "";
    public Prompt(String query, String prompt) {
        this.query = query;
        this.prompt = prompt;
    }
}
