import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workout } from '../workout';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}
  url: string = "http://localhost:8080/stats"

  getAthleteStats() {
    this.http.get<Workout[]>(this.url).subscribe({
      next: (response) => {
        console.log(response);
        console.log(response[0].distance);
      },
      error: (error) => {
        console.error('Error fetching athlete stats:', error);
      }
    });
  }
}
