package com.visualstudio.rest.api.services;

import com.visualstudio.rest.api.dto.EmailDto;

import java.util.List;

public interface IEmailService {

    void sendEmail(String toUser, String subject, String message);

    List<EmailDto> getAllEmails();
}
