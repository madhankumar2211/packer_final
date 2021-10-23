import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor( public ps : ProfileService,
              public router : Router,
              public uS : UsersService) 
              { 

                this.uS.loggedUser().subscribe((data) => {
                  this.specifiedUser = data
                  console.log(this.specifiedUser);
                })       
              }
  user:any;
  specifiedUser :any;
  allorder : any;
  count : boolean = true;
  completed : boolean = true;
  cancelled : boolean = true;
  psw:any;
  
  ngOnInit(): void {

    //console.log(this.specifiedUser);
    
    const p: any = '*'
    this.psw = p.repeat(5)

    // user details
    this.uS.profile().subscribe((data) => {
      this.router.navigateByUrl(data['link'])
    },(err) =>{
        alert("Your session is expired please login again.")
        this.uS.isloggedin.next(false)
        localStorage.removeItem('token');
        this.router.navigateByUrl(err.error['link'])
        //console.log(err);
        
      })
    //order details
    this.ps.getallorder().subscribe((o)=>{
      this.allorder = o;
      //console.log("All orders of the user",this.allorder);
      this.allorder.forEach(element => {
        if(element.Record_status == 1){
          this.count = false
        }else if (element.Record_status == 0){         
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
      
      window.location.reload();
      
    })
    
  }

}
