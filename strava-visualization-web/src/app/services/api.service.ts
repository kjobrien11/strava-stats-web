import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workout } from '../workout';
import { WeeklyTotal } from '../weekly-total';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = "http://localhost:8080/weekly-totals";
  workouts!: WeeklyTotal[];

  constructor(private http: HttpClient) {
    this.intializeData();
  }

  private intializeData(): void {
    this.http.get<WeeklyTotal[]>(this.url).subscribe({
      next: (response) => {
        this.workouts = response;
        console.log(this.workouts);
      },
      error: (error) => {
        console.error('Error fetching athlete stats:', error);
      }
    });
  }

  public getWorkouts(){
    return this.workouts;
  }

  public getLineChartData()  {
    let totalDistance = 0; 
    let paceDistance = -20;
    let lineChartData = [
      {
        name: 'Distance',
        series: this.workouts.map(item => {
          totalDistance += item.weekDistance;

          return {
            name: item.startDate,
            value: totalDistance 
          };
        })        
      },
      {
        name: 'Distance',
        series: this.workouts.map(item => {
          paceDistance += 20;
          return {
            // name: new Date(item.date).toLocaleDateString(), 
            name: item.startDate,
            value: paceDistance 
          };
        })        
      }

    ];
    return lineChartData;
  }
  
 

}
