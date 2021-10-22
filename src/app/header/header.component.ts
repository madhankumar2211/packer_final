import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loginstatus: boolean;

  constructor(public uS : UsersService,
    public router : Router) { }

  ngOnInit(): void {
    this.uS.isloggedin.subscribe((stat)=>{this.loginstatus=stat})
  }

  profile(){
    
    this.router.navigateByUrl('/Profile');
  }
  tracking(){
    this.router.navigateByUrl('/Tracking');
  }
  logout(){      
    this.uS.logout();
  }

}
