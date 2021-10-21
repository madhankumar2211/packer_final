import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor( public ps : ProfileService,
              public router : Router) { }
  user:any;
  specifiedUser :any;
  allorder : any;
  count : boolean = true;
  completed : boolean = true;
  cancelled : boolean = true;
  psw:any;
  
  ngOnInit(): void {
    // this.ps.getAllUser().subscribe((u)=>{
    //   this.user=u;
    // })

    // user details
    this.ps.getSpecifiedUser().subscribe((s)=>{
      this.specifiedUser=s;
      console.log("specified user ::",this.specifiedUser);
      const p: any = '*'
      this.psw = p.repeat(5)
      })
    //order details
    this.ps.getallorder().subscribe((o)=>{
      this.allorder = o;
      console.log("All orders of the user",this.allorder);
      this.allorder.forEach(element => {
        if(element.recordStatus == 1){
          this.count = false
        }else if (element.recordStatus == 0){
          this.completed = false
        }
        else{
          this.cancelled = false
        }
        
      });
      
    })
    
  }

  editprofile(){
    
    this.router.navigate(['/Update']);
  }
  cancel(x){
    this.ps.cancelorder(x).subscribe((data) => {
      console.log(data);
      window.location.reload();
      
    })
    
  }

}
