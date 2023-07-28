package com.movieBooking.controller;

import java.text.ParseException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

import com.movieBooking.model.MovieDetails;
import com.movieBooking.model.TicketDetails;
import com.movieBooking.model.User;
import com.movieBooking.service.MovieBookingService;

import reactor.core.publisher.Mono;

@CrossOrigin(origins = "http://localhost:4200/") 
@RestController
public class MovieBookingController {

	@Autowired
	private MovieBookingService movieBookingService;

	@Autowired
	private WebClient webClient;

	private Logger logger = LoggerFactory.getLogger(MovieBookingController.class);

	/* Should return all movie details */
	@GetMapping("/api/v1/moviebooking/all")
	public List<MovieDetails> getAllMovieDetails() {

		String url = "http://localhost:8081/api/v1/moviebooking/all";

		List<MovieDetails> response = webClient.get().uri(url).retrieve().bodyToFlux(MovieDetails.class).collectList()
				.block();

		return response;
	}

	/* Should return all movie details with given movieNames */
	@GetMapping("/api/v1/moviebooking/movies/search/{moviename}")
	public MovieDetails getAllMovieDetailsWithMovieName(@PathVariable("moviename") String moviename) {

		String url = "http://localhost:8081/api/v1/moviebooking/movies/search/" + moviename;

		MovieDetails response = webClient.get().uri(url).retrieve().bodyToMono(MovieDetails.class)
				.block();
		
		return response;
	}

	/* Should book ticket */
	@PostMapping("/api/v1/moviebooking/bookTicket/{movieId}/{userId}/{noOfTicketsBooked}")
	public boolean bookTickets(@PathVariable("movieId") long movieId, @PathVariable("userId") long userId,
			@PathVariable("noOfTicketsBooked") int noOfTicketsBooked) {

		String url = "http://localhost:8081/api/v1/moviebooking/bookTicket/" + movieId + "/" + userId + "/"
				+ noOfTicketsBooked;

		boolean response = webClient.post().uri(url).retrieve().bodyToMono(Boolean.class).block();
		
		String eventUrlSSE =  "http://localhost:8082/api/v1/moviebooking/subscribe" ;
		String tempString  = webClient.get().uri(url).retrieve().bodyToMono(String.class).block();
		
		return response;
	}

	/* Should update ticket status based on id */
	@GetMapping("/api/v1/moviebooking/update/status/{movieId}/{ticketStatus}")
	public String setTicketStatus(@PathVariable("movieId") long movieId,
			@PathVariable("ticketStatus") boolean ticketStatus) {

		String url = "http://localhost:8082/api/v1/moviebooking/update/status/" + movieId + "/" + ticketStatus;

		String response = webClient.put().uri(url).retrieve().bodyToMono(String.class).block();

		return response;
	}

	/* Should delete movie based on id */
	@DeleteMapping("/api/v1/moviebooking/delete/movie/{id}")
	public boolean deleteEmployee(@PathVariable("id") long id) {

		String url = "http://localhost:8082/api/v1/moviebooking/delete/movie/" + id;

		boolean response = webClient.delete().uri(url).retrieve().bodyToMono(Boolean.class).block();

		return response;
	}

	/* Should return all ticket details */
	@GetMapping("/api/v1/ticketdetails/all")
	public List<TicketDetails> getAllTicketDetails() {
		String url = "http://localhost:8082/api/v1/ticketdetails/all";
		List<TicketDetails> response = webClient.get().uri(url).retrieve().bodyToFlux(TicketDetails.class).collectList()
				.block();
		System.out.println(response);

		return response;
	}

	/* Should add movie details */
	@PostMapping("/api/v1/moviebooking/movie/add")
	public String addMovie(@RequestBody MovieDetails movieDetails) throws ParseException {
		String url = "http://localhost:8082/api/v1/moviebooking/movie/add";

		String response = webClient.post().uri(url).bodyValue(movieDetails).retrieve().bodyToMono(String.class).block();

		return response;
	}

	/* Should return all movie details */
	@GetMapping("/api/v1/moviebooking/user/bookingDetails/{userId}")
	public List<TicketDetails> getBookingDetailsUserId(@PathVariable("userId") long userId) {
		String url = "http://localhost:8081/api/v1/moviebooking/user/bookingDetails/" + userId;

		List<TicketDetails> response = webClient.get().uri(url).retrieve().bodyToFlux(TicketDetails.class).collectList()
				.block();

		return response;
	}
}
