import { HttpInterceptor} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersService } from './users.service';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private uS: UsersService) { }

  intercept(req, next) {
    //console.log("interceptor Running");
    
    let tokenizeReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.uS.getToken()}`
      }
    });
    
    return next.handle(tokenizeReq);
  }
  
}
