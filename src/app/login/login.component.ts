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
  onSubmit(){
	this.submitted = true;
  this.error =''
	if(this.loginForm.status === "VALID"){
      this.uS.login(this.loginForm.value).subscribe((data) => {
          console.log(data);
          alert("Successfully Logged In..Welcome " + data.name);
          //this.uS.logoinuser();
          this.router.navigateByUrl('/Home');  
      },
      (err) =>{
          this.error = err.error.text;
          console.log(this.error);
      });
	}
  }
  // logout(){      
  //     this.uS.logout().subscribe((data)=>{
  //         console.log(data);
  //         alert('Log out')
  //         this.router.navigateByUrl('/register')
  //     },
  //     (err) => {
  //       console.log(err);
        
  //       const e = err
  //       if(e.status === 404)
  //       {
  //         alert('You are not logged in')
  //         this.router.navigateByUrl('/register')
  //       }
        
  //     })
  // }
}
