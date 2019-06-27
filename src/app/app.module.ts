import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction'; 

import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { Auth2Guard } from './auth2.guard';
import { Auth3Guard } from './auth3.guard';

import { AppComponent } from './app.component';
import { NavbarComponent } from './client/navbar/navbar.component';
import { HomeComponent } from './client/home/home.component';
import { AboutComponent } from './client/about/about.component';
import { ServicesComponent } from './client/services/services.component';
import { WhyBrngiComponent } from './client/why-brngi/why-brngi.component';
import { FooterComponent } from './client/footer/footer.component';
import { LoginComponent } from './client/login/login.component';
import { SignUpComponent } from './client/sign-up/sign-up.component';
import { ClientHomeComponent } from './client/client-home/client-home.component';
import { FreelancerHomeComponent } from './freelancer/freelancer-home/freelancer-home.component';
import { AvailableFreelancersComponent } from './client/available-freelancers/available-freelancers.component';
import { ClientProfileComponent } from './client/client-profile/client-profile.component';
import { ClientRequestsComponent } from './client/client-requests/client-requests.component';
import { FreelancerSignUpComponent } from './freelancer/freelancer-sign-up/freelancer-sign-up.component';
import { FreelancerProfileComponent } from './freelancer/freelancer-profile/freelancer-profile.component';
import { NavigationComponent } from './freelancer/navigation/navigation.component';
import { PortfolioComponent } from './freelancer/portfolio/portfolio.component';
import { ViewFreelancerComponent } from './client/view-freelancer/view-freelancer.component';
import { ViewClientComponent } from './freelancer/view-client/view-client.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminNavbarComponent } from './admin/admin-navbar/admin-navbar.component';
import { AdminServicesComponent } from './admin/admin-services/admin-services.component';
import { AdminRegionsComponent } from './admin/admin-regions/admin-regions.component';
import { AdminFreelancersComponent } from './admin/admin-freelancers/admin-freelancers.component';


const appRoutes:Routes = [
  { path:'', redirectTo:'home', pathMatch:'full' },
  { path:'home', component:HomeComponent },
  { path:'login', component:LoginComponent },
  { path:'register', component:SignUpComponent },
  { path:'client-home', component:ClientHomeComponent, canActivate: [AuthGuard] },
  { path:'freelancer-home', component:FreelancerHomeComponent, canActivate: [Auth2Guard] },
  { path:'available-freelancers', component:AvailableFreelancersComponent, canActivate: [AuthGuard] },
  { path:'client-profile', component:ClientProfileComponent, canActivate: [AuthGuard] },
  { path:'client-requests', component:ClientRequestsComponent, canActivate: [AuthGuard] },
  { path:'freelancer-register', component:FreelancerSignUpComponent },
  { path:'freelancer-profile', component:FreelancerProfileComponent, canActivate: [Auth2Guard] },
  { path:'freelancer-navigation', component:NavigationComponent, canActivate: [Auth2Guard] },
  { path:'portfolio', component:PortfolioComponent, canActivate: [Auth2Guard] },
  { path:'view-freelancer', component:ViewFreelancerComponent, canActivate: [AuthGuard] },
  { path:'view-client', component:ViewClientComponent, canActivate: [Auth2Guard] },
  { path:'admin', component:AdminLoginComponent },
  { path:'admin-home', component:AdminHomeComponent, canActivate: [Auth3Guard] },
  { path:'admin-services', component:AdminServicesComponent, canActivate: [Auth3Guard] },
  { path:'admin-regions', component:AdminRegionsComponent, canActivate: [Auth3Guard] },
  { path:'admin-freelancers', component:AdminFreelancersComponent, canActivate: [Auth3Guard] },
  
  //{ path:'homeAdmin', component:AdminHomeComponent, canActivate: [AuthAdminGuard] },
];




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    ServicesComponent,
    WhyBrngiComponent,
    FooterComponent,
    LoginComponent,
    SignUpComponent,
    ClientHomeComponent,
    FreelancerHomeComponent,
    AvailableFreelancersComponent,
    ClientProfileComponent,
    ClientRequestsComponent,
    FreelancerSignUpComponent,
    FreelancerProfileComponent,
    NavigationComponent,
    PortfolioComponent,
    ViewFreelancerComponent,
    ViewClientComponent,
    AdminLoginComponent,
    AdminHomeComponent,
    AdminNavbarComponent,
    AdminServicesComponent,
    AdminRegionsComponent,
    AdminFreelancersComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCAXPIRz2Et99gYUpn-aOTm2ze2BqnR9Bk',
      libraries: ['places']
    }),
    AgmDirectionModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
