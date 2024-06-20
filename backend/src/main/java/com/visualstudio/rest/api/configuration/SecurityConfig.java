
package com.visualstudio.rest.api.configuration;


import com.visualstudio.rest.api.Security.CustomAuthenticationProvider;
import com.visualstudio.rest.api.Security.CustomLogoutHandler;
import com.visualstudio.rest.api.repositories.RoleRepository;
import com.visualstudio.rest.api.Security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import static com.visualstudio.rest.api.models.entities.RoleName.ADMIN;
import static com.visualstudio.rest.api.models.entities.RoleName.CUSTOMER;
import static org.springframework.http.HttpMethod.*;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {

    private static final String[] WHITE_LIST_URL = { //debo modificar los endpoints para que no sean publicos

            "/swagger-ui/**",
            "/swagger-resources/**",
            "/configuration/ui",
            "/swagger-ui.html",
            "/webjars/**",
            "role/**",
            "user/**",
            "user/logout",
            "user/{email}/role",
            "reservation/**",
            "category/**",
            "product-detail/**",
            "product/**",
            "v1/**",
            "registration/**",
            "/mail/**",
            "registration/**",
            "confirmation-email/**"}
            ;


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
                                .requestMatchers("/user/register/").permitAll()
                                .requestMatchers("/mail/List").permitAll()
                                .requestMatchers("user/confirm").permitAll()
                                .requestMatchers("/user/login").permitAll()
                                .requestMatchers("user/resend-confirmation").permitAll()
                                .requestMatchers("/user/delete").hasAnyAuthority(ADMIN.name())
                                .requestMatchers("/configuration/security").hasAnyAuthority(ADMIN.name())
                                .requestMatchers(GET, "/rest/api/**").hasAnyAuthority(ADMIN.name())
                                .requestMatchers(POST, "/rest/api/**").hasAnyAuthority(ADMIN.name())
                                .requestMatchers(PUT, "/rest/api/**").hasAnyAuthority(ADMIN.name())
                                .requestMatchers(DELETE, "/rest/api/**").hasAnyAuthority(ADMIN.name())
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