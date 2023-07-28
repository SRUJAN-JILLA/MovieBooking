import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { User } from '../classses/user';
import { LoginService } from '../login.service';
import { MovieBookingService } from '../movie-booking.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: any;
  let movieBookingService: any;
  let router: any;
  let routerSpy: { navigate: jasmine.Spy };
  let loginServiceSpy: { getCurrentUser: jasmine.Spy, isLoggedIn: jasmine.Spy, logout: jasmine.Spy, loginUser:jasmine.Spy, getUser:jasmine.Spy, generateToken:jasmine.Spy, setUser:jasmine.Spy, getUserRole:jasmine.Spy};
  let movieBookingServiceSpy: { getSubscription: jasmine.Spy, subscribe: jasmine.Spy, deleteMovie: jasmine.Spy, updateStatus: jasmine.Spy, uniqueEmailUsername: jasmine.Spy, emailExists: jasmine.Spy, changePassword: jasmine.Spy, bookTicket: jasmine.Spy, getMovieBasedOnId: jasmine.Spy, getAllTicketDetails: jasmine.Spy,  getTicketDetails: jasmine.Spy, addEmployee: jasmine.Spy };

  let currentUser: User = { "id": 100003, "firstName": "Srujan", "lastName": "Jilla", "email": "srujanjilla@gmail.com", "password": "$2a$10$BW9L/gFvBBMVd3BNQTDznOUz59c9hgCkn4UZ8CxxgVk59vKkUJBNK", "role": "ADMIN", "contactNumber":"9333333256","loginId":"srujanjilla" };

  beforeEach(async () => {

    loginServiceSpy = jasmine.createSpyObj(LoginService, { 'getCurrentUser': of(currentUser), 'logout': of(true), 'isLoggedIn': of(false), 'getUser':of(currentUser), 'generateToken':of({token: "sdfasdf"}), 'loginUser':of(true), 'setUser':of(true), 'getUserRole':of("ADMIN") });
    movieBookingServiceSpy = jasmine.createSpyObj(MovieBookingService, { 'emailExists': of(true), 'changePassword': of(true), 'updateEmployee': of(true), 'addEmployee': of(true), 'deleteEmployee': of(true), 'download': of(true), 'changeActive': of(true), 'getCurrentUser': of(currentUser) });
    routerSpy = jasmine.createSpyObj(Router, { 'navigate': of(true) });

    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [LoginComponent],
      providers: [
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: MovieBookingService, useValue: movieBookingServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(LoginComponent);
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

  it('should admin login ', fakeAsync(() => {
    movieBookingService.emailExists.and.returnValue(of(true));
    fixture.debugElement.nativeElement.querySelector('button').click();
    loginService.getUserRole.and.returnValue("ADMIN");
    flush();
    expect(component).toBeTruthy();
  }));

  it('should user login ', fakeAsync(() => {
    movieBookingService.emailExists.and.returnValue(of(true));
    fixture.debugElement.nativeElement.querySelector('button').click();
    loginService.getUserRole.and.returnValue("USER");
    flush();
    expect(component).toBeTruthy();
  }));

  it('should some other user login ', fakeAsync(() => {
    movieBookingService.emailExists.and.returnValue(of(true));
    fixture.debugElement.nativeElement.querySelector('button').click();
    loginService.getUserRole.and.returnValue("sd");
    flush();
    expect(component).toBeTruthy();
  }));

  it('should email doesnot exist ', fakeAsync(() => {
    movieBookingService.emailExists.and.returnValue(of(false));
    fixture.debugElement.nativeElement.querySelector('button').click();
    loginService.getUserRole.and.returnValue("sd");
    flush();
    expect(component).toBeTruthy();
  }));
  
  it('should navigate to signup component', () => {
    fixture.debugElement.nativeElement.querySelector('.signup').click()
    fixture.detectChanges();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/signup']);
    expect(component).toBeTruthy();
  });

  it('should navigate to forgot Password component', () => {
    fixture.debugElement.nativeElement.querySelector('#forgotPassword').click()
    fixture.detectChanges();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/forgotPassword']);
    expect(component).toBeTruthy();
  });
});
