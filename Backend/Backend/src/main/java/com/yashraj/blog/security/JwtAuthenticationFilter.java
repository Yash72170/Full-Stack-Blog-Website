package com.yashraj.blog.security;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	// Using a proper logger instead of System.out.println
	private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private JwtTokenHelper jwtTokenHelper;

	@Autowired
	private TokenBlacklistService tokenBlacklistService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		final String requestTokenHeader = request.getHeader("Authorization");
		String username = null;
		String token = null;

		// Check if the token header is present and correctly formatted
		if (StringUtils.hasText(requestTokenHeader) && requestTokenHeader.startsWith("Bearer ")) { // Note the space after "Bearer"
			token = requestTokenHeader.substring(7);

			// === CORRECTION 1: ADDED TOKEN BLACKLIST CHECK ===
			// Before validating, check if the token has been logged out (is on the blacklist)
			if (tokenBlacklistService.isTokenBlacklisted(token)) {
				logger.warn("Authentication attempt with a blacklisted token.");
				// We don't throw an error, we just don't authenticate the user.
				// The request will proceed down the chain as unauthenticated.
				filterChain.doFilter(request, response);
				return; // Stop further processing for this request
			}

			try {
				username = this.jwtTokenHelper.getUsernameFromToken(token);
			} catch (IllegalArgumentException e) {
				logger.error("Unable to get JWT token: {}", e.getMessage());
			} catch (ExpiredJwtException e) {
				logger.warn("JWT token has expired: {}", e.getMessage());
			} catch (MalformedJwtException e) {
				logger.error("Invalid JWT token: {}", e.getMessage());
			}

		} else {
			// This is not an error, just a request without a token. It could be for a public endpoint.
			// logger.info("Request does not contain a bearer token.");
		}

		// Once we get the token, we validate it.
		if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

			if (this.jwtTokenHelper.validateToken(token, userDetails)) {
				// If the token is valid, configure Spring Security to manually set authentication
				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities());
				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

				// After setting the Authentication in the context, we specify
				// that the current user is authenticated. So it passes the Spring Security Configurations successfully.
				SecurityContextHolder.getContext().setAuthentication(authentication);
			} else {
				logger.warn("Invalid JWT token. Validation failed.");
			}
		}

		// Continue the filter chain for the request to proceed to the controller.
		filterChain.doFilter(request, response);
	}
}