package com.hackathon.assistance.serviceImpl;

import com.hackathon.assistance.dto.StatusResponse;
import com.hackathon.assistance.dto.UserDto;
import com.hackathon.assistance.exceptions.ApplicationException;
import com.hackathon.assistance.exceptions.ApplicationCode;
import com.hackathon.assistance.model.UserProjection;
import com.hackathon.assistance.model.UserModel;
import com.hackathon.assistance.repository.UserRepository;
import com.hackathon.assistance.service.UserService;
import com.hackathon.assistance.util.MapperUtil;
import com.hackathon.assistance.util.PasswordEncryptionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private MapperUtil mapperUtil;

    @Autowired
    private UserRepository userRepository;

    public StatusResponse registerUser (UserDto userRegistration) {
        UserModel userRegistrationModel = this.mapperUtil.convertToModel(userRegistration, UserModel.class);
        userRegistrationModel.setPassword(PasswordEncryptionUtil.hashPassword(userRegistration.getPassword()));
        userRegistrationModel.setCreatedAt(LocalDateTime.now());

        Optional<UserProjection> matchedUser = userRepository.findByEmailAddress(userRegistration.getEmailAddress());
        if(matchedUser.isPresent()) {
            return new StatusResponse(false, ApplicationCode.USER_ALREADY_EXISTS, "User Registration Failed");
        } else {
            userRepository.save(userRegistrationModel);
            return new StatusResponse(true, ApplicationCode.USER_REGISTERED, "User Registered Successfully!");
        }
    }

    @Override
    public UserDto loginUser(UserDto userRegistration) {
        UserModel userLoginModel = this.mapperUtil.convertToDto(userRegistration, UserModel.class);
        String hashedPassword = PasswordEncryptionUtil.hashPassword(userLoginModel.getPassword());
        Optional<UserProjection> matchedUser = userRepository.findByEmailAddressAndPassword(userLoginModel.getEmailAddress(),
                hashedPassword);
        if(matchedUser.isPresent()) {
            UserProjection loggedInUser = matchedUser.get();
            return this.mapperUtil.convertToDto(loggedInUser, UserDto.class);
        } else throw new ApplicationException("Email Address or Password is incorrect",
              ApplicationCode.INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED);
    }

    @Override
    public StatusResponse forgotPassword(UserDto userRegistration) {
        UserModel userForgotPasswordModel = this.mapperUtil.convertToDto(userRegistration, UserModel.class);
        Optional<UserModel> matchedUser = userRepository.findByEmailAddress(userForgotPasswordModel.getEmailAddress(),
                userForgotPasswordModel.getDob());

        if(matchedUser.isPresent()) {
            UserModel matchedUserModel = matchedUser.get();
            matchedUserModel.setUpdatedAt(LocalDateTime.now());
            matchedUserModel.setPassword(PasswordEncryptionUtil.hashPassword(userForgotPasswordModel.getPassword()));
            userRepository.save(matchedUserModel);
            return new StatusResponse(true, ApplicationCode.PASSWORD_UPDATED, "Password Changed Successfully!");
        } else throw new ApplicationException("Incorrect input received",
                ApplicationCode.INVALID_INPUT, HttpStatus.BAD_REQUEST);
    }

    public StatusResponse verifyUser (UserDto userRegistration) {
        UserModel userRegistrationModel = this.mapperUtil.convertToModel(userRegistration, UserModel.class);

        Optional<UserProjection> matchedUser = userRepository.findByEmailAddress(userRegistrationModel.getEmailAddress());

        if(matchedUser.isPresent()) {
            return new StatusResponse(true, ApplicationCode.USER_VERIFIED, "Recovery Password - Enabled");
        } else return new StatusResponse(false, ApplicationCode.USER_DOES_NOT_EXISTS, "Recovery Password - Failed");
    }

    @Override
    public UserDto savePreference(UserDto userDto) {
        UserModel userPreferenceModel = this.mapperUtil.convertToModel(userDto, UserModel.class);
        Optional<UserModel> byId = userRepository.findById(userPreferenceModel.getId());
        this.userRepository.findById(userPreferenceModel.getId())
                .ifPresentOrElse(userModel -> {
                    userModel.setAvatarPreference(userPreferenceModel.getAvatarPreference());
                    userModel.setUpdatedAt(LocalDateTime.now());
                    this.userRepository.save(userModel);
                },() -> new ApplicationException("User does not exist", ApplicationCode.USER_DOES_NOT_EXISTS, HttpStatus.BAD_REQUEST));
        return userDto;
    }
}
