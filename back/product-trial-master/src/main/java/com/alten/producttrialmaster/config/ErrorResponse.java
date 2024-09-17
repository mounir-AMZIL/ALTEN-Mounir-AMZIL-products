package com.alten.producttrialmaster.config;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ErrorResponse {
    // Getters and setters
    private int status;
    private String message;
    private String path;

}
