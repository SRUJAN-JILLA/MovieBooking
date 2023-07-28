package com.movieBooking.user.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.movieBooking.user.model.User;

public interface UserRepository extends MongoRepository<User, Long> {
	public User findByEmail(String email);
	public User findByLoginId(String loginId);
}
