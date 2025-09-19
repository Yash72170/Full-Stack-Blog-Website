package com.yashraj.blog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.yashraj.blog.entities.Role;

import java.util.Optional;

public interface RoleRepo  extends JpaRepository<Role, Integer>{
    Optional<Role> findByName(String name);
}
