import { Component } from '@angular/core';
import { User } from '../classses/user';
import { LoginService } from '../login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieBookingService } from '../movie-booking.service';
import { MovieDetails } from '../classses/movieDetails';

@Component({
  selector: 'app-user-dash-board',
  templateUrl: './user-dash-board.component.html',
  styleUrls: ['./user-dash-board.component.css']
})
export class UserDashBoardComponent {

  public searchArea: any="";
  public currentUser:User;
  public movieDetails:MovieDetails[];
  public flag:boolean;
  constructor(private movieBookingService: MovieBookingService, private loginService:LoginService, private router: Router, private route: ActivatedRoute) { };

  ngOnInit(): void {
    
    this.getAllMovies();
    this.currentUser = this.loginService.getUser();
    this.movieBookingService.getSubscription().subscribe({
      next: (event: any) => {  
          this.ngOnInit();
      }
    });  
    
    
  }
  getAllMovies() {
    this.movieBookingService.getAllMovies().subscribe((data:any) => {
      this.movieDetails = data;
    });
  
  }

  isAdmin(){
      if(this.flag){
      this.deleteMovie(234);
    }
    return this.currentUser.role==="ADMIN";
  }

  checkStatus(movie:MovieDetails){
    if((movie.totalNumberOfTicketsInTheater - movie.totalNumberOfTicketsBooked) === 0)
    return false;

    return movie.status;
  }

  bookTicket(id:number, name:string){
    this.router.navigate(['bookTicket', id, name]);
  }
  updateStatus(id:number, status:boolean){
    this.movieBookingService.updateStatus(id, !status).subscribe((data:any) => {

    });
    
  }

  async deleteMovie(id:number){
     this.movieBookingService.deleteMovie(id).subscribe((data:any) => {

    });
  }
}
