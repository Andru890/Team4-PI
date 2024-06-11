/* package com.visualstudio.rest.api.controllers;


import com.visualstudio.rest.api.dto.EmailDto;
import com.visualstudio.rest.api.services.IEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/confirmation-email")
public class EmailController {

    @Autowired
    private IEmailService emailService;

    private static final Logger logger = LoggerFactory.getLogger(EmailController.class);
    @PostMapping("/sendMessage")
    public ResponseEntity<?> receiveRequestEmail(@RequestBody EmailDto emailDto){

        logger.info("Enviando correo", emailDto.getToUser());

        emailService.sendEmail(emailDto.getToUser(), emailDto.getSubject(), emailDto.getMessage());

        Map<String, String> response = new HashMap<>();
        response.put("message", "Email enviado a: " + emailDto.getToUser());
        return ResponseEntity.ok(response);
    }
}
*/