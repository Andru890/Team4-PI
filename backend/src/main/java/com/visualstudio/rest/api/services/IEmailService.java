package com.visualstudio.rest.api.services;

import com.visualstudio.rest.api.models.dtos.security.EmailDto;
import jakarta.mail.MessagingException;

import java.util.List;

public interface IEmailService {

    void sendEmail(String toUser, String subject, String message) throws MessagingException;

    List<EmailDto> getAllEmails();
}
