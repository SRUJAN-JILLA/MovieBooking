package com.movieBooking.controller;

import java.security.Principal;
import java.text.ParseException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.movieBooking.config.JwtHelper;
import com.movieBooking.model.JwtRequest;
import com.movieBooking.model.JwtResponse;
import com.movieBooking.model.User;
import com.movieBooking.service.MovieBookingService;
import com.movieBooking.service.impl.UserDetailsServiceImpl;

@CrossOrigin(origins = "http://localhost:4200/") 
@RestController
public class AuthController {

	@Autowired
	private MovieBookingService movieBookingService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserDetailsServiceImpl userDetailsService;

	@Autowired
	private JwtHelper helper;

	private Logger logger = LoggerFactory.getLogger(AuthController.class);
	
	Principal principal;
	/* Should check login and password and return user details */
	@GetMapping("/api/v1/moviebooking/login")
	public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest request) {

		this.doAuthenticate(request.getUsername(), request.getPassword());

		UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());

		String token = this.helper.generateToken(userDetails);

		JwtResponse response = new JwtResponse(token, userDetails.getUsername());
		System.out.println(principal);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	/* Should add a user */
	@PostMapping("/api/v1/moviebooking/register")
	public String addEmployee(@RequestBody User user) throws ParseException {
		return movieBookingService.addUser(user);
	}
	
	@PostMapping("/generate-token")
	public JwtResponse generateToken(@RequestBody JwtRequest request) {
		
		this.doAuthenticate(request.getUsername(), request.getPassword());

		UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());

		String token = this.helper.generateToken(userDetails);

		JwtResponse response = new JwtResponse(token, userDetails.getUsername());

		return new JwtResponse(token, request.getUsername());
	}
	
	/* Should return the details of current user */
	@GetMapping("/current-user/{email}")
	public User getCurrentUser(@PathVariable("email") String email) {
		return (User) this.userDetailsService.loadUserByUsername(email);
	}

	/* Should change password based on id */
	@GetMapping(value = "/api/v1/moviebooking/forgot/{email}/{password}", produces = "text/plain")
	public String changePassword(@PathVariable("email") String email, @PathVariable("password") String password) {
		return this.movieBookingService.changePassword(email, password);
	}

	/* Should return if the email id exists or not */
	@GetMapping("/api/v1/moviebooking/emailExists/{email}")
	public boolean emailExists(@PathVariable("email") String email) {
		return movieBookingService.findByEmail(email);
	}

	private void doAuthenticate(String email, String password) {

		UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);
		try {
			authenticationManager.authenticate(authentication);

		} catch (BadCredentialsException e) {
			throw new BadCredentialsException(" Invalid Username or Password  !!");
		}

	}

	/* Should return if the email id exists are unique */
	@GetMapping("/api/v1/emailUserNameUnique/{email}/{loginId}")
	public boolean checkEmailUserNameUnique(@PathVariable("email") String email,
			@PathVariable("loginId") String loginId) {
		boolean temp = this.movieBookingService.checkEmailUserNameUnique(email, loginId);
		System.out.println(temp);
		return temp;
	}

	@ExceptionHandler(BadCredentialsException.class)
	public String exceptionHandler() {
		return "Credentials Invalid !!";
	}



}
