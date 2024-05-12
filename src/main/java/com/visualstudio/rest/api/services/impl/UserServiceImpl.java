package com.visualstudio.rest.api.services.impl;
import com.visualstudio.rest.api.services.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.visualstudio.rest.api.models.entities.User;
import com.visualstudio.rest.api.repositories.UserRepository;

import java.util.List;
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements IUserService{

    public final UserRepository userRepository;

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public User update(User user, Long Id) {
        return null;
    }

    @Override
    public User findById(Long Id) {
        return userRepository.findById(Id).orElse(null);
    }

    @Override
    public void delete(Long Id) {
        userRepository.deleteById(Id);
    }




}
