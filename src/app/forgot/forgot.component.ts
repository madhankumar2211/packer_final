import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  userForm : any;

  constructor(public fb : FormBuilder) { }

  ngOnInit(){
      this.userForm = this.fb.group({
        email : ['',[Validators.required,Validators.email]]
      });      
  }

  get email() {
    return this.userForm.controls['email'];
  }
  
  s(){
    console.log("hello");
    
  }

}