package com.visualstudio.rest.api.services.impl;

<<<<<<< HEAD
import com.visualstudio.rest.api.models.entities.Rol;
import com.visualstudio.rest.api.models.entities.User;
import com.visualstudio.rest.api.repositories.RolRepository;
=======
import com.visualstudio.rest.api.models.entities.Role;
import com.visualstudio.rest.api.models.entities.User;
import com.visualstudio.rest.api.repositories.RoleRepository;
>>>>>>> origin/back-end
import com.visualstudio.rest.api.repositories.UserRepository;
import com.visualstudio.rest.api.services.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements IUserService {

    private final UserRepository userRepository;
<<<<<<< HEAD
    private final RolRepository rolRepository;
=======
    private final RoleRepository roleRepository;
>>>>>>> origin/back-end

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public User save(User user) {
<<<<<<< HEAD
        Rol rol = rolRepository.findById(user.getRol().getId()).get();
        user.setRol(rol);
=======
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
>>>>>>> origin/back-end
        return userRepository.save(user);
    }

    @Override
    public User update(User user) {
        return userRepository.save(user);
    }

    @Override
<<<<<<< HEAD
    public User findById(Long id) {
=======
    public User getOne(Long id) {
>>>>>>> origin/back-end
        return userRepository.findById(id).get();
    }

    @Override
    public void delete(Long id) {
        userRepository.deleteById(id);
    }
<<<<<<< HEAD
=======

    public Role getDefaultRole() {
        return new Role("customer");
    }

    public void createAdminRole(){
        if(roleRepository.findByName("admin") == null){
            Role adminRole = new Role("admin");
            roleRepository.save(adminRole);
        }
    }

    public User updateRole(Long userId){
            User user = userRepository.findById(userId).get();
            Role newRole = roleRepository.findByName("admin");

            if (newRole == null){
                updateRole(userId);
            }

            if (user.getRole().getName() == "customer"){
                user.setRole(newRole);
            } else if (user.getRole().getName() == "admin") {
                user.setRole(roleRepository.findByName("customer"));
            }
            return userRepository.save(user);
    }

>>>>>>> origin/back-end
}
