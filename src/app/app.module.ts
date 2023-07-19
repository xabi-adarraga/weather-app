import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CityListComponent } from './city-list/city-list.component';
import { CityWeatherComponent } from './city-weather/city-weather.component';
import { WeatherServiceMock } from './weather.service.mock';
import { CitiesServiceMock } from './cities.service.mock';

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    CityWeatherComponent,
    CityListComponent
  ], 
  providers: [WeatherServiceMock, CitiesServiceMock],
  bootstrap: [AppComponent]
})
export class AppModule { }
