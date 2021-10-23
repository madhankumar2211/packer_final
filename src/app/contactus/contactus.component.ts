import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, FormBuilder,Validators } from '@angular/forms';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  contactform : any;
  constructor( public fb: FormBuilder,public ps :ProfileService) { }
  record :any;

  ngOnInit(): void {

    this.contactform = this.fb.group({
      fullname : ['',Validators.required],
      email :['',[Validators.required,Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+[a-zA-Z]+$")]],
      message :['',Validators.required]
    })
  }
  get fullname() {
    return this.contactform.controls['fullname'];
  }
  get email() {
    return this.contactform.controls['email'];
  }
  get message() {
    return this.contactform.controls['message'];
  }
  getalldetails(){
    //console.log(this.contactform.value);
    alert("Thank you...Request Submitted Successfully !...");
    
    this.ps.add(this.contactform.value).subscribe((data) => {

      //console.log(data);

      this.record = data;

    });
    this.contactform.reset();
  }

  
}
