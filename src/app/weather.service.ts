import { Injectable, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { AppComponent } from './app.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  // Clave de API para el servicio de OpenWeatherMap
  private apiKeyOpenweathermap = '93478ba5540690546f753ebbbc72fd3e';
  private storageKey = 'weatherData';

  @Input() defaultWeatherData: any= { 
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


  constructor(private http: HttpClient/*, private appComponent: AppComponent*/) { } 


  private localDataSubject: BehaviorSubject<{}> = new BehaviorSubject<{}>([]);
  public localData$ = this.localDataSubject.asObservable();
  // Actualizar los datos meteorológicos locales
  setLocalData(data: any) {
     this.localDataSubject.next(data);
  }

  // Obtener los datos meteorológicos de una ciudad específica
  getCityWeather(query: string) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(query)}&type=like&sort=population&cnt=30&appid=${this.apiKeyOpenweathermap}`;

    return this.http.get(url);
  }

  // Guardar en localStorage
  saveData(city: string, data: any, localData: any): void {
    localData[city] = data;
    localStorage.setItem(this.storageKey, JSON.stringify(localData));
  }
}
