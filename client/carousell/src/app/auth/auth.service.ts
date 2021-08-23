import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../shared/models/User';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {}

  register(data: User) {
    return this.http.post('/api/user/register', data);
  }

  login(data: { email: string, password: string; }) {
    return this.http.post('/api/user/login', data);
  };

}
