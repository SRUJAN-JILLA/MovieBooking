package com.movieBooking.user.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.movieBooking.user.model.MovieDetails;
import com.movieBooking.user.model.TicketDetails;
import com.movieBooking.user.repositories.MovieDetailsRepository;
import com.movieBooking.user.repositories.TicketDetailsRepository;
import com.movieBooking.user.repositories.UserRepository;

@Service
public class MovieBookingService {
	@Autowired
	private DbSequenceGenr dbSequenceGenr;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private MovieDetailsRepository movieDetailsRepository;

	@Autowired
	private TicketDetailsRepository ticketDetailsRepository;
	
	@Autowired
	private WebClient webClient;

	/* Should return all movieDetails */
	public List<MovieDetails> getAllMovieDetails() {
		return this.movieDetailsRepository.findAll();
	}

	public MovieDetails getAllMovieDetailsWithMovieName(long id) {
		MovieDetails movieDetails = this.movieDetailsRepository.findById(id).get();
		return movieDetails;
	}

	public boolean bookTickets(long movieId, long userId, int noOfTicketsBooked) {

		if (this.movieDetailsRepository.findById(movieId).isEmpty() || this.userRepository.findById(userId).isEmpty())
			return false;
		
		MovieDetails movieDetails = this.movieDetailsRepository.findById(movieId).get();

		int totalNumberOfTicketsBookedTheater = movieDetails.getTotalNumberOfTicketsBooked();
		int totalNumberOfTicketsInTheater = movieDetails.getTotalNumberOfTicketsInTheater();
		int updatedTotalNumberOfTicketsBookedTheater = totalNumberOfTicketsBookedTheater + noOfTicketsBooked;

		if (updatedTotalNumberOfTicketsBookedTheater <= totalNumberOfTicketsInTheater) {

			TicketDetails ticketDetails = new TicketDetails();
			List<Integer> seatNumbers = new ArrayList<>();

			ticketDetails.setId(dbSequenceGenr.getSequenceNumber(TicketDetails.SEQUENCE_NAME));
			ticketDetails.setMovieId(movieId);
			ticketDetails.setNumberOfTicketsBookedByUser(noOfTicketsBooked);
			ticketDetails.setUserId(userId);

			movieDetails.setTotalNumberOfTicketsBooked(updatedTotalNumberOfTicketsBookedTheater);

			for (int i = totalNumberOfTicketsBookedTheater + 1; i <= updatedTotalNumberOfTicketsBookedTheater; i++) {
				seatNumbers.add(i);
			}
			ticketDetails.setSeatNumbers(seatNumbers);

			ticketDetailsRepository.save(ticketDetails);
			movieDetailsRepository.save(movieDetails);
			String eventUrlSSE =  "http://localhost:8082/api/v1/sendemiiter" ;
			webClient.get().uri(eventUrlSSE).retrieve().bodyToMono(String.class).block();
			
			return true;
		}
		return false;
	}
	
	public List<TicketDetails> getUserBookingDetails(long id){
		return this.ticketDetailsRepository.findByUserId(id);
	}
}
