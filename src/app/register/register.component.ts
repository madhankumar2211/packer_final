import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  regForm : any;
  err = 0;

  constructor(public fb : FormBuilder) { }

  ngOnInit(){
    this.regForm = this.fb.group({
      name : ["",Validators.required],
      email : ["",[Validators.required,Validators.email]],
      phone : ["",[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      psw : ["",Validators.required],
      rpsw : ["",Validators.required]
    });
  }
  login(){
    console.log(this.regForm);
  }
  get name() {
    return this.regForm.controls['name'];
  }
  get email() {
    return this.regForm.controls['email'];
  }
  get phone() {
    return this.regForm.controls['phone'];
  }
  get psw() {
    return this.regForm.controls['psw'];
  }
  get rpsw() {
    return this.regForm.controls['rpsw'];
  }

}
