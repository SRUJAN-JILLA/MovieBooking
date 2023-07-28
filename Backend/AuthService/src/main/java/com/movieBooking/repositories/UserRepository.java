package com.movieBooking.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.movieBooking.model.User;

public interface UserRepository extends MongoRepository<User, Long> {
	public User findByEmail(String email);
	public User findByLoginId(String loginId);
}
