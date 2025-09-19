package com.yashraj.blog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.yashraj.blog.entities.Category;

public interface CategoryRepo extends JpaRepository<Category, Integer> {

}
