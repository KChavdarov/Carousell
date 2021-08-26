import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../shared/models/Car';
import { CarQuery } from '../shared/models/CarQuery';

@Injectable()
export class CarsService {

  constructor(private http: HttpClient) {}

  createCar(data: FormData) {
    return this.http.post<Car>('/api/cars/create', data);
  }

  getMakes() {
    return this.http.get<string[]>('/api/models/makes');
  }

  getModels(make: string) {
    return this.http.get<{ _id: string, bodyStyles: string[]; }[]>('/api/models/' + make);
  }

  searchCars(query: CarQuery) {
    return this.http.post<{ page: number, perPage: number, count: number, cars: Car[]; }>('/api/cars/search', query);
  }
}
