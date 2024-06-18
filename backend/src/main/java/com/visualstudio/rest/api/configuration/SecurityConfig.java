
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
            "/configuration/security",
            "/configuration/ui",
            "/swagger-ui.html",
            "/webjars/**",
            "role/**",
            "user/**",
            "reservation/**",
            "category/**",
            "productDetail/**",
            "product/**",
            "v1/**",
            "registration/**",
            "confirmation-email/**",
            "product-detail/**"}
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
                                //.requestMatchers("/user/register/").permitAll()
                                //.requestMatchers("/user/validate").permitAll(

                                //)
                                //.requestMatchers("/user/authenticate/").permitAll()
                                //.requestMatchers(GET, "/api/v1/management/**").hasAnyAuthority(ADMIN.name())
                                //.requestMatchers(POST, "/api/v1/management/**").hasAnyAuthority(ADMIN.name())
                                //.requestMatchers(PUT, "/api/v1/management/**").hasAnyAuthority(ADMIN.name())
                                //.requestMatchers(DELETE, "/api/v1/management/**").hasAnyAuthority(ADMIN.name())
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