import { Component } from '@angular/core';
import { MovieBookingService } from './movie-booking.service';
import { User } from './classses/user';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private movieBookingService: MovieBookingService,  private loginService:LoginService,) {}
  public currentUser:User;

  ngOnInit(): void {
    this.currentUser = this.loginService.getUser();
    this.movieBookingService.subscribe()
      .subscribe({
        next: (event) => {}
      });  

       
  }
}
