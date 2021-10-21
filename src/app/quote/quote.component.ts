import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {

  constructor(public qf: FormBuilder,public rs: UsersService) { }


  quoteForm:any;  
  record:any;
  submitted: boolean = false;
  place="Enter the booking date"
  vechile : any;
  
  currentD = new Date();

  ngOnInit(): void {


      this.rs.vehicle().subscribe((data) => {
      this.vechile = data
    
      })

      this.quoteForm=this.qf.group({
      name:['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      num:['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[6-9]{1}?[0-9]{9}$")]],
      from: ['', [Validators.required, Validators.minLength(15)]],
      from_c: [],
      to: ['', [Validators.required, Validators.minLength(15)]],
      to_City: [],
      weight: ['', [Validators.required, Validators.pattern("^$|^([1-9]|[0-9][0-9]|[0-9][0-9][0-9])?")]],
      ve_type: [],
      date: [],
      kilometer:['', [Validators.required]],
    })
  }



  onSubmit() {
    this.submitted = true
    if (this.quoteForm.status === 'VALID') {   
      this.rs.addquote(this.quoteForm.value).subscribe((data: any) => {
        console.log(data);
        this.record = data;
      });
      window.location.href="http://online.pubhtml5.com/orut/egyb/#p=1"
    }
    this.quoteForm.reset();
    
  }
  
  get name(){
    return this.quoteForm.controls['name'];
  }
  get num(){
    return this.quoteForm.controls['num'];
  }
  get weight(){
    return this.quoteForm.controls['weight'];
  }
  get from(){
    return this.quoteForm.controls['from'];
  }
  get to(){
    return this.quoteForm.controls['to'];
  }
  get kilometer(){
    return this.quoteForm.controls['kilometer'];
  }
  

}
