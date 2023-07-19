import { Injectable } from '@angular/core';
import { of, BehaviorSubject } from 'rxjs';

@Injectable()
export class WeatherServiceMock {

  // Mock de los datos
  private mockWeatherData = {
    "cod": "200",
    "message": 0,
    "cnt": 30,
    "list": [
        {
            "dt": 1689768000,
            "main": {
                "temp": 296.3,
                "feels_like": 296.37,
                "temp_min": 293.61,
                "temp_max": 296.3,
                "pressure": 1022,
                "sea_level": 1022,
                "grnd_level": 1020,
                "humidity": 65,
                "temp_kf": 2.69
            },
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                }
            ],
            "clouds": {
                "all": 75
            },
            "wind": {
                "speed": 1.64,
                "deg": 5,
                "gust": 2.14
            },
            "visibility": 10000,
            "pop": 0.33,
            "rain": {
                "3h": 0.28
            },
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2023-07-19 12:00:00"
        },
        {
            "dt": 1689778800,
            "main": {
                "temp": 296.34,
                "feels_like": 296.44,
                "temp_min": 296.34,
                "temp_max": 296.42,
                "pressure": 1021,
                "sea_level": 1021,
                "grnd_level": 1018,
                "humidity": 66,
                "temp_kf": -0.08
            },
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "clouds": {
                "all": 80
            },
            "wind": {
                "speed": 2.62,
                "deg": 20,
                "gust": 2.76
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2023-07-19 15:00:00"
        }
    ]
  };


  private localDataSubject: BehaviorSubject<{}> = new BehaviorSubject<{}>([]);
  public localData$ = this.localDataSubject.asObservable();

  // Mock del método getCityWeather para devolver los datos simulados
  getCityWeather(query: string) {
    return of(this.mockWeatherData);
  }

   setLocalData(data: any) {
     
  }

}