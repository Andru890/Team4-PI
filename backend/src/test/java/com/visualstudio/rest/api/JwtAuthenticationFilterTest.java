package com.visualstudio.rest.api;

import com.visualstudio.rest.api.Security.CustomerUserDetailsService;
import com.visualstudio.rest.api.Security.JwtAuthenticationFilter;
import com.visualstudio.rest.api.Security.JwtUtilities;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;


import java.util.Collections;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

public class JwtAuthenticationFilterTest {

    @Mock
    private JwtUtilities jwtUtilities;

    @Mock
    private CustomerUserDetailsService customerUserDetailsService;

    @InjectMocks
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(jwtAuthenticationFilter).build();
    }

    @Test
    public void testDoFilterInternal_ValidToken() throws Exception {
        HttpServletRequest request = mock(HttpServletRequest.class);
        HttpServletResponse response = mock(HttpServletResponse.class);
        FilterChain filterChain = mock(FilterChain.class);

        String token = "valid_token";
        when(jwtUtilities.getToken(request)).thenReturn(token);
        when(jwtUtilities.validateToken(token)).thenReturn(true);

        String email = "testuser@example.com";
        UserDetails userDetails = new User(email, "password", Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));
        when(jwtUtilities.extractUserName(token)).thenReturn(email);
        when(customerUserDetailsService.loadUserByUsername(email)).thenReturn(userDetails);

        jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);

        verify(jwtUtilities).getToken(request);
        verify(jwtUtilities).validateToken(token);
        verify(jwtUtilities).extractUserName(token);
        verify(customerUserDetailsService).loadUserByUsername(email);

        verify(filterChain).doFilter(request, response);

        // Verify authentication context
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(userDetails.getUsername(), null, userDetails.getAuthorities());
        authenticationToken.setDetails(null); // Details are not set in UsernamePasswordAuthenticationToken during filter chain
        assertEquals(authenticationToken, SecurityContextHolder.getContext().getAuthentication());
    }

    @Test
    public void testDoFilterInternal_InvalidToken() throws Exception {
        HttpServletRequest request = mock(HttpServletRequest.class);
        HttpServletResponse response = mock(HttpServletResponse.class);
        FilterChain filterChain = mock(FilterChain.class);

        String token = "invalid_token";
        when(jwtUtilities.getToken(request)).thenReturn(token);
        when(jwtUtilities.validateToken(token)).thenReturn(false);

        jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);

        verify(jwtUtilities).getToken(request);
        verify(jwtUtilities).validateToken(token);
        verify(jwtUtilities, never()).extractUserName(anyString());
        verify(customerUserDetailsService, never()).loadUserByUsername(anyString());

        verify(filterChain).doFilter(request, response);

        assertNull(SecurityContextHolder.getContext().getAuthentication());
    }

    // Add more tests to cover edge cases and error handling scenarios
}
