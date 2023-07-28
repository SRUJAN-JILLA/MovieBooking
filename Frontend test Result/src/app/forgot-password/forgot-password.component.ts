import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { MovieBookingService } from '../movie-booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  checkPassword: boolean;
  password1: string;
  confirmPassword: string;

  emailAddress: string;
  checkEmail: boolean;

  constructor(public loginService: LoginService, private movieBookingService: MovieBookingService, private router: Router) { };

  ngOnInit(): void {
  }

  /* On submit should validate & change password */
  async formSubmit() {

    const emailExists: any = await this.movieBookingService.emailExists(this.emailAddress).toPromise();

    if (emailExists) {
    if (this.password1 !== this.confirmPassword) {
      this.checkPassword = true;
    } else {
      this.movieBookingService.changePassword(this.emailAddress, this.password1).subscribe(data =>{
        console.log(data);
      })
      this.checkPassword = false;
      this.mainLogout();
    }
  }else{
    this.checkEmail = true;
  }
  }

  /* Should navigate to main page*/
  mainLogout() {
    this.router.navigate(['/']);
  }

}
