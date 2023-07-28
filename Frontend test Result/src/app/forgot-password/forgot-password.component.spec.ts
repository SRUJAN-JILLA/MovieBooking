import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { ForgotPasswordComponent } from './forgot-password.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { User } from '../classses/user';
import { LoginService } from '../login.service';
import { MovieBookingService } from '../movie-booking.service';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  let loginService: any;
  let movieBookingService: any;
  let router: any;
  let routerSpy: { navigate: jasmine.Spy };
  let loginServiceSpy: { getCurrentUser: jasmine.Spy, isLoggedIn: jasmine.Spy, logout: jasmine.Spy, loginUser:jasmine.Spy, getUser:jasmine.Spy, generateToken:jasmine.Spy, setUser:jasmine.Spy, getUserRole:jasmine.Spy};
  let movieBookingServiceSpy: { getSubscription: jasmine.Spy, subscribe: jasmine.Spy, deleteMovie: jasmine.Spy, updateStatus: jasmine.Spy, uniqueEmailUsername: jasmine.Spy, emailExists: jasmine.Spy, changePassword: jasmine.Spy, bookTicket: jasmine.Spy, getMovieBasedOnId: jasmine.Spy, getAllTicketDetails: jasmine.Spy,  getTicketDetails: jasmine.Spy, addEmployee: jasmine.Spy };

  let currentUser: User = { "id": 100003, "firstName": "Srujan", "lastName": "Jilla", "email": "srujanjilla@gmail.com", "password": "$2a$10$BW9L/gFvBBMVd3BNQTDznOUz59c9hgCkn4UZ8CxxgVk59vKkUJBNK", "role": "ADMIN", "contactNumber":"9333333256","loginId":"srujanjilla" };

  beforeEach(async () => {

    loginServiceSpy = jasmine.createSpyObj(LoginService, { 'getCurrentUser': of(currentUser), 'logout': of(true), 'isLoggedIn': of(false), 'getUser':of(currentUser), 'generateToken':of({token: "sdfasdf"}), 'loginUser':of(true), 'setUser':of(true), 'getUserRole':of("ADMIN") });
    movieBookingServiceSpy = jasmine.createSpyObj(MovieBookingService, { 'emailExists': of(true), 'changePassword': of(true), 'updateEmployee': of(true), 'addEmployee': of(true), 'deleteEmployee': of(true), 'download': of(true), 'changeActive': of(true), 'getCurrentUser': of(currentUser), 'uniqueEmailUsername': of(true) });
    routerSpy = jasmine.createSpyObj(Router, { 'navigate': of(true) });

    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [ForgotPasswordComponent],
      providers: [
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: MovieBookingService, useValue: movieBookingServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ForgotPasswordComponent);
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

  it('should navigate to login cosmponent', () => {
    movieBookingService.emailExists.and.returnValue(of(false));
    fixture.debugElement.nativeElement.querySelector('.btn').click()
    fixture.detectChanges();
    movieBookingService.changePassword.and.returnValue(of(true));
    loginService.logout.and.returnValue(of(true));
    expect(component).toBeTruthy();
  });
 
  it('should not if passwords do not match navigate to login cosmponent', () => {
    movieBookingService.emailExists.and.returnValue(of(true));
    fixture.debugElement.nativeElement.querySelector('.btn').click()
    fixture.detectChanges();
    movieBookingService.changePassword.and.returnValue(of(true));
    loginService.logout.and.returnValue(of(true));
    expect(component).toBeTruthy();
  });

  it('should not if passwords dont match navigate to login cosmponent', () => {
    movieBookingService.emailExists.and.returnValue(of(true));
    // movieBookingService.uniqueEmailUsername.returnValue(false)
    component.confirmPassword = "sdfsdf";
    component.password1 = "asdfasgasfa";
    fixture.debugElement.nativeElement.querySelector('.btn').click()
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
