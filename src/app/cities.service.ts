import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  // Clave de API para el servicio de Geonames
  private apiKeyGeonames = 'WeatherAppAD';

  // BehaviorSubject que emite la lista de ciudades seleccionadas
  private selectedCitiesSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  selectedCity: string = '';
  selectedCities$ = this.selectedCitiesSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Obtener una lista de ciudades desde el servicio Geonames
  getCities(query: string){
    const url = `http://api.geonames.org/searchJSON?name=${encodeURIComponent(query)}&countryBias=ESP&featureClass=P&maxRows=20&lang=es&orderby=population&username=${this.apiKeyGeonames}`;
    this.selectedCity = query;
    return this.http.get(url);

  }

  // Obtener la ciudad seleccionada actualmente
  getSelectedCity(){
    return this.selectedCity;
  }

  // Actualizar la lista de ciudades seleccionadas y notificar a los observadores
  setSelectedCities(cities: string[]): void {
    this.selectedCitiesSubject.next(cities);
  }
}
