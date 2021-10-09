import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-booknow',
  templateUrl: './booknow.component.html',
  styleUrls: ['./booknow.component.css']
})
export class BooknowComponent implements OnInit {

  constructor() { }

  cusname:any;
  cusnum:any;
  cusmail:any;
  cuspackagewei:any;
  v_type:any;
  fromadd:any;
  fromcy:any;
  toadd:any;
  tocy:any;
  datee:any;
  inc:any;
  bookingForm:any;
  
  
  currentD = new Date();

  ngOnInit(): void {

    this.bookingForm=new FormGroup({
      name:new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]),
      num:new FormControl('', [
        Validators.required,
        Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
      ]),
      mail:new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+[a-zA-Z]+$"),
      ]),
      weight:new FormControl('', [
        Validators.required,
        Validators.pattern("^$|^([1-9]|[0-9][0-9]|[0-9][0-9][0-9])?")
        
      ]),
      new:new FormControl(),
      from:new FormControl('',[
        Validators.required,
        Validators.minLength(15),
      ]),
      from_c:new FormControl(),
      to:new FormControl('',[
        Validators.required,
        Validators.minLength(15),
      ]),
      to_C:new FormControl(),
      date:new FormControl({    
        'presentDate': new FormControl((new Date()).toISOString().substring(0,10))
       }),
      insuram:new FormControl()
    })
  }
  
  get name(){
    return this.bookingForm.controls['name'];
  }
  get num(){
    return this.bookingForm.controls['num'];
  }
  get mail(){
    return this.bookingForm.controls['mail'];
  }
  get weight(){
    return this.bookingForm.controls['weight'];
  }
  get from(){
    return this.bookingForm.controls['from'];
  }
  get to(){
    return this.bookingForm.controls['to'];
  }

}