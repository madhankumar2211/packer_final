import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { City, Country, State } from 'country-state-city';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-booknow',
  templateUrl: './booknow.component.html',
  styleUrls: ['./booknow.component.css']
})
export class BooknowComponent implements OnInit {

  constructor(private router: Router, public fb: FormBuilder, public rs: UsersService) { }

  Fcity: any;
  Tcity: any;
  City_to: Boolean = false;
  bookingForm: any;
  countries: any;  
  record: any;
  price: any;    
  vechile: any;    
  Tlatlong: any;
  Flatlong: any;
  Products: any;
  Sample_var: any;
  Sample_var1: any;


  submitted: boolean = false;

  currentD = new Date();

  ngOnInit(): void {
    if(!this.rs.loggedIn()){
      alert('You are a not Logged In user.....Still you can get Quote from us.\n For booking you need to log in..')
    }

    //console.log(Country.getAllCountries())
    //console.log(State.getStatesOfCountry("IN"))
    this.countries = State.getStatesOfCountry("IN")




    this.Products = ['Apartment', 'Office', 'Furniture', 'Fragile products', 'Goods', 'Others']



    this.rs.vehicle().subscribe((data) => {
      this.vechile = data

    })


    this.bookingForm = this.fb.group({
      Cus_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      Cus_number: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[6-9]{1}?[0-9]{9}$")]],
      // Package_weight: ['', [Validators.required, Validators.pattern("^$|^([0-9]|[0-9][0-9]|[0-9][0-9][0-9])?")]],
      Product_shipping: [],
      Vehicle_type: [],
      From_door_and_address: ['', [Validators.required, Validators.pattern("^[#.0-9a-zA-Z\s,-]+$")]],
      From_state: [],
      From_city: [],
      To_door_and_address: ['', [Validators.required, Validators.pattern("^[#.0-9a-zA-Z\s,-]+$")]],
      To_state: [],
      To_city: [],
      Date: [],
      coption: [],
      kilometer: [],
      Price: [],
      Record_status: 1

    })



  }
  

  onSubmit() {


    this.submitted = true
   
    if (this.City_to == false) {


      this.bookingForm.value.kilometer = this.distance(this.Flatlong[0], this.Flatlong[0], this.Flatlong[1], this.Flatlong[1]).toFixed(1);

      this.bookingForm.value.kilometer = parseInt(this.bookingForm.value.kilometer)      

      this.bookingForm.value.From_city = this.Sample_var      

      this.bookingForm.value.To_state = this.bookingForm.value.From_state
      this.bookingForm.value.To_city = this.bookingForm.value.From_city  


      if (this.bookingForm.status === 'VALID') {
        for (let index in this.vechile) {

          if (this.bookingForm.value.Vehicle_type == this.vechile[index].vechile_name) {

            if (this.bookingForm.value.kilometer <= 50) {

              this.bookingForm.value.Price = this.vechile[index].base_price           

            }          
          }
        };
        if(this.rs.loggedIn()){
          alert("Your estimated price is : "+" Rs. "+ this.bookingForm.value.Price );
          this.rs.order = this.bookingForm.value;
          this.router.navigateByUrl('/Payment');
        }
        else{
          alert("You need to log in first")
          this.router.navigateByUrl('/Login');
        }
      }
    }

    else {

      this.bookingForm.value.kilometer = this.distance(this.Flatlong[0], this.Tlatlong[0], this.Flatlong[1], this.Tlatlong[1]).toFixed(1);
      this.bookingForm.value.kilometer = parseInt(this.bookingForm.value.kilometer)
      
      this.bookingForm.value.From_city = this.Sample_var;
      this.bookingForm.value.To_city = this.Sample_var1;



      if (this.bookingForm.status === 'VALID') {

        for (let index in this.vechile) {

          if (this.bookingForm.value.Vehicle_type == this.vechile[index].vechile_name) {            


            this.bookingForm.value.Price = (this.vechile[index].add_price * this.bookingForm.value.kilometer)
            this.bookingForm.value.Price = (this.bookingForm.value.Price - this.vechile[index].base_price)           

          }
        }
      };

      if(this.rs.loggedIn()){
          alert("Your estimated price is : "+" Rs. "+ this.bookingForm.value.Price );
          this.rs.order = this.bookingForm.value;
          this.router.navigateByUrl('/Payment');
      }
      else{
        alert("You need to log in first")
        this.router.navigateByUrl('/Login');
      }
    }
    this.bookingForm.reset();
  }

  get name() {
    return this.bookingForm.controls['Cus_name'];
  }
  get num() {
    return this.bookingForm.controls['Cus_number'];
  }
  get weight() {
    return this.bookingForm.controls['Package_weight'];
  }
  get from() {
    return this.bookingForm.controls['From_door_and_address'];
  }
  get to() {
    return this.bookingForm.controls['To_door_and_address'];
  }
  get kilometer() {
    return this.bookingForm.controls['kilometer'];
  }

  

  consult() {
    alert("You will be contacted soon")   
    this.bookingForm.value.reset() ;
  }
  navi() {
    this.router.navigate(["/quote"])
  }


  distance(lat1, lat2, lon1, lon2) {

    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    lon1 = lon1 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;

    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2)
      + Math.cos(lat1) * Math.cos(lat2)
      * Math.pow(Math.sin(dlon / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 3956
    // for miles
    let r = 6371;

    // calculate the result
    return (c * r);
  }

  Fcities() {
    ////console.log(City.getCitiesOfState("IN",this.bookingForm.value.to_State));{}
    this.Fcity = City.getCitiesOfState("IN", this.bookingForm.value.From_state)
    //console.log(this.Fcity)

  }
  Tcities() {
    ////console.log(this.bookingForm.value);
    this.Tcity = City.getCitiesOfState("IN", this.bookingForm.value.To_state)
  }
  Flatlon(e) {
    let x = e.target.value
    //console.log(x);
    this.Flatlong = x.split(",")
    this.Sample_var = this.Flatlong.pop();
  }
  Tlatlon(e) {
    let x = e.target.value
    //console.log(x);
    this.Tlatlong = x.split(",")
    this.Sample_var1 = this.Tlatlong.pop();

  }


  within(x) {

    if (x.target.value == "Within") {
      //console.log(x.target.value);

      this.City_to = false;
      //console.log(this.City_to);
    } else {
      this.City_to = true;

    }
  } 
}