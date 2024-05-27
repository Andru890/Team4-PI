package com.visualstudio.rest.api.security;


import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
public class JwtAuthenticationManager implements ReactiveAuthenticationManager {

    private final JwtProvider jwtProvider;

    public JwtAuthenticationManager(JwtProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }

    @Override
    public Mono<Authentication> authenticate(Authentication authentication) {
        return Mono.just(authentication)
                .map(auth -> (Map<String, Object>) auth.getDetails())
                .map(claims -> {
                    String token = (String) claims.get("token");
                    if (jwtProvider.validate(token)) {
                        return createAuthenticationToken(claims, token);
                    } else {
                        throw new BadCredentialsException("Invalid JWT token");
                    }
                });
    }

    private UsernamePasswordAuthenticationToken createAuthenticationToken(Map<String, Object> claims, String token) {
        List<SimpleGrantedAuthority> authorities = ((List<String>) claims.get("roles")).stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        UserDetails userDetails = User.withUsername((String) claims.get("sub"))
                .authorities(authorities)
                .password("")
                .build();

        return new UsernamePasswordAuthenticationToken(userDetails, token, authorities);
    }
}
