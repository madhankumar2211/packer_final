import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  paymentForm: FormGroup;
  displayMessage: string;

  constructor(private formBuilder: FormBuilder, public us : UsersService ,public router : Router) {}

  record: any;
  amt : any;

  ngOnInit() {
    if(!this.us.loggedIn())
    {
      this.router.navigateByUrl('/Login')
    }
    else{
      //console.log(this.us.order);
      
      this.amt = this.us.order.Price
      this.buildForm();
    }
  }

  buildForm() {
    this.paymentForm = this.formBuilder.group({
      nameOnCard: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.pattern('^[A-Za-z][A-Za-z -]*$'),
        ],
      ],
      cardNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(16),
          Validators.min(1111111111111111),
          Validators.max(9999999999999999),
        ],
      ],
      expirationMonth: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(2),
          Validators.min(1),
          Validators.max(12),
        ],
      ],
      expirationYear: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
          Validators.min(1111),
          Validators.max(9999),
        ],
      ],
      cardCVVNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(3),
          Validators.min(111),
          Validators.max(999),
        ],
      ],
    });
  }

  get f() {
    return this.paymentForm.controls;
  }

  onSubmit() {
    this.submitForm();
  }

  submitForm() {
    if (this.paymentForm.invalid) {
      this.displayMessage = 'Payment Failed!';
      return;
    }
    this.displayMessage = 'Payment Successful!';
  }
  fun() {
    //console.log(this.paymentForm.value);

    this.us.addpayment(this.paymentForm.value).subscribe((data) => {
      //console.log(data);

      this.record = data;
    });

    var or = this.us.order
    this.us.add(or).subscribe((data: any) => {
        //console.log(data);
        //console.log("hii");
        
        this.record = data;
        alert(`Order Id : ${data.insertedId}`)
      });
      this.router.navigateByUrl('/Tracking');
  }
}

