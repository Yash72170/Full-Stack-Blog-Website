package com.yashraj.blog.entities;

// All 'javax.persistence' imports have been changed to 'jakarta.persistence'
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import lombok.Data;

@Entity
@Data
public class Role {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // Added this to auto-generate the ID
	private int id;

	private String name;

}
