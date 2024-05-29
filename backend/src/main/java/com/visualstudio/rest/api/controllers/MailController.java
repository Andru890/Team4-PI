/*

 package com.visualstudio.rest.api.controllers;

*import com.visualstudio.rest.api.enums.exceptions.ResourceExistException;
*import com.visualstudio.rest.api.models.entities.User;
*import com.visualstudio.rest.api.services.impl.MailService;
*import org.springframework.beans.factory.annotation.Autowired;
*import org.springframework.http.HttpStatus;
*import org.springframework.http.ResponseEntity;
*import org.springframework.web.bind.annotation.*;

*import java.util.HashMap;
*import java.util.Optional;
*import java.util.logging.Logger;

*import com.visualstudio.rest.api.enums.exceptions.MailSenderException;
*import com.visualstudio.rest.api.services.impl.UserServiceImpl;
*@RestController
*@RequestMapping("/mail")
*@CrossOrigin (origins = "*")
*public class MailController {

*private final UserServiceImpl userService;

*private final MailService mailService;
*private final Logger logger = Logger.getLogger(MailController.class.getName());

*private HashMap<Long, HashMap<String, Long>> response = new HashMap<>();

*@Autowired
*public MailController(UserServiceImpl userService, MailService mailService) {
 *   this.userService = userService;
  *  this.mailService = mailService;}

*@GetMapping("validacion/{id}")
*public void sendMail(@PathVariable Long id) throws MailSenderException {
 *   HashMap<String, Long> solicitudesUsuario = (HashMap<String, Long>) response.get(id);
  *  if (solicitudesUsuario == null) {
   *     solicitudesUsuario = new HashMap<String, Long>();
    *    solicitudesUsuario.put("solicitudes", 1L);
     *   solicitudesUsuario.put("timestamp", System.currentTimeMillis() / 1000);
      *  response.put(Long.valueOf(String.valueOf((id))), solicitudesUsuario);
    *}
    *logger.info("ID: " + id);
    *logger.info("Solicitudes: " + solicitudesUsuario.get("solicitudes"));
    *logger.info("Timestamp: " + solicitudesUsuario.get("timestamp"));

    *if (solicitudesUsuario.get("solicitudes") > 3 && (System.currentTimeMillis() / 1000) - solicitudesUsuario.get("timestamp") < 60) {
    *    throw new MailSenderException("Demasiadas solicitudes de validación");
    *}

    *if ((System.currentTimeMillis() / 1000) - solicitudesUsuario.get("timestamp") > 60) {
     *   solicitudesUsuario.put("solicitudes", 1L);
      *  solicitudesUsuario.put("timestamp", System.currentTimeMillis() / 1000);
    *} else {
     *   solicitudesUsuario.put("solicitudes", solicitudesUsuario.get("solicitudes") + 1);
    }

    Optional<User> user = Optional.ofNullable(userService.findById(id));
    if (user.isEmpty()) {
        throw new MailSenderException("No existe usuario");
    }

    mailService.SendingValidationEmail(user.get());

}

@GetMapping("bienvenida/{id}")
public void sendWelcomeMail(@PathVariable Long id) throws MailSenderException {
    Optional<User> user = Optional.ofNullable(userService.findById(id));
    if (user.isEmpty()) {
        throw new MailSenderException("No existe usuario");
    }

    mailService.sendWelcomeEmail(user.get().getName());}

    @ExceptionHandler(ResourceExistException.class)
    public ResponseEntity<String> handleBadRequestException(ResourceExistException exc) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exc.getMessage());
    }

    public void setSolicitudes(HashMap<Long, HashMap<String, Long>> response) {
        this.response = response;
    }
}
*/
/*
*/
