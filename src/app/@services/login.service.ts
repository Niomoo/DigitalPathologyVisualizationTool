import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginPost, RegisterPost } from '../@models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // private url = 'http://localhost:8000/';
  private url = 'http://140.116.247.180:8081/';
  constructor(private http: HttpClient) { }

  accountLogin(value: LoginPost) {
    return this.http.post(this.url + 'user/login', value);
  }

  accountRegister(value: RegisterPost) {
    return this.http.post(this.url + 'user/', value);
  }
}
