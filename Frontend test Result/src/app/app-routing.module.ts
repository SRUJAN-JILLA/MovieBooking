import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserDashBoardComponent } from './user-dash-board/user-dash-board.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { BookTicketComponent } from './book-ticket/book-ticket.component';

const routes: Routes = [
  {
  path: '',
  component: HomeComponent,
  pathMatch: 'full',
},
{
  path: 'signup',
  component: RegisterComponent,
  pathMatch: 'full',
},
{
  path: 'login',
  component: LoginComponent,
  pathMatch: 'full',
},
{
  path: 'userDashBoard',
  component: UserDashBoardComponent,
  pathMatch: 'full',
},
{
  path: 'bookingDetails',
  component: BookingDetailsComponent,
  pathMatch: 'full',
},
{
  path: 'forgotPassword',
  component: ForgotPasswordComponent,
  pathMatch: 'full',
},
{
  path: 'bookTicket/:id/:name',
  component: BookTicketComponent,
  pathMatch: 'full',
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
