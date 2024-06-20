package com.visualstudio.rest.api.controllers;


import com.visualstudio.rest.api.models.dtos.security.EmailDto;
import com.visualstudio.rest.api.services.IEmailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/mail")
public class MailController {
    @Autowired
    private IEmailService emailService;

    @PostMapping ("/send")
    public ResponseEntity<?> sendEmail(@RequestBody EmailDto emailDto) throws MessagingException {
        emailService.sendEmail(emailDto.getToUser(), emailDto.getSubject(), emailDto.getMessage());
        Map <String, Object> response = new HashMap<>();
        response.put("message", "Email enviado");
        return  ResponseEntity.ok(response);
    }

    @GetMapping ("/List")
    public ResponseEntity<?> getAllEmails() {
        emailService.getAllEmails();
        return  ResponseEntity.ok(emailService.getAllEmails());
    }
}
