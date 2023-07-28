import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authRequest:HttpRequest<any> = req;

        //add the jwt token (local storage ) request
        const token = this.loginService.getToken();
        if(token!= null){
        
            authRequest = authRequest.clone({ headers: authRequest.headers.set('Authorization', 'Bearer ' + token) });
        }
        return next.handle(authRequest);
  }
}

export const authIntercepterProviders= [
  {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true,
  }
]