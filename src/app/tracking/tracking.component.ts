import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {

  track:any;
  status:any;
  phone:any;
  bdate:any;
  ddate : any;
  bar:any;

  // constructor(public iS:InformService,public http:HttpClient) { }
  alldatas:any

  
  ngOnInit(): void{}
   /* {
      this.iS.getList().subscribe((data) => {
        this.alldatas = data;
      });
    },public iS: InformService,public http: HttpClient
   }*/
  
  alldata: FormGroup = new FormGroup({});  
   constructor(private fb: FormBuilder,public pS: ProfileService,public http: HttpClient,public router : Router) {  
    this.alldata = fb.group({  
      nam: ['', [Validators.required]],
      // mob: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]] ,
      tid: ['', [Validators.required,Validators.pattern("[A-Z]{3}[0-9]{3}")]]
      // bd: ['',[Validators.required]]
    })  
  }  
get f(){  
    return this.alldata.controls;  
  }  
  getall(): void
  {
    //console.log(this.alldata);
    
      // this.router.navigateByUrl('/second')
      this.pS.getListOne(this.alldata.value).subscribe((data) => {
        //console.log(data.order_status);
        //console.log("hii");
        
        
        this.track = data["_id"];
        this.bdate = data.order_status["b_date"];
        this.status = data.order_status["status"];
        this.phone = data.order_status["phone"];
        this.ddate = data.order_status["d_date"];
        
        //console.log(data['tid']);

        if(this.status == "Start"){
          this.bar = 32;
        }
        else if(this.status == "Processing")
        {
          this.bar = 70;
        }
        else{
          this.bar = 100;

        }
        
      })
   

  }
  

}
  

  

