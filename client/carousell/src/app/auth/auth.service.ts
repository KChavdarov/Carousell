import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../shared/models/User';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {}

  register(data: User) {
    return this.http.post<User>('/api/user/register', data);
  }

  login(data: { email: string, password: string; }) {
    return this.http.post<User>('/api/user/login', data);
  };

  verifyAuth() {
    return this.http.get<User>('/api/user/verify');
  }

  logout() {
    return this.http.get<User>('/api/user/logout');
  }

  likeCar(carId: string) {
    return this.http.get<User>('/api/user/bookmark/' + carId);
  }
  
  unlikeCar(carId: string) {
    return this.http.delete<User>('/api/user/bookmark/' + carId);
  }

}
