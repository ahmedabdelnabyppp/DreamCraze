package com.dreamcraze.dreamcraze.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dreamcraze.dreamcraze.model.User;
import com.dreamcraze.dreamcraze.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Map<String, Object> getAllUser() {
        List<User> allUserFromDb = userRepository.findAll();
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("message", "success");
        responseBody.put("users", allUserFromDb);
        return responseBody;

    }
}
