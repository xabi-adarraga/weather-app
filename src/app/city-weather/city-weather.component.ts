import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery';
import { WeatherService } from '../weather.service';
import { CitiesService } from '../cities.service';
import { defaultIfEmpty, tap } from 'rxjs/operators';

@Component({
  selector: 'app-city-weather',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.css']
})
export class CityWeatherComponent {

  selectedCities: any[] = [];
  
  daysOfWeek = [
    "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"
  ];

  localData = this.weatherService.defaultWeatherData;
  lastUpdate: Date | null = null;
  now = new Date();

  weather: any;
  activeCityTab: string = '';

  constructor(private weatherService: WeatherService, private citiesService: CitiesService) { }


  ngOnInit() {
    this.citiesService.selectedCities$
    .subscribe((data) => {
      console.log(data);
      this.selectedCities = data;
      this.updateWeather();
    });

    // Suscribirse a cambios en los datos locales del tiempo desde el servicio WeatherService
    this.weatherService.localData$
    .subscribe((data) => {
      console.log(data);
      if(Object.keys(data).length){
        this.localData = data;
      }else{
        this.localData = this.weatherService.defaultWeatherData;
      }

      // Actualizar la variable 'lastUpdate' con la fecha de la última actualización
      if(this.localData.data){
        this.lastUpdate = new Date(this.localData.data.lastUpdate);
      }

      this.updateWeather();

    });

  }

  // Establecer la pestaña activa y mostrar el contenido correspondiente
  setActiveCityTab(tab: string) {
    console.log(tab);
    this.activeCityTab = tab;
    $('.weather-nav.nav .btn').removeClass('active').attr('aria-selected', 'false');
    $('.weather-tab-content.tab-content .tab-pane').hide();

    $('.weather-nav.nav #'+tab+'-button').addClass('active').attr('aria-selected', 'true');
    $('#'+tab).show();
  }

  // Obtener datos meteorológicos de una ciudad específica y guardar los datos en localStorage
  getWeather(query: string) {
    this.weatherService.getCityWeather(query).subscribe((response: any) => {
      if(this.now === null){
        this.now = new Date();
      }
      this.lastUpdate = this.now;
      const data = {
        lastUpdate: this.now
      };
      
      this.localData.data = data;
      this.weather = response;

      // Guardar los datos meteorológicos obtenidos localmente y asociarlos con la ciudad correspondiente
      if(this.weather){
        this.localData[query] = this.weather;
        this.weatherService.saveData(query, this.weather, this.localData);
        console.log(this.weather);
      }else{
        this.weatherService.saveData(query, this.weatherService.defaultWeatherData[query], this.localData);
      }

      // Si no hay una pestaña activa, establecer la primera ciudad seleccionada como activa
      if(!this.activeCityTab){
        this.setActiveCityTab(this.selectedCities[0].replaceAll(' ', '').replaceAll(',', ''));
      }
    });
  }

  updateWeather(){

    // Actualizar la lista de ciudades seleccionadas
    const index = this.selectedCities.indexOf('data');
    if (index > -1) { 
      this.selectedCities.splice(index, 1);
    }

    // Verificar si ha pasado suficiente tiempo desde la última actualización para realizar una nueva solicitud
    this.now = new Date(); 
    if (!this.lastUpdate || this.now.getTime() - this.lastUpdate.getTime() >= 1000) {
      // Realizar una solicitud de datos meteorológicos para cada ciudad seleccionada
      this.selectedCities.forEach(key => {
          console.log('weather service');
          this.lastUpdate = this.now;
          this.getWeather(key); 
        
      });
    }else{
      // Si ha pasado menos de un segundo desde la última actualización, esperar un momento y desencadenar un evento click para visualizar los datos locales
      setTimeout(() => {
        if($('.weather-nav.nav .btn').is(':visible')){
          $('.weather-nav.nav .btn')[0].click();
        }
      }, 100);
      console.log('--- demasiadas peticiones ---');
    }
  }

  // Convertir la temperatura de Kelvin a Celsius
  kelvinToCelsius(temperature: number): number {
    return Math.round(temperature - 273);
  }

  // Obtener la temperatura máxima y mínima de un día específico para una ciudad específica
  getMinMaxTemperatureForDay(targetCity: string, targetDay: string){
    const weatherArray = this.localData[targetCity].list;
    let tempMax = 0;
    let tempMin = 1000;
    for (const item of weatherArray) {
      if(item.dt_txt.split(' ')[0] == targetDay.split(' ')[0]){
        if (item.main.temp_max > tempMax) {
          tempMax = item.main.temp_max;
        }
        if (item.main.temp_min < tempMin) {
          tempMin = item.main.temp_min;
        }
      }
    }
    return {max: tempMax, min: tempMin}

  }

  // Formatear fecha y hora para facilitar la lectura
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  // Obtener el día de la semana en castellano de una fecha concreta
  weekDay(day: string){
    const date = new Date(day);
    return this.daysOfWeek[date.getDay()];
  }

  // Manejar el evento de teclado en el componente
  @HostListener('document:keydown', ['$event'])
  handleKeyPress(event: KeyboardEvent) {
    // Verificar si la tecla presionada es "Enter" (código 13)
    if (event.key === 'Enter' && document.activeElement) {
      // Obtener el elemento enfocado
      const focusedElement = $(document.activeElement).attr('id');

      // Verificar si el elemento es uno de los botones del main-nav
      if (focusedElement && $('.weather-nav').find('#'+focusedElement).length != 0) {
        
        // Ejecutar la función para cambiar de pestaña
          this.setActiveCityTab(focusedElement.split('-')[0]);
      }
    }
  }

}
