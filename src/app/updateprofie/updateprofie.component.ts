import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-updateprofie',
  templateUrl: './updateprofie.component.html',
  styleUrls: ['./updateprofie.component.css']
})
export class UpdateprofieComponent implements OnInit {

  regForm : any;
  err = 0;
  id : any;

  constructor(public fb : FormBuilder,
     public aR : ActivatedRoute,
     public pS : ProfileService,
     public router : Router) { }

  ngOnInit(){
    this.regForm = this.fb.group({
      name : ["",Validators.required],
      email : ["",[Validators.required,Validators.email]],
      phone : ["",[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      psw : ["",Validators.required],
      rpsw : ["",Validators.required],
      _id :[]
    });



    
      
      this.pS.getSpecifiedUser().subscribe((value : any) => {
        this.regForm.get('name').setValue(value.name),
        this.regForm.get('email').setValue(value.email),
        this.regForm.get('phone').setValue(value.phone),
        this.regForm.get('psw').setValue(value.psw),
        this.regForm.get('_id').setValue(value._id)
        //console.log(value);
        
      });
    
  }

  



  update(){
    //console.log(this.regForm.value);
    this.pS.updateuser(this.regForm.value).subscribe((x) => {
      //console.log(x);
      this.router.navigate(['/Profile']);
    });
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