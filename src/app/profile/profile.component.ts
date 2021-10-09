import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor( public ps : ProfileService) { }
  user:any;
  specifiedUser :any;
  ngOnInit(): void {
    this.ps.getAllUser().subscribe((u)=>{
      this.user=u;
    })
    this.ps.getSpecifiedUser().subscribe((s)=>{
      this.specifiedUser=s;
      console.log(this.specifiedUser);
      
    })
  }

}
