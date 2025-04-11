package com.hackathon.assistance.controller;

import com.hackathon.assistance.dto.StatusResponse;
import com.hackathon.assistance.dto.UserDto;
import com.hackathon.assistance.exceptions.ApplicationException;
import com.hackathon.assistance.exceptions.ApplicationCode;
import com.hackathon.assistance.service.UserService;
import com.hackathon.assistance.util.WebClientUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/v1/user")
@RestController()
public class AuthenticationController {
	private static final Logger LOG = LoggerFactory.getLogger(AuthenticationController.class);
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<StatusResponse> registerUser(@RequestBody UserDto userRegistration) {
       if((userRegistration.getEmailAddress() == null || userRegistration.getEmailAddress() == "") ||
               (userRegistration.getPassword() == null || userRegistration.getPassword() == "") ||
               (userRegistration.getFirstName() == null || userRegistration.getFirstName() == "") ||
               (userRegistration.getGender() == null) ||
               (userRegistration.getDob() == null || userRegistration.getDob() == ""))
           throw new ApplicationException("Some of the fields required for registering a user is missing, please verify your input again.",
                   ApplicationCode.INVALID_INPUT, HttpStatus.BAD_REQUEST);
       return new ResponseEntity<>(userService.registerUser(userRegistration), HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<UserDto> loginUser(@RequestBody UserDto userRegistration) {
        if((userRegistration.getEmailAddress() == null || userRegistration.getEmailAddress() == "") ||
                (userRegistration.getPassword() == null || userRegistration.getPassword() == ""))
            throw new ApplicationException("Some of the fields required for registering a user is missing, please verify your input again.",
                    ApplicationCode.INVALID_INPUT, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(userService.loginUser(userRegistration), HttpStatus.OK);
    }

    @PostMapping("/forgotPassword")
    public ResponseEntity<StatusResponse> forgotPassword(@RequestBody UserDto userRegistration) {
        if((userRegistration.getEmailAddress() == null || userRegistration.getEmailAddress() == "") ||
                (userRegistration.getPassword() == null || userRegistration.getPassword() == ""))
            throw new ApplicationException("Some of the fields required for generating password is missing, please verify your input again.",
                    ApplicationCode.INVALID_INPUT, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(userService.forgotPassword(userRegistration), HttpStatus.OK);
    }

    @PostMapping("/verify")
    public ResponseEntity<StatusResponse> verifyUser(@RequestBody UserDto userRegistration) {
        if((userRegistration.getEmailAddress() == null || userRegistration.getEmailAddress() == ""))
            throw new ApplicationException("Some of the fields required for generating password is missing, please verify your input again.",
                    ApplicationCode.INVALID_INPUT, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(userService.verifyUser(userRegistration), HttpStatus.OK);
    }
}
