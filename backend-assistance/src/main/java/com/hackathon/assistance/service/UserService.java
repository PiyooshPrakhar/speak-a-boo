package com.hackathon.assistance.service;

import com.hackathon.assistance.dto.StatusResponse;
import com.hackathon.assistance.dto.UserDto;

public interface UserService {
    public StatusResponse registerUser (UserDto userRegistration);
    public UserDto loginUser (UserDto userRegistration);
    public StatusResponse forgotPassword (UserDto userRegistration);
    public StatusResponse verifyUser (UserDto userRegistration);
    public UserDto savePreference (UserDto userDto);
}
