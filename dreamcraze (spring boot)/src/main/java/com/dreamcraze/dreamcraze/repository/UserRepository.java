package com.dreamcraze.dreamcraze.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.dreamcraze.dreamcraze.model.User;




public interface UserRepository extends JpaRepository<User,Integer> {
    Optional<User> findByEmail(String email);
    User findById(int id);
}
