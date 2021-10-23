import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;
  submitted: boolean = false;
  error  :any;

  constructor(public fb : FormBuilder,public uS:UsersService,public router : Router) { }

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
  onSubmit()
  {
    this.submitted = true;
    if(this.loginForm.status === "VALID"){
        this.uS.login(this.loginForm.value).subscribe((data) => {          
            localStorage.setItem('token', data.token);
            this.uS.user = data.data;
            this.uS.isloggedin.next(true)
            alert("Successfully Logged In..Welcome " + data.data.name);
            this.router.navigateByUrl('/Home');  
        },
        (err) =>{
          this.uS.isloggedin.next(false)
          this.error = err.error.text
          //console.log(err);
        });
    }
  }
  logout(){      
      this.uS.logout();
      alert("logout successfully")
  }
}
