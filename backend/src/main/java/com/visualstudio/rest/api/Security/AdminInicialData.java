package com.visualstudio.rest.api.Security;

import com.visualstudio.rest.api.models.entities.Role;
import com.visualstudio.rest.api.models.entities.User;
import com.visualstudio.rest.api.repositories.RoleRepository;
import com.visualstudio.rest.api.repositories.UserRepository;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class AdminInicialData implements ApplicationRunner {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Transactional
    @Override
    public void run(ApplicationArguments args) throws Exception {

        User adminExist = userRepository.findByEmail("admin@admin.com");
        if (adminExist == null) {
            Role adminRole = new Role("admin");
            roleRepository.save(adminRole);
            User adminUser = new User();
            adminUser.setName("admin");
            adminUser.setLastname("admin");
            adminUser.setEmail("admin@admin.com");
            adminUser.setPassword("admin");
            adminUser.setPhone("123");
            adminUser.setCity("admin");
            adminUser.setImageUrl("null");
            adminUser.setRole(adminRole);
            adminUser.setConfirmed(true);
            userRepository.save(adminUser);
        }
    }
}
