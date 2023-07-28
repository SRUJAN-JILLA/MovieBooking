import { Component } from '@angular/core';
import { MovieBookingService } from '../movie-booking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login.service';
import { MovieDetails } from '../classses/movieDetails';
import { User } from '../classses/user';

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent {
  id: string;
  noOfSeat:any;
  movieDetails:MovieDetails;
  name:string;
  currentUser:User;
  
  constructor(private movieBookingService: MovieBookingService, private loginService:LoginService, private route: ActivatedRoute, private router: Router) { };

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.name = this.route.snapshot.params['name'];
    this.currentUser = this.loginService.getUser();
    this.movieBookingService.getMovieBasedOnId(this.id).subscribe((data:any) => {
      this.movieDetails = data;
    });
    this.movieBookingService.getSubscription().subscribe({
      next: (event: any) => {  
          this.ngOnInit();
      }
    });  
  }

  async formSubmit() {

    this.movieBookingService.bookTicket(this.id, this.currentUser.id, this.noOfSeat).subscribe((data:any) => {
        console.log(data);
    });
    this.userDashBoard();
  }

  userDashBoard(){
    this.router.navigate(['/userDashBoard']);
  }
}
