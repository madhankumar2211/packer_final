import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {

  alldata: FormGroup = new FormGroup({});  
   constructor(private fb: FormBuilder) {  
    this.alldata = fb.group({  
      nam: ['', [Validators.required]],
      mob: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]] ,
      tid: ['', [Validators.required,Validators.pattern("[A-Z]{3}[0-9]{3}")]],
      bd: ['',[Validators.required]]
    })  
  }  
get f(){  
    return this.alldata.controls;  
  }  
  getall()
    {
       //console.log(this.alldata.value);
       //this.alldata.value.subscribe((data)=>{
       // console.log("Data",data)
       //this.router.navigate(['/second']);
       alert("Student Added Successfully")
       //  this.router.navigate(['/viewstudents'])
      
    }
    ngOnInit(): void {
    }

}

  

  

