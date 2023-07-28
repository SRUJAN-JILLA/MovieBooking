import { Component } from '@angular/core';
import { MovieBookingService } from '../movie-booking.service';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { User } from '../classses/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user: User = new User();
  checkEmailLoginId: boolean;
  checkPassword: boolean;
  confirmPassword: any;
  
  constructor(private movieBookingService: MovieBookingService, private loginService:LoginService, private router: Router) { };

  async formSubmit() {
    if (this.user.password !== this.confirmPassword) {
      this.checkPassword = true;
    } else {
      this.checkPassword = false;
      //checking for email exists or not 
      const uniqueEmailLoginId: any = await this.movieBookingService.uniqueEmailUsername(this.user.email, this.user.loginId).toPromise();
      this.checkEmailLoginId = !uniqueEmailLoginId;
      console.log(uniqueEmailLoginId)
      if (uniqueEmailLoginId) {
        this.saveEmployee();
        this.login();
      }
    }
  }

   /* Should save a new Employee */
  saveEmployee() {
    this.movieBookingService.addEmployee(this.user).subscribe(data => {
    });
  }

  /* Should navigate to login page*/
  login() {
    this.router.navigate(['/login']);
  }
}
