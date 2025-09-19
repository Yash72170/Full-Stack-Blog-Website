package com.yashraj.blog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.yashraj.blog.entities.Comment;

public interface CommentRepo  extends JpaRepository<Comment	, Integer> {

}
