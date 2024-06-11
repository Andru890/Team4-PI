package com.visualstudio.rest.api.services.impl;


import com.visualstudio.rest.api.services.IEmailService;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements IEmailService {

    private String emailUser = System.getenv("EMAIL.USER");
    @Autowired
    private JavaMailSender mailSender;

    private String lastToUser;
    private String lastSubject;
    private String lastMessage;

    @Override
    public void sendEmail(String toUser, String subject, String message) {

        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo(toUser);
        simpleMailMessage.setSubject(subject);
        simpleMailMessage.setText(message);
        simpleMailMessage.setFrom(emailUser);

        lastToUser = toUser;
        lastSubject = subject;
        lastMessage = message;

        mailSender.send(simpleMailMessage);
    }


    public String getLastToUser() {
        return lastToUser;
    }

    public String getLastSubject() {
        return lastSubject;
    }

    public String getLastMessage() {
        return lastMessage;
    }

}