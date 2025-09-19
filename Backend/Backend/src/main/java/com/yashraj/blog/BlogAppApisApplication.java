package com.yashraj.blog;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.yashraj.blog.config.AppConstants;
import com.yashraj.blog.entities.Role;
import com.yashraj.blog.repositories.RoleRepo;

@SpringBootApplication
@EnableCaching
public class BlogAppApisApplication implements CommandLineRunner {
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private RoleRepo roleRepo;

	public static void main(String[] args) {
		SpringApplication.run(BlogAppApisApplication.class, args);
	}

	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}

	// In BlogAppApisApplication.java

	@Override
	public void run(String... args) throws Exception {
		try {
			// This 'if' statement is the crucial fix.
			// It checks if roles exist before creating them.
			if (this.roleRepo.count() == 0) {
				Role roleAdmin = new Role();
				roleAdmin.setName("ROLE_ADMIN");

				Role roleNormal = new Role();
				roleNormal.setName("ROLE_NORMAL");

				List<Role> roles = List.of(roleAdmin, roleNormal);
				List<Role> result = this.roleRepo.saveAll(roles);

				result.forEach(r -> {
					System.out.println("Created Role: "  + r.getName());
				});
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
