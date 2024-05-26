package com.visualstudio.rest.api;

import com.visualstudio.rest.api.models.entities.Product;
import com.visualstudio.rest.api.models.entities.Role;
import com.visualstudio.rest.api.services.impl.UserServiceImpl;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;

@SpringBootApplication
public class VisualStudioApplication {

	public static void main(String[] args) {
		SpringApplication.run(VisualStudioApplication.class, args);
	}
}
