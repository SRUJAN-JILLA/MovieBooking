package com.movieBooking.service;

import java.text.ParseException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.movieBooking.model.User;
import com.movieBooking.repositories.UserRepository;

@Service
public class MovieBookingService {
	@Autowired
	private DbSequenceGenr dbSequenceGenr;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	public boolean findByEmail(String email) {
		return !(this.userRepository.findByEmail(email) == null);
	}

	/* Should add an employee */
	public String addUser(User user) throws ParseException {

		user.setId(dbSequenceGenr.getSequenceNumber(User.SEQUENCE_NAME));
		user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));

		if (user.getRole() == null)
			user.setRole("USER");

		this.userRepository.save(user);
		return "Added";
	}

	public String changePassword(String email, String password) {
		User user = userRepository.findByEmail(email);
		if (null != user) {
			user.setPassword(this.bCryptPasswordEncoder.encode(password));

			userRepository.save(user);
			return "Updated";
		}
		return "User does not exist";
	}

	public boolean checkEmailUserNameUnique(String email, String loginId) {
		System.out.println(this.userRepository.findByEmail(email));
		System.out.println(this.userRepository.findByLoginId(loginId));

		boolean emailCheck = (this.userRepository.findByEmail(email) == null);
		if (emailCheck == false)
			return false;
		boolean loginIdCheck = (this.userRepository.findByLoginId(loginId) == null);
		if (loginIdCheck == false)
			return false;

		return true;
	}
}
