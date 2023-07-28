package com.movieBooking.user.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.movieBooking.user.model.MovieDetails;
import com.movieBooking.user.model.TicketDetails;
import com.movieBooking.user.service.MovieBookingService;

@CrossOrigin(origins = "*")
@RestController
public class MovieBookingController {
	@Autowired
	private MovieBookingService movieBookingService;

	/* Should return all movie details */
	@GetMapping("/api/v1/moviebooking/all")
	public List<MovieDetails> getAllMovieDetails() {
		return this.movieBookingService.getAllMovieDetails();
	}

	/* Should return all movie details with given movieNames */
	@GetMapping("/api/v1/moviebooking/movies/search/{id}")
	public MovieDetails getAllMovieDetailsWithMovieName(@PathVariable("id") long id) {
		return this.movieBookingService.getAllMovieDetailsWithMovieName(id);
	}

	/* Should book ticket */
	@GetMapping("/api/v1/moviebooking/bookTicket/{movieId}/{userId}/{noOfTicketsBooked}")
	public boolean bookTickets(@PathVariable("movieId") long movieId, @PathVariable("userId") long userId,
			@PathVariable("noOfTicketsBooked") int noOfTicketsBooked) {
		return this.movieBookingService.bookTickets(movieId, userId, noOfTicketsBooked);
	}
	
	
	/* Should return all movie details */
	@GetMapping("/api/v1/moviebooking/user/bookingDetails/{userId}")
	public List<TicketDetails> getBookingDetailsUserId(@PathVariable("userId") long userId) {
		return this.movieBookingService.getUserBookingDetails(userId);
	}
}
