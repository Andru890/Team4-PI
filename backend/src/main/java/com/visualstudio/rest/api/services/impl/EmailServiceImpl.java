package com.visualstudio.rest.api.services.impl;


import com.visualstudio.rest.api.models.dtos.security.EmailDto;
import com.visualstudio.rest.api.services.IEmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
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
    public void sendEmail(String toUser, String subject, String htmlContent) throws MessagingException {

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage,  "UTF-8");
        messageHelper.setText(htmlContent, true);
        messageHelper.setTo(toUser);
        messageHelper.setSubject(subject);
        mailSender.send(mimeMessage);
        //SimpleMailMessage message = new SimpleMailMessage();
        //message.setFrom(emailUser);
        //message.setTo(toUser);
        //message.setSubject(subject);
        //message.setText(htmlContent);
        //mailSender.send(message);

    }


    @Override
    public List<EmailDto> getAllEmails() {

        return new ArrayList<>();
    }
}