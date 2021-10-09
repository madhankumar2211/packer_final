import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  contactform : any;
  constructor( public fb: FormBuilder) { }

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
    
  }
}
