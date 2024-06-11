package com.visualstudio.rest.api.configuration;

;
import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration

public class EmailConfiguration {

    private String emailUser= System.getenv("EMAIL.USER");
    private String emailPassword= System.getenv("EMAIL.PASSWORD");

    @Bean
    public JavaMailSender getJavaMailSender () {

        JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();
        javaMailSender.setHost("smtp.gmail.com");
        javaMailSender.setPort(587);

        javaMailSender.setUsername(emailUser);
        javaMailSender.setPassword(emailPassword);

        Properties props = javaMailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");

        return javaMailSender;
    }
    @PostConstruct
    public void removeSensitiveDataFromLogs() {
        emailUser = "***";
        emailPassword = "***";
    }
}
