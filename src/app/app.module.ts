import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ServiceComponent } from './service/service.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { WhychooseusComponent } from './whychooseus/whychooseus.component';
import { BooknowComponent } from './booknow/booknow.component';
import { TrackingComponent } from './tracking/tracking.component';
import { ContactusComponent } from './contactus/contactus.component';
import { LoginComponent } from './login/login.component';
import { SliderComponent } from './slider/slider.component';
import { ForgotComponent } from './forgot/forgot.component';
import { RegisterComponent } from './register/register.component';
import { PaymentComponent } from './payment/payment.component';
import { QuoteComponent } from './quote/quote.component';
import { UpdateprofieComponent } from './updateprofie/updateprofie.component';
import { HeadComponent } from './head/head.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { HeadingComponent } from './heading/heading.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ServiceComponent,
    MainComponent,
    ProfileComponent,
    HomeComponent,
    WhychooseusComponent,
    BooknowComponent,
    TrackingComponent,
    ContactusComponent,
    LoginComponent,
    SliderComponent,
    ForgotComponent,
    RegisterComponent,
    PaymentComponent,
    QuoteComponent,
    UpdateprofieComponent,
    HeadComponent,
    HeadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      
      
    ])
    ],
  providers: [{provide:HTTP_INTERCEPTORS ,useClass:AuthInterceptorService,multi :true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
