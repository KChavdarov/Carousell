import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../shared/models/Car';

@Injectable()
export class CarsService {

  constructor(private http: HttpClient) {}

  createCar(data: FormData) {
    return this.http.post<Car>('/api/cars/create', data);
  }
}
