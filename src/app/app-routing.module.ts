import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooknowComponent } from './booknow/booknow.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ForgotComponent } from './forgot/forgot.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PaymentComponent } from './payment/payment.component';
import { ProfileComponent } from './profile/profile.component';
import { QuoteComponent } from './quote/quote.component';
import { RegisterComponent } from './register/register.component';
import { ServiceComponent } from './service/service.component';
import { TrackingComponent } from './tracking/tracking.component';
import { UpdateprofieComponent } from './updateprofie/updateprofie.component';
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
  {
    path : 'Forgot',
    component : ForgotComponent
  },
  {
    path : 'Register',
    component : RegisterComponent
  },
  {
    path : 'Payment',
    component : PaymentComponent
  },
  
  {
    path : 'Quote',
    component : QuoteComponent
  },
  {
    path : 'Update',
    component : UpdateprofieComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
