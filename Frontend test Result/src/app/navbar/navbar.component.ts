import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MovieBookingService } from '../movie-booking.service';
import { LoginService } from '../login.service';
import { User } from '../classses/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  public currentUser:User;

  constructor(private movieBookingService: MovieBookingService,  public loginService:LoginService, private router: Router) {}

  ngOnInit(): void {
    this.currentUser = this.loginService.getUser();
    
  } 
  
  home() {
    this.router.navigate(['']);
  }

  /* Should navigate to login page*/
  login() {
    this.router.navigate(['/login']);
  }

  /* Should navigate to sign up page*/
  signup() {
    this.router.navigate(['/signup']);
  }

  main(){
    this.loginService.logout();
    this.router.navigate(['/']);
  }

  userDashBoard(){
    this.router.navigate(['/userDashBoard']);
  }

  bookingDetails(){
    this.router.navigate(['/bookingDetails']);
  }
}
