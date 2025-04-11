package com.hackathon.assistance.repository;

import com.hackathon.assistance.model.ChatsModel;
import com.hackathon.assistance.model.ChatsProjection;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChatRepository extends MongoRepository<ChatsModel, String> {
    public Optional<ChatsProjection> findByEmailAddress(String emailAddress);
}
