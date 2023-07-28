package com.movieBooking.admin.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import com.movieBooking.admin.service.MovieBookingService;

@Component
public class KafkaConsumer {
	
	@Autowired
	private MovieBookingService movieBookingService;
	
    @KafkaListener(topics = "deleteMovieTopic1", groupId = "groupId")
    public void consume(String data) {
    	movieBookingService.sendEmitters("Movie got deleted: " + data);
    }
}