import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	regForm : FormGroup;
	err = 0;
	check : boolean = false;
	submitted : boolean = false;
	val :any;
	error : any;
	tdy : any;

	constructor(public fb : FormBuilder, public uS : UsersService, public router :Router) { }
	// password : any;

	ngOnInit()
	{
		this.regForm = this.fb.group({
			name : ["",Validators.required],
			email : ["",[Validators.required,Validators.email]],
			phone : ["",[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
			psw : ["",Validators.required],
			rpsw : ["",Validators.required],
		});     
	}
	onSubmit()
	{
		this.submitted = true;
		if(this.regForm.status === "VALID")
		{
			this.val = this.regForm.value;
			delete this.val['rpsw']
			this.uS.register(this.val)
			.subscribe((data) => {
			//console.log(data);
			alert("Registered Successfully...You can login now")
			this.router.navigateByUrl('/Login');
			},
			(err: string) => {
			this.error = err
			alert(this.error.error.text)
			});
		}
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


