import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginRequest {
  userEmail: string;
  password?: string;
}

interface LoginResponse {
  acessToken: string;
  expiresIn: number;
}

interface RegisterRequest {
  userFirstName: string;
  userEmail: string;
  password?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials);
  }

  register(userData: RegisterRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/users`, userData);
  }
}