import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workout } from '../workout';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = "http://localhost:8080/stats";
  workouts!: Workout[];

  constructor(private http: HttpClient) {
    this.intializeData();
  }

  private intializeData(): void {
    console.log("LETS GO");
    this.http.get<Workout[]>(this.url).subscribe({
      next: (response) => {
        this.workouts = response;
      },
      error: (error) => {
        console.error('Error fetching athlete stats:', error);
      }
    });
  }

  public getWorkouts(){
    return this.workouts;
  }

  public getLineChartData() {
    let totalDistance = 0; 
    let lineChartData = [
      {
        name: 'Distance',
        series: this.workouts.map(item => {
          totalDistance += item.distance;
          console.log(totalDistance);
          return {
            name: new Date(item.date).toLocaleDateString(), 
            value: totalDistance 
          };
        })        
      }

    ];
    return lineChartData;
  }
  
 

}
