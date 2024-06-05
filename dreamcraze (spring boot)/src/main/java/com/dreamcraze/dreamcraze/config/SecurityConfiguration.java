package com.dreamcraze.dreamcraze.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.dreamcraze.dreamcraze.security.jwt.JwtAuthGuard;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfiguration {
        @Autowired
        private final JwtAuthGuard jwtAuthGuard;
        @Autowired
        private final AuthenticationProvider authenticationProvider;

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                return http
                                .csrf(csrf -> csrf
                                                .disable())
                                .authorizeHttpRequests(requests -> requests
                                                .requestMatchers(
                                                                "api/products/productDetails/**",
                                                                "api/products/**",
                                                                "api/v1/auth/**",
                                                                "api/categories/**",
                                                                "api/users/allUsers",
                                                                "api/address/**",
                                                                "api/order/**")
                                                .permitAll()
                                                .requestMatchers("api/address/create",
                                                                "api/address/users/**",
                                                                "api/address/delete")
                                                .hasAnyAuthority("USER")
                                                .anyRequest()
                                                .authenticated())
                                .sessionManagement(session -> session
                                                .sessionCreationPolicy(SessionCreationPolicy.ALWAYS)

                                )
                                .authenticationProvider(authenticationProvider)
                                .addFilterBefore(jwtAuthGuard, UsernamePasswordAuthenticationFilter.class)
                                .build();
        }

}

/*
 * 
 * return http
 * .csrf(csrf -> csrf
 * .disable())
 * .authorizeHttpRequests(requests -> requests
 * .requestMatchers("")
 * .permitAll()
 * .anyRequest()
 * .authenticated()
 * .and()
 * .sessionManagement()
 * .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
 * .and()
 * .authenticationProvider(null)
 * .addFilterBefore(null, null)
 * ).build();
 */
