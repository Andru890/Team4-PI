package com.visualstudio.rest.api.services.impl;

import com.visualstudio.rest.api.dto.Entrada.ReservationEntradaDto;
import com.visualstudio.rest.api.enums.MailEnum;
import com.visualstudio.rest.api.exceptions.MailSenderException;
import com.visualstudio.rest.api.models.entities.User;
import com.visualstudio.rest.api.utils.MailUtil;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;

import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.regex.Pattern;


@Service
@EnableAsync
public class MailService {

    private static final Logger logger = Logger.getLogger(MailService.class.getName());
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");

    @Autowired
    private JavaMailSender emailSender;

    @Value("${spring.mail.username}")
    private String username;

    @Value("${frontend.url}")
    private String frontendUrl;

    @Autowired
    private MailUtil mailUtil;

    @Async
    public void sendMail(String to, String subject, String body) throws MailSenderException {
        logger.info("El correo fue enviado");

        if (to == null || !EMAIL_PATTERN.matcher(to).matches()) {
            throw new MailSenderException("Correo electrónico invalido: " + to);
        }
        if (subject == null || subject.isEmpty()) {
            throw new MailSenderException("No puede ser nulo o vacio");
        }
        if (body == null || body.isEmpty()) {
            throw new MailSenderException("No puede ser nulo o vacio");
        }
        try {
            MimeMessage mimeMessage = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
            helper.setTo(to);
            helper.setFrom(String.valueOf(new InternetAddress(username)));
            helper.setSubject(subject);
            helper.setText(body, true); // Set to true for HTML content
            emailSender.send(mimeMessage);
        } catch (Exception e) {
            logger.log(Level.WARNING, "Failed to send email: " + e.getMessage());
            throw new MailSenderException("Failed to send email");
        } finally {
            logger.info("End sendMail");
        }
    }

    @Async
    public void SendingValidationEmail (User userEntradaDto) throws MailSenderException {
        try {
            String url = frontendUrl + "usuario/validar/" + userEntradaDto.getName();
            String body = mailUtil.ValidationEmail(url, userEntradaDto.getName());
            sendMail(userEntradaDto.getEmail(), MailEnum.VALIDACION_CUENTA.toString(), body);
        } catch (Exception e) {
            throw new MailSenderException("Failed to send validation email");
        }
    }

    @Async
    public void sendWelcomeEmail (String user) throws MailSenderException {
        try {
            String body = mailUtil.WelcomeEmail(user.getName());
            sendMail(user.getEmail(), MailEnum.BIENVENIDA.toString(), body);
        } catch (Exception e) {
            throw new MailSenderException("Failed to send welcome email");
        }
    }

    @Async
    public void SendingReservationEmail (String email, ReservationEntradaDto reservationEntradaDto) throws MailSenderException {
        try {
            String body = mailUtil.ReservationEmail(reservationEntradaDto);
            sendMail(email, MailEnum.RESERVA.toString(), body);
        } catch (Exception e) {
            throw new MailSenderException("Failed to send reservation email");
        }
    }
}
