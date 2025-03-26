import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workout } from '../workout';
import { WeeklyTotal } from '../weekly-total';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  weeklyUrl: string = "http://localhost:8080/weekly-totals";
  cumulativeUrl: string = "http://localhost:8080/cumulative-totals";
  weeklyWorkoutData!: WeeklyTotal[];
  cumulativeWorkoutData!: WeeklyTotal[];

  constructor(private http: HttpClient) {
    this.intializeData();
  }

  private intializeData(): void {
    this.http.get<WeeklyTotal[]>(this.weeklyUrl).subscribe({
      next: (response) => {
        this.weeklyWorkoutData = response;
      },
      error: (error) => {
        console.error('Error fetching athlete stats:', error);
      }
    });
    this.http.get<WeeklyTotal[]>(this.cumulativeUrl).subscribe({
      next: (response) => {
        this.cumulativeWorkoutData = response;
      },
      error: (error) => {
        console.error('Error fetching athlete stats:', error);
      }
    });
  }

  public getWorkouts(){
    return this.weeklyWorkoutData;
  }

  public getLineChartData()  {
    let paceDistance = -20;
    let lineChartData = [
      {
        name: 'Distance',
        series: this.cumulativeWorkoutData.map(item => {

          return {
            name: item.startDate,
            value: item.weekDistance 
          };
        })        
      },
      {
        name: 'Pace',
        series: this.cumulativeWorkoutData.map(item => {
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
    return this.weeklyWorkoutData.map(item => ({
      name: String(item.startDate), 
      value: item.weekDistance
      }));
    }

  public getCustomColors(){
    return this.weeklyWorkoutData.map(item => ({
      name: String(item.startDate),
      value:"#A9CAB0"
      }));
    }
  
 

}
