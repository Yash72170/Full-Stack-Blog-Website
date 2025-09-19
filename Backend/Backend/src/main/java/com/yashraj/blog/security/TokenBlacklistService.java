package com.yashraj.blog.security;

import org.springframework.stereotype.Service;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class TokenBlacklistService {

    // A thread-safe Set to store blacklisted tokens.
    private final Set<String> blacklist = Collections.newSetFromMap(new ConcurrentHashMap<>());

    /**
     * Adds a token to the blacklist.
     * @param token The JWT to be blacklisted.
     */
    public void blacklistToken(String token) {
        blacklist.add(token);
    }

    /**
     * Checks if a token is present in the blacklist.
     * @param token The JWT to check.
     * @return true if the token is blacklisted, false otherwise.
     */
    public boolean isTokenBlacklisted(String token) {
        return blacklist.contains(token);
    }
}