import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooknowComponent } from './booknow/booknow.component';
import { ContactusComponent } from './contactus/contactus.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ServiceComponent } from './service/service.component';
import { TrackingComponent } from './tracking/tracking.component';
import { WhychooseusComponent } from './whychooseus/whychooseus.component';

const routes: Routes = [
  {
    path : '',
    component : HomeComponent
  },
  {
    path : 'Home',
    component : HomeComponent
  },
  {
    path : 'Service',
    component : ServiceComponent
  },
  {
    path : 'Whychooseus',
    component : WhychooseusComponent
  },
  {
    path : 'Booknow',
    component : BooknowComponent
  },
  {
    path : 'Tracking',
    component : TrackingComponent
  },
  {
    path : 'Contactus',
    component : ContactusComponent
  },
  {
    path : 'Profile',
    component : ProfileComponent
  },
  {
    path : 'Login',
    component : LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
