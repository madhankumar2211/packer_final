import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor( public http : HttpClient, public ar: ActivatedRoute) { }

  getAllUser(){
    return this.http.get("http://localhost:7060/userlist")
  }

  getSpecifiedUser(){
    return this.http.get(`http://localhost:7060/user/614ee5566ce0ef9e7f6822b3`)
  }
}
