import { Injectable } from '@angular/core';
import { of, BehaviorSubject } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Injectable()
export class CitiesServiceMock {

  // Mock de los datos 
  private mockCitiesData = {
    "totalResultsCount": 1,
    "geonames": [
        {
            "adminCode1": "59",
            "lng": "-1.97499",
            "geonameId": 3110044,
            "toponymName": "Donostia / San Sebastián",
            "countryId": "2510769",
            "fcl": "P",
            "population": 185357,
            "countryCode": "ES",
            "name": "San Sebastián",
            "fclName": "city, village,...",
            "adminCodes1": {
                "ISO3166_2": "PV"
            },
            "countryName": "España",
            "fcodeName": "seat of a second-order administrative division",
            "adminName1": "País Vasco",
            "lat": "43.31283",
            "fcode": "PPLA2"
        }
    ]
}

  private selectedCitiesSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  selectedCities$ = this.selectedCitiesSubject.asObservable();
  // Mock del método getCityWeather para devolver los datos simulados
  getCities(query: string) {
    return of(this.mockCitiesData);
  }

  // Mock del método getSelectedCity
  getSelectedCity(){
    return "San Sebastián, ES";
  }

  setSelectedCities(cities: string[]): void {
    
  }

}