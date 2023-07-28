import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from './classses/user';
import { TicketDetails } from './classses/ticketDetails';
import { MovieDetails } from './classses/movieDetails';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MovieBookingService {
  
  private subscription: any;

  getTicketDetails(id:number): Observable<any> {
    let url = "http://localhost:8080/api/v1/moviebooking/user/bookingDetails";
    return this.httpClient.get(`${url}/${id}`)
  }

  getAllTicketDetails(): Observable<any> {
    let url = "http://localhost:8080/api/v1/ticketdetails/all";
    return this.httpClient.get(`${url}`)
  }

  public getMovieBasedOnId(id:any):Observable<any>{
    let url = "http://localhost:8080/api/v1/moviebooking/movies/search";
    return this.httpClient.get(`${url}/${id}`);
  }

  addEmployee(user: User) {
    let url = "http://localhost:8080/api/v1/moviebooking/register";
    return  this.httpClient.post(`${url}`, user);
  }

  bookTicket(movieId:any, userId:any, numberOfTicket:any) {
    let url = "http://localhost:8081/api/v1/moviebooking/bookTicket";
    return  this.httpClient.get(`${url}/${movieId}/${userId}/${numberOfTicket}`);
  }

  changePassword(email: string, password: string): Observable<boolean> {
    let url = "http://localhost:8080/api/v1/moviebooking/forgot";
    return this.httpClient.get<boolean>(`${url}/${email}/${password}`)
  }

  constructor(private httpClient: HttpClient) { }

  emailExists(email: String): Observable<boolean> {
    let url = "http://localhost:8080/api/v1/moviebooking/emailExists";
    return this.httpClient.get<boolean>(`${url}/${email}`)
  }

  uniqueEmailUsername(email:string, username:string): Observable<boolean> {
    let url = "http://localhost:8080/api/v1/emailUserNameUnique";
    return this.httpClient.get<boolean>(`${url}/${email}/${username}`)
  }

  getAllMovies(): Observable<any> {
    let url = "http://localhost:8080/api/v1/moviebooking/all";
    return this.httpClient.get(`${url}`)
  }

  updateStatus(id:any,status:any):Observable<any> {
    let url = "http://localhost:8082/api/v1/moviebooking/update/status";
    return this.httpClient.get(`${url}/${id}/${status}`)
  }

  deleteMovie(id:any){
    let url = "http://localhost:8080/api/v1/moviebooking/delete/movie";
    return this.httpClient.delete(`${url}/${id}`);
  }

  /* Should subscribe from server to form connection SSE */
  subscribe(): Subject<any> {
    let eventSource = new EventSource("http://localhost:8082/api/v1/moviebooking/subscribe");

    let subscription = new Subject();
    eventSource.addEventListener("notifications", event => {
      subscription.next(event);
    });
    this.subscription = subscription;
    return subscription;
  }

  /* Should return subscription to components */
  getSubscription() {
    return this.subscription;
  }
}
