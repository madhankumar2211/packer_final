import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  projectCount =0;
  projectCountStop =setInterval(()=>{
    this.projectCount++;
    if(this.projectCount == 345){
      clearInterval(this.projectCountStop)
    }
  },5)
  
  workingHoursCount =0;
  workingHoursCountStop =setInterval(()=>{
    this.workingHoursCount++;
    if(this.workingHoursCount == 724){
      clearInterval(this.workingHoursCountStop)
    }
  },5)

  awardsCount =0;
  awardsCountStop =setInterval(()=>{
    this.awardsCount++;
    if(this.awardsCount == 123){
      clearInterval(this.awardsCountStop)
    }
  },10)

  happyClientCount =0;
  happyClientCountStop =setInterval(()=>{
    this.happyClientCount++;
    if(this.happyClientCount == 231){
      clearInterval(this.happyClientCountStop)
    }
  },10)
 
  constructor() {
    
   }
     
  ngOnInit(): void {
    
  }
  
}
