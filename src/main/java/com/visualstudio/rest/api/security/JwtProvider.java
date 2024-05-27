package com.visualstudio.rest.api.security;

import io.jsonwebtoken.*;

import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;




import java.util.Date;
import java.util.logging.Logger;


@Component
public class JwtProvider {

    private  final Logger LOGGER =  Logger.getLogger(JwtProvider.class.getName());

    @Value("${jwt.secret}")
    private static String secret;
    @Value("${jwt.expiration}")
    private static Integer expiration;

    public void init () { secret = Keys.secretKeyFor(SignatureAlgorithm.HS256).toString(); }



    public static String generateToken(UserDetails userDetails) {
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .claim("roles", userDetails.getAuthorities())
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + expiration))
                .signWith(SignatureAlgorithm.HS256,secret.getBytes()).compact();
    }
public boolean validate(String jwts){
        Jwts.parser().setSigningKey(secret).parseClaimsJws(jwts);
        return true;
    }

    public String getUsername(String jwts){
        Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(jwts).getBody();
        return claims.getSubject();
        }

     

}