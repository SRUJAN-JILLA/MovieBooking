package com.movieBooking.user.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import com.movieBooking.user.model.TicketDetails;

public interface TicketDetailsRepository extends MongoRepository<TicketDetails, Long> {
	public List<TicketDetails> findByUserId(long userId);
}
