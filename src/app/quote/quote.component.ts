import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import { Country, State, City } from 'country-state-city';
import { UsersService } from '../services/users.service';





@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {

  constructor(public qf: FormBuilder,public rs: UsersService) { }


  quoteForm:any;    
  submitted: boolean = false; 
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
  
  
  

  ngOnInit(): void {
    
    console.log(Country.getAllCountries())
    console.log(State.getStatesOfCountry("IN"))
    this.countries = State.getStatesOfCountry("IN")




    this.Products = ['Apartment', 'Office', 'Furniture', 'Fragile products', 'Goods', 'Others']


      this.rs.vehicle().subscribe((data) => {
      this.vechile = data
    
      })

      this.quoteForm=this.qf.group({
        Cus_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
        Cus_number: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[6-9]{1}?[0-9]{9}$")]],
        Package_weight: ['', [Validators.required, Validators.pattern("^$|^([0-9]|[0-9][0-9]|[0-9][0-9][0-9])?")]],
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
        Call_status:1
    })
  }



  onSubmit() {
    this.submitted = true

    if (this.City_to == false) {


      this.quoteForm.value.kilometer = this.distance(this.Flatlong[0], this.Flatlong[0], this.Flatlong[1], this.Flatlong[1]).toFixed(1);

      this.quoteForm.value.kilometer = parseInt(this.quoteForm.value.kilometer)      

      this.quoteForm.value.From_city = this.Sample_var      

      this.quoteForm.value.To_state = this.quoteForm.value.From_state
      this.quoteForm.value.To_city = this.quoteForm.value.From_city  


      if (this.quoteForm.status === 'VALID') {
        for (let index in this.vechile) {

          if (this.quoteForm.value.Vehicle_type == this.vechile[index].vechile_name) {

            if (this.quoteForm.value.kilometer <= 50) {

              this.quoteForm.value.Price = this.vechile[index].base_price           

            }          
          }
        };

        this.rs.addquote(this.quoteForm.value).subscribe((data: any) => {
          console.log(data);
          this.record = data;
        });
        window.location.href="http://online.pubhtml5.com/orut/egyb/#p=1"
      }
    }

    else {

      this.quoteForm.value.kilometer = this.distance(this.Flatlong[0], this.Tlatlong[0], this.Flatlong[1], this.Tlatlong[1]).toFixed(1);
      this.quoteForm.value.kilometer = parseInt(this.quoteForm.value.kilometer)
      
      this.quoteForm.value.From_city = this.Sample_var;
      this.quoteForm.value.To_city = this.Sample_var1;



      if (this.quoteForm.status === 'VALID') {

        for (let index in this.vechile) {

          if (this.quoteForm.value.Vehicle_type == this.vechile[index].vechile_name) {            


            this.quoteForm.value.Price = (this.vechile[index].add_price * this.quoteForm.value.kilometer)
            this.quoteForm.value.Price = (this.quoteForm.value.Price - this.vechile[index].base_price)           

          }
        }
      };
      this.rs.addquote(this.quoteForm.value).subscribe((data: any) => {
        console.log(data);
        this.record = data;
      });
      window.location.href="http://online.pubhtml5.com/orut/egyb/#p=1"
    }
  }



    
  
  get name() {
    return this.quoteForm.controls['Cus_name'];
  }
  get num() {
    return this.quoteForm.controls['Cus_number'];
  }
  get weight() {
    return this.quoteForm.controls['Package_weight'];
  }
  get from() {
    return this.quoteForm.controls['From_door_and_address'];
  }
  get to() {
    return this.quoteForm.controls['To_door_and_address'];
  }
  get kilometer() {
    return this.quoteForm.controls['kilometer'];
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
    //console.log(City.getCitiesOfState("IN",this.bookingForm.value.to_State));{}
    this.Fcity = City.getCitiesOfState("IN", this.quoteForm.value.From_state)
    console.log(this.Fcity)

  }
  Tcities() {
    //console.log(this.bookingForm.value);
    this.Tcity = City.getCitiesOfState("IN", this.quoteForm.value.To_state)
  }
  Flatlon(e) {
    let x = e.target.value
    console.log(x);
    this.Flatlong = x.split(",")
    this.Sample_var = this.Flatlong.pop();
  }
  Tlatlon(e) {
    let x = e.target.value
    console.log(x);
    this.Tlatlong = x.split(",")
    this.Sample_var1 = this.Tlatlong.pop();

  }


  within(x) {

    if (x.target.value == "Within") {
      console.log(x.target.value);

      this.City_to = false;
      console.log(this.City_to);
    } else {
      this.City_to = true;

    }
  }


  

}