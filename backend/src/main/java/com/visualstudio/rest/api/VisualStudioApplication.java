package com.visualstudio.rest.api;


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
