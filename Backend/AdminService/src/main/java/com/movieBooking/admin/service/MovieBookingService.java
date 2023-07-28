package com.movieBooking.admin.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.movieBooking.admin.model.MovieDetails;
import com.movieBooking.admin.model.TicketDetails;
import com.movieBooking.admin.repositories.MovieDetailsRepository;
import com.movieBooking.admin.repositories.TicketDetailsRepository;
import com.movieBooking.admin.repositories.UserRepository;
import java.util.concurrent.CopyOnWriteArrayList;

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

	private KafkaTemplate<String, String> kafkaTemplate;

	@Autowired
	public void KafkaProducerService(KafkaTemplate<String, String> kafkaTemplate) {
		this.kafkaTemplate = kafkaTemplate;
	}

	/* Should return all movieDetails */
	public List<TicketDetails> getAllTicketDetails() {
		return this.ticketDetailsRepository.findAll();
	}

	/* Should add an movieDetails to repo */
	public String addMovieDetails(MovieDetails movieDetail) {

		movieDetail.setId(dbSequenceGenr.getSequenceNumber(MovieDetails.SEQUENCE_NAME));

		this.movieDetailsRepository.save(movieDetail);
		this.kafkaTemplate.send("deleteMovieTopic1",movieDetail.getMovieName());
		return "Added";
	}

	public boolean findByEmail(String email) {
		return !(this.userRepository.findByEmail(email) == null);
	}

	public List<MovieDetails> getAllMovieDetailsWithMovieName(String moviename) {
		List<MovieDetails> movieDetails = this.movieDetailsRepository.findByMovieName(moviename);
		return movieDetails;
	}

	public String setTicketStatus(long movieId, boolean ticketStatus) {
		if (this.movieDetailsRepository.findById(movieId).isPresent()) {
			MovieDetails movieDetails = this.movieDetailsRepository.findById(movieId).get();

			movieDetails.setStatus(ticketStatus);
			
			movieDetailsRepository.save(movieDetails);
			this.kafkaTemplate.send("deleteMovieTopic1", movieDetails.getMovieName());
			return "Updated";
		}
		return "Movie is not present";
	}

	public boolean deleteMovie(long id) {
		if (this.movieDetailsRepository.findById(id).isPresent()) {
			MovieDetails temp = this.movieDetailsRepository.findById(id).get();
			System.out.println(temp);
			this.movieDetailsRepository.deleteById(id);
			this.kafkaTemplate.send("deleteMovieTopic1", temp.getMovieName());
			return true;
		}
		return false;
	}
	
	public String sendMessage() {
		this.kafkaTemplate.send("deleteMovieTopic1", "send message");
		return "sent";
	}

	public List<SseEmitter> emitters = new CopyOnWriteArrayList<>();

	public SseEmitter subscribe() {
		SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);
		try {
			sseEmitter.send(SseEmitter.event().name("INIT"));
		} catch (IOException e) {
			e.printStackTrace();
			emitters.remove(sseEmitter);
		}
		sseEmitter.onCompletion(() -> {
			emitters.remove(sseEmitter);
		});

		emitters.add(sseEmitter);
		return sseEmitter;
	}
	
	/* Should send events to clients */
	public void sendEmitters(String message) {
		synchronized (this.emitters) {
			for (int i = 0; i < emitters.size(); i++) {
				SseEmitter emitter = emitters.get(i);
				emitter.onCompletion(() -> {
					emitters.remove(emitter);
				});
				try {
					emitter.send(SseEmitter.event().name("notifications").data(message));
				} catch (IOException e) {
					emitters.remove(emitter);
				}
			}
		}
	}
}
