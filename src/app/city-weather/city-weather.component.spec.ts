import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherServiceMock } from '../weather.service.mock';
import { CityWeatherComponent } from './city-weather.component';

describe('CityWeatherComponent', () => {
  let component: CityWeatherComponent;
  let fixture: ComponentFixture<CityWeatherComponent>;
  let weatherServiceMock: WeatherServiceMock;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CityWeatherComponent],
      providers: [WeatherServiceMock]
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(CityWeatherComponent);
    component = fixture.componentInstance;
    weatherServiceMock = TestBed.inject(WeatherServiceMock); 
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
