package com.visualstudio.rest.api.Security;

import com.visualstudio.rest.api.models.entities.Role;
import com.visualstudio.rest.api.models.entities.User;
import com.visualstudio.rest.api.repositories.RoleRepository;
import com.visualstudio.rest.api.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class InicialData implements ApplicationRunner {
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        /*User adminUser = new User();
        Role adminRole = new Role("admin");
        roleRepository.save(adminRole);
        adminUser.setName("admin");
        adminUser.setLastname("admin");
        adminUser.setEmail("admin@admin.com");
        adminUser.setPhone("admin");
        adminUser.setCity("admin");
        adminUser.setPassword("admin");
        adminUser.setRole(adminRole);
        userRepository.save(adminUser);*/
    }
}
