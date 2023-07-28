import { Component } from '@angular/core';
import { User } from '../classses/user';
import { MovieBookingService } from '../movie-booking.service';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { MovieDetails } from '../classses/movieDetails';
import { TicketDetails } from '../classses/ticketDetails';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent {

  public ticketDetails: TicketDetails[];
  public searchText: any;
  public currentUser:User;
  public movieDetails:MovieDetails[];
  
  constructor(private movieBookingService: MovieBookingService, private loginService:LoginService, private router: Router) { };

  ngOnInit(): void {
    this.currentUser = this.loginService.getUser();
    
    this.getTicketDetails();  
    this.movieBookingService.getSubscription().subscribe({
      next: (event: any) => {  
          this.ngOnInit();
      }
    });    
  }

  getTicketDetails(){  
    if(this.currentUser.role === "USER"){
    this.movieBookingService.getTicketDetails(this.currentUser.id).subscribe((data:any) => {
      this.ticketDetails = data;
    });
    } else if(this.currentUser.role === "ADMIN"){
      this.movieBookingService.getAllTicketDetails().subscribe((data:any) => {
        this.ticketDetails = data;
      });
    }
    this.movieBookingService.getAllMovies().subscribe((data:any) => {
      this.movieDetails = data;
    });
  }

  getMovieName(id:any){
    const tempMOvie:MovieDetails | undefined = this.movieDetails.find((obj) => obj.id === id);
    return tempMOvie?.movieName;
  }
  isAdmin(){
    return this.currentUser.role === "ADMIN";
  }
}
