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
    let paceDistance = -20;
    let lineChartData = [
      {
        name: 'Distance',
        series: this.workouts.map(item => {

          return {
            name: item.startDate,
            value: item.weekDistance 
          };
        })        
      },
      {
        name: 'Pace',
        series: this.workouts.map(item => {
          paceDistance += 20;
          return {
            name: item.startDate,
            value: paceDistance 
          };
        })        
      }

    ];
    return lineChartData;
  }

  public getBarChartData()  {
    return this.workouts.map(item => ({
      name: item.startDate, 
      value: item.weekDistance
  }));
  }
  
 

}
