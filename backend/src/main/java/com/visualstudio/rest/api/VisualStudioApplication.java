package com.visualstudio.rest.api;

import com.visualstudio.rest.api.models.entities.Product;
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
		SpringApplication app = new SpringApplication(VisualStudioApplication.class);
        Map<String, Object> properties = new HashMap<>();
        String port = System.getenv("PORT");
        if (port != null) {
            properties.put("server.port", port);
        }
        app.setDefaultProperties(properties);
        app.run(args);
	}
}
