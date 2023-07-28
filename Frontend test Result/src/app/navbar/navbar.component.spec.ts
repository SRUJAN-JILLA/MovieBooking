import { NavbarComponent } from './navbar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { of } from 'rxjs';

import { FormsModule } from '@angular/forms';
import { LoginService } from '../login.service';
import { MovieBookingService } from '../movie-booking.service';
import { User } from '../classses/user';
describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let loginService: any;
  let movieBookingService: any;
  let router: any;
  let routerSpy: { navigate: jasmine.Spy };
  let loginServiceSpy: { getCurrentUser: jasmine.Spy, isLoggedIn: jasmine.Spy, logout: jasmine.Spy };
  let movieBookingServiceSpy: { getSubscription: jasmine.Spy, subscribe: jasmine.Spy, deleteMovie: jasmine.Spy, updateStatus: jasmine.Spy, uniqueEmailUsername: jasmine.Spy, emailExists: jasmine.Spy, changePassword: jasmine.Spy, bookTicket: jasmine.Spy, getMovieBasedOnId: jasmine.Spy, getAllTicketDetails: jasmine.Spy,  getTicketDetails: jasmine.Spy, addEmployee: jasmine.Spy };

  let currentUser: User = { "id": 100003, "firstName": "Srujan", "lastName": "Jilla", "email": "srujanjilla@gmail.com", "password": "$2a$10$BW9L/gFvBBMVd3BNQTDznOUz59c9hgCkn4UZ8CxxgVk59vKkUJBNK", "role": "ADMIN", "contactNumber":"9333333256","loginId":"srujanjilla" };

  beforeEach(async () => {

    loginServiceSpy = jasmine.createSpyObj(LoginService, { 'getCurrentUser': of(currentUser), 'logout': of(true), 'isLoggedIn': of(false), 'getUser':of(currentUser) });
    movieBookingServiceSpy = jasmine.createSpyObj(MovieBookingService, { 'emailExists': of(true), 'changePassword': of(true), 'updateEmployee': of(true), 'addEmployee': of(true), 'deleteEmployee': of(true), 'download': of(true), 'changeActive': of(true), 'getCurrentUser': of(currentUser) });
    routerSpy = jasmine.createSpyObj(Router, { 'navigate': of(true) });

    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [NavbarComponent],
      providers: [
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: MovieBookingService, useValue: movieBookingServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(NavbarComponent);
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

  // if the user is not logged in 
  it('should navigate to login component', fakeAsync(() => {
    loginService.isLoggedIn.and.returnValue(false);
    fixture.detectChanges();
    fixture.debugElement.nativeElement.querySelector('#login').click()
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  }));

  // if the user is not logged in 
  it('should navigate to signup component', fakeAsync(() => {
    loginService.isLoggedIn.and.returnValue(false);
    fixture.detectChanges();
    fixture.debugElement.nativeElement.querySelector('.signUp').click()
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/signup']);
  }));

  it('should navigate to login component', fakeAsync(() => {
    loginService.isLoggedIn.and.returnValue(false);
    loginService.logout.and.returnValue(of(true));
    fixture.detectChanges();
    fixture.debugElement.nativeElement.querySelector('#main').click()
    expect(component).toBeTruthy();
  }));

  // if the user is logged in
  it('should navigate to movies component', fakeAsync(() => {
    loginService.isLoggedIn.and.returnValue(true);
    fixture.detectChanges();
    fixture.debugElement.nativeElement.querySelector('#movies').click()
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/userDashBoard']);
  }));

  // if the user is logged in
  it('should navigate to bookings component', fakeAsync(() => {
    loginService.isLoggedIn.and.returnValue(true);
    fixture.detectChanges();
    fixture.debugElement.nativeElement.querySelector('#bookingDetails').click()
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/bookingDetails']);
  }));

  it('should logout and navigate to main component', fakeAsync(() => {
    loginService.isLoggedIn.and.returnValue(true);
    fixture.detectChanges();
    fixture.debugElement.nativeElement.querySelector('#logout').click()
    loginService.logout.and.returnValue(of(true));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));
});
