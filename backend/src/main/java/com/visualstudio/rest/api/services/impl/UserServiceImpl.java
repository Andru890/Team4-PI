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
        User existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser != null){
            throw new IllegalArgumentException("El usuario con el correo " + user.getEmail() + " ya existe.");
        } else {
            Role customerRole = roleRepository.findByName("customer");
            user.setRole(customerRole);
            if (user.getRole() == null){
                user.setRole(getDefaultRole());
            }
        }
        return userRepository.save(user);
    }

    @Override
    public User update(User user) {
        return null;
    }

    @Override
    public User update(User user, Long id) {
        User wantedUser = userRepository.findById(id).get();
        wantedUser.setName(user.getName());
        wantedUser.setLastname(user.getLastname());
        wantedUser.setEmail(user.getEmail());
        wantedUser.setPhone(user.getPhone());
        wantedUser.setCity(user.getCity());
        return userRepository.save(wantedUser);
    }

    @Override
    public User getOne(Long id) {
        return userRepository.findById(id).get();
    }
    @Override
    public User findByEmail(String email){
        User user = userRepository.findByEmail(email);
        if (user == null){
            throw new IllegalArgumentException("El usuario con mail " + email + " no está registrado.");
        }
        return user;
    }
    public User confirmRegistration(String email) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            userRepository.save(user);}
        else {
            throw new IllegalArgumentException("El usuario con mail " + email + " no está registrado.");
        }
    return user;

    }
    @Override
    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public User updateRole(Long userId) {
        return null;
    }

    public Role getDefaultRole() {
        return new Role("customer");
    }


}