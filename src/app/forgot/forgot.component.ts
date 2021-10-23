import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  userForm : FormGroup;
  submitted : boolean = false;
  error : any;
  uerr : boolean = false;
  valid : boolean = false;

  constructor(public fb : FormBuilder,public uS : UsersService,public router : Router) { }

  ngOnInit(){
      this.userForm = this.fb.group({
        email : ['',[Validators.required,Validators.email]],
        psw : ['']
      });      
  }

  get email() {
    return this.userForm.controls['email'];
  }
  
  onSubmit(){
    this.submitted = true; 
    this.uerr = false
    if(this.userForm.status === 'VALID') 
    {
      if(this.valid)
      {
        this.uS.updatepassword(this.userForm.value).subscribe((data) => {         
          alert("password updated")
          this.router.navigateByUrl('/Login')
        })
      }
      else{
        this.uS.forgot(this.userForm.value).subscribe((resp :any) => {
          //console.log(resp);
          this.valid = true
        },(err) => {
          this.error = err.error;
          this.uerr = true
        })
      }
    }
  }

  profile(){
    this.router.navigateByUrl('/Profile');
  }
}
