import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(public http: HttpClient, public ar: ActivatedRoute) { }

  // getAllUser(){
  //   return this.http.get("http://localhost:7060/userlist")
  // }
  //profile
  getSpecifiedUser() {
    return this.http.get("http://localhost:7080/user", {
      withCredentials: true
    })
  }



  updateuser(user: any) {
    console.log('user id::', user._id);
    return this.http.put(`http://localhost:7080/updateuser/${user._id}`, user);
  }
  //order
  getallorder() {
    return this.http.get(`http://localhost:7080/vieworder/614ee5566ce0ef9e7f6822b3`);
  }

  cancelorder(order) {
    console.log("order id :: ", order._id);
    return this.http.put("http://localhost:7080/updateorder", order);
  }

  //contact us
  add(x: any) {
    return this.http.post<any>('http://localhost:7080/contactinfo', x);
  }
  //tracking
  getListOne(tid){
    return this.http.get(`http://localhost:9080/data/${tid}`

    )}
}
