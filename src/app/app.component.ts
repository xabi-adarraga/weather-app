import { Component, OnInit, HostListener, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { CitiesService } from './cities.service';
import { BehaviorSubject } from 'rxjs';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weather-app';

  // Clave para localStorage
  private storageKey = 'weatherData';

  localData: { [key: string]: {} } = {};

  @Output() selectedCities: any[] = [];

  // Valor por para inicialización
  @Output() defaultWeatherData: any = { 
    'data': {
      lastUpdate: null
    },
    'Madrid, ES' : {
      list:[
        {
           dt_txt: "2023-01-01 12:00:00",
           main: {
            temp: 293,
            temp_max: 298,
            temp_min: 288,
            humidity: 20
          },
          weather: [
            {
              icon: '01d'
            }
          ]
        }
      ]
    } 
  };

  activeTab: string = 'cityWeather';

  constructor(private citiesService: CitiesService, private weatherService: WeatherService) { }

  ngOnInit() {
    // Cargar datos desde el almacenamiento local al componente
    this.localData = this.getData();


    if(this.localData){
      // Obtener las ciudades seleccionadas y eliminar el elemento 'data'
      this.selectedCities = Object.keys(this.localData);
      const index = this.selectedCities.indexOf('data');
      if (index > -1) { 
        this.selectedCities.splice(index, 1);
      }

      // Enviar las ciudades seleccionadas al servicio CitiesService
      this.citiesService.setSelectedCities(this.selectedCities);

      // Enviar los datos locales al servicio WeatherService
      this.updateLocalData(this.localData);
    console.log(this.localData);

    }
    
      
  }

  onSaveDataEvent(eventData: any) {
    // Lógica para responder al evento del AppComponent
    console.log('save data event');
    this.saveData(eventData.city, eventData.weather);
  };

  // Establecer la pestaña activa del navegador principal
  setActiveTab(tab: string) {
    this.activeTab = tab;
    // Mostrar el contenido de la pestaña activa y ocultar el resto
    $('.main-content.tab-content .tab-pane').hide();
    $('.main-nav .nav-item .btn').attr('aria-selected', 'false');
    $('#'+tab).show();
    $('#'+tab+'-button').attr('aria-selected', 'true');

    // Simular un clic en el primer botón de la barra de navegación del tiempo (si es visible)
    if($('.weather-nav.nav .btn.active').is(':visible')){
      $('.weather-nav.nav .btn.active')[0].click();
    }else if($('.weather-nav.nav .btn').is(':visible')){
      $('.weather-nav.nav .btn')[0].click();
    }
  }

  // Guardar datos en el almacenamiento local
  saveData(city: string, data: any): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.localData));
  }

  // Obtener datos del almacenamiento local
  getData(): any {
    const data = localStorage.getItem(this.storageKey);
    if(data && data != 'undefined'){
      return JSON.parse(data);
    }else{
      return this.defaultWeatherData;
    }
    
  }

  updateLocalData(data: any) {
    this.localData = data;
    this.weatherService.setLocalData(data);
  }

  // Manejar el evento de teclado en la página
  @HostListener('document:keydown', ['$event'])
  handleKeyPress(event: KeyboardEvent) {
    // Verificar si la tecla presionada es "Enter" (código 13)
    if (event.key === 'Enter' && document.activeElement) {
      // Obtener el elemento enfocado
      const focusedElement = $(document.activeElement).attr('id');
      
      // Verificar si el elemento es uno de los botones del main-nav
      if (focusedElement == 'cityList-button' || focusedElement == 'cityWeather-button') {
        // Ejecutar la función para cambiar de pestaña
          this.setActiveTab(focusedElement.split('-')[0]);
      }
    }
  }
}
