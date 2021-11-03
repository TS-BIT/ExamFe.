import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './components/app/app.component';
import { CarsComponent } from './components/cars/cars.component';
import { HeaderComponent } from './components/header/header.component';
import { TrucksComponent } from './components/trucks/trucks.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    CarsComponent,
    HeaderComponent,
    TrucksComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'cars', component: CarsComponent },
      { path: 'trucks', component: TrucksComponent },
      { path: '', component: HomeComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
