import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';

import { UserDashBoardComponent } from './user-dash-board.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { User } from '../classses/user';
import { LoginService } from '../login.service';
import { MovieBookingService } from '../movie-booking.service';
import { CustomPipePipe } from '../custom-pipe.pipe';
import { MovieDetails } from '../classses/movieDetails';

describe('UserDashBoardComponent', () => {
  let component: UserDashBoardComponent;
  let fixture: ComponentFixture<UserDashBoardComponent>;

  let loginService: any;
  let subscription: any;
    let movieBookingService: any;
    let router: any;
    let routerSpy: { navigate: jasmine.Spy };
    let loginServiceSpy: { getCurrentUser: jasmine.Spy, isLoggedIn: jasmine.Spy, logout: jasmine.Spy, loginUser:jasmine.Spy, getUser:jasmine.Spy, generateToken:jasmine.Spy, setUser:jasmine.Spy, getUserRole:jasmine.Spy};
    let movieBookingServiceSpy: { getSubscription: jasmine.Spy, getAllMovies :jasmine.Spy, subscribe: jasmine.Spy, deleteMovie: jasmine.Spy, updateStatus: jasmine.Spy, uniqueEmailUsername: jasmine.Spy, emailExists: jasmine.Spy, changePassword: jasmine.Spy, bookTicket: jasmine.Spy, getMovieBasedOnId: jasmine.Spy, getAllTicketDetails: jasmine.Spy,  getTicketDetails: jasmine.Spy, addEmployee: jasmine.Spy };
    let movies:MovieDetails[]  = [{"id": 1000, "movieName": "sfasdf", "theaterName":"sdf", "totalNumberOfTicketsInTheater":234, "totalNumberOfTicketsBooked":34, "status":true },{"id": 100003, "movieName": "sfasdf", "theaterName":"sdf", "totalNumberOfTicketsInTheater":234, "totalNumberOfTicketsBooked":234, "status":true }]
    let currentUser: User = { "id": 100003, "firstName": "Srujan", "lastName": "Jilla", "email": "srujanjilla@gmail.com", "password": "$2a$10$BW9L/gFvBBMVd3BNQTDznOUz59c9hgCkn4UZ8CxxgVk59vKkUJBNK", "role": "ADMIN", "contactNumber":"9333333256","loginId":"srujanjilla" };
    let movie: MovieDetails = {"id": 100003, "movieName": "sfasdf", "theaterName":"sdf", "totalNumberOfTicketsInTheater":234, "totalNumberOfTicketsBooked":234, "status":true };

    beforeEach(async () => {
  
      loginServiceSpy = jasmine.createSpyObj(LoginService, { 'getCurrentUser': of(currentUser), 'logout': of(true), 'isLoggedIn': of(false), 'getUser':of(currentUser), 'generateToken':of({token: "sdfasdf"}), 'loginUser':of(true), 'setUser':of(true), 'getUserRole':of("ADMIN") });
      movieBookingServiceSpy = jasmine.createSpyObj(MovieBookingService, { 'deleteMovie':of(true),'getSubscription': of(subscription), 'getAllMovies': of(movies), 'emailExists': of(true), 'changePassword': of(true), 'updateEmployee': of(true), 'addEmployee': of(true), 'deleteEmployee': of(true), 'download': of(true), 'changeActive': of(true), 'getCurrentUser': of(currentUser), 'uniqueEmailUsername': of(true) });
      routerSpy = jasmine.createSpyObj(Router, { 'navigate': of(true) });
  
      await TestBed.configureTestingModule({
        imports: [FormsModule, HttpClientTestingModule],
        declarations: [UserDashBoardComponent, CustomPipePipe],
        providers: [
          { provide: LoginService, useValue: loginServiceSpy },
          { provide: MovieBookingService, useValue: movieBookingServiceSpy },
          { provide: Router, useValue: routerSpy },
          { provide: ActivatedRoute, useValue: { 'snapshot': { 'params': { 'id': 100003 } } } }

        ]
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(UserDashBoardComponent);
          component = fixture.componentInstance;
          loginService = TestBed.inject(LoginService);
          movieBookingService = TestBed.inject(MovieBookingService);
          router = TestBed.inject(Router);
          fixture.detectChanges();
        });
  
    });
    
    it('should create', fakeAsync(() => {
      expect(component).toBeTruthy();
    }));

    it('should book ticket', fakeAsync(() => {
        currentUser.role = "USER"
        component.currentUser = currentUser;
        expect(currentUser.role).toBe("USER");
        fixture.debugElement.nativeElement.querySelector('#movie').click();
        fixture.detectChanges();
        expect(component).toBeTruthy();
    }));
  
    it('should update ticket', fakeAsync(() => {
        currentUser.role = "ADMIN"
        component.flag = true;
        component.currentUser = currentUser;
        expect(currentUser.role).toBe("ADMIN");
        fixture.debugElement.nativeElement.querySelector('#movie').click();
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        expect(component).toBeTruthy();
    }));
});


