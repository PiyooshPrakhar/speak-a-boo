package com.hackathon.assistance.util;

import java.lang.reflect.Field;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class PasswordEncryptionUtil {

    public static String hashPassword(String rawPassword) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = md.digest(rawPassword.getBytes(StandardCharsets.UTF_8));

            StringBuilder hashBuilder = new StringBuilder();
            for (byte hashByte : hashBytes) {
                hashBuilder.append(String.format("%02x", hashByte));
            }

            return hashBuilder.toString();
        } catch (NoSuchAlgorithmException e) {
            // Handle the case where the specified algorithm is not available
            throw new RuntimeException("Hashing algorithm not available.", e);
        }
    }
}

