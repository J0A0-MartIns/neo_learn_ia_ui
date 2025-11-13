import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

export interface UserProfile {
  id: number;
  userEmail: string;
  userFirstName: string;
  telefone: string;
  cargo: string;
  instituicao: string;
}

export interface UpdateUserProfile {
  userFirstName: string;
  telefone: string;
  cargo: string;
  instituicao: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials);
  }

  register(userData: RegisterRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/users`, userData);
  }

  getProfile(): Observable<UserProfile> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token || ''}`);
    return this.http.get<UserProfile>(`${this.apiUrl}/users/me`, { headers });
  }

  updateProfile(data: UpdateUserProfile): Observable<void> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token || ''}`);
    return this.http.put<void>(`${this.apiUrl}/users/me`, data, { headers });
  }

  private getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('auth_token');
    }
    return null;
  }
}