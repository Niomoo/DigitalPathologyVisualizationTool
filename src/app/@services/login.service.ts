import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../@models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = 'http://140.116.247.175:8000/api/';
  constructor(private http: HttpClient) { }

  login(value: Login) {
    return this.http.post(this.url + '/login', value);
  }
}
