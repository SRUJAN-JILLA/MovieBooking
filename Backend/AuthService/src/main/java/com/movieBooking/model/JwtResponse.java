package com.movieBooking.model;

public class JwtResponse {
	String token;
	String email;

	@Override
	public String toString() {
		return "JwtResponse [token=" + token + ", email=" + email + "]";
	}

	public JwtResponse() {
		super();
	}

	public JwtResponse(String token, String email) {
		super();
		this.token = token;
		this.email = email;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

}
