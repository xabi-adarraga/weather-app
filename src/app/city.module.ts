import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CityListComponent } from './city-list.component';
import { CityWeatherComponent } from './city-weather.component';

@NgModule({
  declarations: [CityListComponent, CityWeatherComponent],
  imports: [CommonModule, FormsModule],
  exports: [CityListComponent, CityWeatherComponent]
})
export class CityModule { }