package com.visualstudio.rest.api;


import com.visualstudio.rest.api.models.entities.Role;
import com.visualstudio.rest.api.models.entities.User;
import com.visualstudio.rest.api.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.visualstudio.rest.api")
public class VisualStudioApplication {

	public static void main(String[] args) {
		SpringApplication.run(VisualStudioApplication.class, args);
	}
}
