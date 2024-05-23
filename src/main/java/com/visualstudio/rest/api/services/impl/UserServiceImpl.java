package com.visualstudio.rest.api.services.impl;

import com.visualstudio.rest.api.models.entities.Role;
import com.visualstudio.rest.api.models.entities.User;
import com.visualstudio.rest.api.repositories.RoleRepository;
import com.visualstudio.rest.api.repositories.UserRepository;
import com.visualstudio.rest.api.services.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements IUserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public User save(User user) {
        if (user.getRole() == null){
            user.setRole(getDefaultRol());
        }
        Role role = roleRepository.findById(user.getRole().getId()).get();
        user.setRole(role);
        return userRepository.save(user);
    }

    @Override
    public User update(User user) {
        return userRepository.save(user);
    }

    @Override
    public User findById(Long id) {
        return userRepository.findById(id).get();
    }

    @Override
    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    public Role getDefaultRol() {
        return new Role(1L, "customer");
    }
}
