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
    console.log(this.alldata);
    
      // this.router.navigateByUrl('/second')
      this.pS.getListOne(this.alldata.value.tid).subscribe((data) => {
        this.track = data["tid"];
        this.bdate = data["bd"];
        this.status = data["status"];
        this.phone = data["mob"];
        
        console.log(data['tid']);
        
        
      })
   

  }
  

}
  

  

