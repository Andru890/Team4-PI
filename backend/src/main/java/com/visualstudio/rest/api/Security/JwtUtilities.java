package com.visualstudio.rest.api.Security;

import com.visualstudio.rest.api.configuration.MailConfiguration;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.StringUtils;


import javax.crypto.SecretKey;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

@Slf4j
@Component
public class JwtUtilities {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private MailConfiguration mailConfiguration;

    @Value("${mail.sender}")
    private String emailUser;

    private final String secretKey= "4sRGsHtzZbQjNVTJkG9z5f3Q6vTnZ2s7cKxG6ZfRf2RqKrXQYvJpCxJ9X54WcTJ";
    private final long jwtExpiration = 1000 * 60 * 60 * 10;



    private SecretKey getKey() {
        return Keys.hmacShaKeyFor(Base64.getDecoder().decode(secretKey));}


      public String extractUserName(String token) {
        return extractClaim(token, Claims::getSubject);
    }


    private Claims getAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String email = extractUserName(token);
        return (email.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public String generateToken(String Email, List<String> roles, String name, String lastname, String phone, String city, String imageUrl,Map<String, Object> additionalClaims) {
        JwtBuilder builder= Jwts.builder()
                .subject(Email)
                .claim("roles", roles)
                .claim("name", name)
                .claim("lastname", lastname)
                .claim("phone", phone)
                .claim("city", city)
                .claim("imageUrl", imageUrl)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(Date.from(Instant.now().plus(jwtExpiration, ChronoUnit.MILLIS)))
                .signWith(getKey());
        if (additionalClaims != null) {
            for (Map.Entry<String, Object> entry : additionalClaims.entrySet()) {
                builder.claim(entry.getKey(), entry.getValue());
            }
        }

        return builder.compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(getKey())
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (JwtException e) {
            log.info("Invalid JWT token: {}", e.getMessage());
            log.trace("Invalid JWT token trace: {}", e);
        }
        return false;
    }

    public String getToken(HttpServletRequest httpServletRequest) {
        final String bearerToken = httpServletRequest.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    public String getEmailFromToken(String token) {
        Claims claims =
                Jwts.parser()
                        .verifyWith(getKey())
                        .build()
                        .parseSignedClaims(token)
                        .getPayload();
        return claims.getSubject();
    }

}
