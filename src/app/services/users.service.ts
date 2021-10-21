import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  order : any;

  constructor(public http: HttpClient) { }

  isloggedin = new BehaviorSubject(false)

  forgot(x) {
    return this.http.post('http://localhost:7080/forgot', x);
  }
  updatepassword(x) {
    return this.http.put('http://localhost:7080/updatepassword', x);
  }
  login(x) {
    this.isloggedin.next(true)
    return this.http.post<any>("http://localhost:7080/login", x, {
      withCredentials: true
    })
  }
  register(x) {
    return this.http.post<any>('http://localhost:7080/register', x);
  }
  logout() {
    this.isloggedin.next(false)
    return this.http.post('http://localhost:7080/logout', {}, {
      withCredentials: true
    });
  }

  profile() {
    return this.http.get('http://localhost:7080/Profile', {
      withCredentials: true
    });
  }
  tracking() {
    return this.http.get('http://localhost:7080/Tracking', {
      withCredentials: true
    });
  }
  book() {
    return this.http.get('http://localhost:7080/Payment', {
      withCredentials: true
    });
  }



  logoutuser() {
    this.isloggedin.next(false)
  }
  logoinuser() {
    this.isloggedin.next(true)
  }



  //order table

  add(x:any) {
    return this.http.post<any>('http://localhost:7080/booking', x);
  }
  addquote(y:any) {
    return this.http.post<any>('http://localhost:7080/insertquote', y);
  }
  vehicle(){
    return this.http.get<any>('http://localhost:7080/vehicleviewnew');
  }

  //payment
  addpayment(x:any) {
    return this.http.post<any>('http://localhost:7080/addpaymentinfo', x);
  }
}
