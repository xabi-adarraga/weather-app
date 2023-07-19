import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';


import { CityListComponent } from './city-list/city-list.component';
import { CityWeatherComponent } from './city-weather/city-weather.component';
import { WeatherServiceMock } from './weather.service.mock';
import { CitiesServiceMock } from './cities.service.mock';
import { CitiesService } from './cities.service'; 
import { WeatherService } from './weather.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let citiesServiceMock: CitiesServiceMock;
  let weatherServiceMock: WeatherServiceMock;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    citiesServiceMock = new CitiesServiceMock(); 
    weatherServiceMock = new WeatherServiceMock(); 

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [AppComponent, CityListComponent, CityWeatherComponent],
      providers: [
        { provide: CitiesService, useValue: citiesServiceMock },
        { provide: WeatherService, useValue: weatherServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'weather-app'`, () => {
    expect(component.title).toEqual('weather-app');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('weather-app');
  });
});