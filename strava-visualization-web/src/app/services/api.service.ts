import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}
  url: string = "http://localhost:8080/stats"

  getAthleteStats() {
    this.http.get<any>(this.url).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error('Error fetching athlete stats:', error);
      }
    });
  }
}
