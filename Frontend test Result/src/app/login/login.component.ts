import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MovieBookingService } from '../movie-booking.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  emailAddress: string;
  confirmPassword: string;
  checkEmail: boolean;
  checkPassword: boolean;

  disableLoginButton: boolean;
  counter: number;
  currentLogginAttempts: number = 0;
  
  loginData = {
    username: "",
    password: ""
  }

  constructor(private movieBookingService: MovieBookingService, private loginService:LoginService, private router: Router) { };
  
  async formSubmit() {
    
    const emailExists: any = await this.movieBookingService.emailExists(this.loginData.username).toPromise();
    console.log(emailExists);
     //chcek if email exists 
     if (emailExists) {
      this.checkEmail = false;
      this.checkPassword = false;
      this.loginService.generateToken(this.loginData).subscribe(
        (data:any)=>{
          console.log("success");
          this.loginService.loginUser(data.token);
          
          this.loginService.getCurrentUser(this.loginData.username).subscribe(
             (user: any) => {
              this.loginService.setUser(user);
              
              if(this.loginService.getUserRole() == "ADMIN"){
                this.userDashBoard();
                console.log("you r in admin section")
              }else if (this.loginService.getUserRole() == "USER"){
                this.userDashBoard();
                console.log("you r in employee section")
              }else{
                console.log("You are in logout section")
                this.loginService.logout();
              }
            }
          )
        }
      )
     }
     else{
      this.checkEmail = true;
     }
    
  }

  signup(){
    this.router.navigate(['/signup']);
  } 

  userDashBoard(){
    this.router.navigate(['/userDashBoard']);
  }
  
  forgotPassword(){
    this.router.navigate(['/forgotPassword']);
  }

}
