package com.visualstudio.rest.api.services.impl;


import com.visualstudio.rest.api.models.dtos.security.EmailDto;
import com.visualstudio.rest.api.services.IEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmailServiceImpl implements IEmailService {

    @Value("${mail.sender}")
    private String emailUser;
    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendEmail(String toUser, String subject, String message) {

        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo(toUser);
        simpleMailMessage.setSubject(subject);
        simpleMailMessage.setText(message);
        simpleMailMessage.setFrom(emailUser);

        mailSender.send(simpleMailMessage);
    }


    @Override
    public List<EmailDto> getAllEmails() {

        return new ArrayList<>();
    }
}