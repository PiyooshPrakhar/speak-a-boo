package com.hackathon.assistance.repository;

import com.hackathon.assistance.model.UserProjection;
import com.hackathon.assistance.model.UserModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<UserModel, String> {
    public Optional<UserProjection> findByEmailAddress(String email);
    public Optional<UserProjection> findByEmailAddressAndPassword(String emailAddress, String hashedPassword);
    public Optional<UserModel> findByEmailAddress(String emailAddress, String dob);

}
