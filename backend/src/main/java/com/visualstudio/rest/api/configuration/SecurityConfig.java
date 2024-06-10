
package com.visualstudio.rest.api.configuration;


import com.visualstudio.rest.api.Security.CustomAuthenticationProvider;
import com.visualstudio.rest.api.Security.CustomLogoutHandler;
import com.visualstudio.rest.api.models.entities.User;
import com.visualstudio.rest.api.repositories.RoleRepository;
import com.visualstudio.rest.api.Security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.security.authentication.AuthenticationProvider;

import static com.visualstudio.rest.api.models.entities.RoleName.ADMIN;

import static com.visualstudio.rest.api.models.entities.RoleName.USER;
import static org.springframework.http.HttpMethod.*;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {

    private static final String[] WHITE_LIST_URL = {"/api/v1/auth/**", //debo modificar los endpoints para que no sean publicos
            "/api/v1/user/**",
            "swagger-ui/**",
            "swagger-resources/**",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui/**",
            "/webjars/**",
            "/swagger-ui.html"};

    private final CustomAuthenticationProvider authenticationProvider;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final CustomLogoutHandler logoutHandler;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http,
                                           RoleRepository roleRepository) throws Exception {

        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(req ->
                        req.requestMatchers(WHITE_LIST_URL)
                                .permitAll()
                                .requestMatchers("/api/v1/auth/**").hasAnyRole(USER.name())
                                .requestMatchers(GET, "/api/v1/management/**").hasAnyAuthority(ADMIN.name())
                                .requestMatchers(POST, "/api/v1/management/**").hasAnyAuthority(ADMIN.name())
                                .requestMatchers(PUT, "/api/v1/management/**").hasAnyAuthority(ADMIN.name())
                                .requestMatchers(DELETE, "/api/v1/management/**").hasAnyAuthority(ADMIN.name())
                                .anyRequest()
                                .authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .logout(logout ->
                        logout.logoutUrl("/api/v1/auth/logout")
                                .addLogoutHandler(logoutHandler)
                                .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext())
                )
        ;

        return http.build();
    }

    }