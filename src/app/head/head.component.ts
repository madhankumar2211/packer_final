import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  loginstatus: boolean;

  constructor(public uS : UsersService,
    public router : Router) { }

  ngOnInit(): void {
    this.uS.isloggedin.subscribe((stat)=>{this.loginstatus=stat})
  }

  profile(){
    
    this.uS.profile().subscribe((data) =>{
      this.router.navigateByUrl(data["link"]);
    })
  }
  tracking(){
    
    this.uS.tracking().subscribe((data) =>{
      this.router.navigateByUrl(data["link"]);
    })
  }
  logout(){      
    this.uS.logout().subscribe((data)=>{
        console.log(data);
        alert('Log out')
        //this.uS.logoutuser();
        this.router.navigateByUrl('/Login')
    },
    (err) => {
      console.log(err);
      
      const e = err
      if(e.status === 404)
      {
        alert('You are not logged in')
        this.router.navigateByUrl('/Login')
      }
      
    })
}

}


