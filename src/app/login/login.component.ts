import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   loginForm : any; 

  constructor(public fb : FormBuilder) { }


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email : ["",[Validators.required,Validators.email]],
      psw : ["",Validators.required]
    })
  }

  get email() {
    return this.loginForm.controls['email'];
  }
  get psw() {
    return this.loginForm.controls['psw'];
  }

}
