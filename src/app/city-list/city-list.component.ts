import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CitiesService } from '../cities.service';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})

export class CityListComponent {
  @Input() selectedCities: any[] = [];
  
  cities: any[] = [];
  newCity: string = '';
  searchCity: string = '';
  isCitiesEmpty: boolean = true;
  localData: { [key: string]: {} } = {};

  constructor(private citiesService: CitiesService, private weatherService: WeatherService) { }

  ngOnInit() {
    // Suscribirse a cambios en la lista de ciudades seleccionadas desde el servicio CitiesService
    this.citiesService.selectedCities$.subscribe(cities => {
      this.selectedCities = cities;
    });

    // Suscribirse a cambios en los datos locales del tiempo desde el servicio WeatherService
    this.weatherService.localData$.subscribe((data: {}) => {
      this.localData = data;
    });

  }

  // Obtener la lista de ciudades desde el servicio Geonames
  getCityList() {
    this.isCitiesEmpty = true;
    this.citiesService.getCities(this.searchCity).subscribe((response: any) => {
  
      this.cities = response.geonames;

      // Actualizar la bandera en función de si el array de ciudades está vacío o no
      this.isCitiesEmpty = this.cities.length === 0;
    });
  }


  // Añadir una nueva ciudad a la lista de ciudades seleccionadas
  addCity() {
    if (this.newCity && !this.selectedCities.includes(this.newCity) && this.selectedCities.length < 3) {
      this.selectedCities.push(this.newCity);

      // Verificar si localData tiene valor y añadir un objeto vacío para la nueva ciudad
      if(this.localData){
        this.localData[this.newCity] = {};
      }

      this.citiesService.setSelectedCities(this.selectedCities);

      
    }
  }

  // Eliminar una ciudad de la lista de ciudades seleccionadas
  removeCity(city: string) {
    const index = this.selectedCities.indexOf(city);
    if (index !== -1) {
      this.selectedCities.splice(index, 1);
      delete this.localData[city];

      this.citiesService.setSelectedCities(this.selectedCities);
      // Guardar los datos locales actualizados en el servicio WeatherService
      // this.weatherService.setLocalData(this.localData);
    }
  }

  // Borrar datos del almacenamiento local
  clearData(): void {
    // Lanzar un confirm para asegurar que no se haya pulsado sin querer
    if (confirm('¿Seguro que quiere borrar los datos locales?\nSe establecerá "Madrid, ES" como ciudad por defecto y se recargará la página.') == true) {
      // Borrar datos de localStorage
      localStorage.removeItem('weatherData');
      this.localData = {
        'data': {
          lastUpdate: null
        }
      }
      // Recargar la página sin datos locales
      location.reload();
    }
  }
}
