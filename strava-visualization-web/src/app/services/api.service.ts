import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workout } from '../workout';
import { WeeklyTotal } from '../weekly-total';
import { QuickData } from '../quick-data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl: string = "http://localhost:8080";
  weeklyUrl: string = "/weekly-totals";
  cumulativeUrl: string = "/cumulative-totals";
  totalDistanceUrl: string = "/distance-miles";
  totalTimeUrl: string = "/time";
  totalRunUrl:string =  "/run-count";


  weeklyWorkoutData!: WeeklyTotal[];
  cumulativeWorkoutData!: WeeklyTotal[];

  constructor(private http: HttpClient) {
    this.intializeData();
  }

  private intializeData(): void {
    this.http.get<WeeklyTotal[]>(this.baseUrl + this.weeklyUrl).subscribe({
      next: (response) => {
        this.weeklyWorkoutData = response;
      },
      error: (error) => {
        console.error('Error fetching athlete stats:', error);
      }
    });
    this.http.get<WeeklyTotal[]>(this.baseUrl +this.cumulativeUrl).subscribe({
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
  
    public getTotalDistanceStats(): Observable<QuickData> {
      return this.http.get<QuickData>(this.baseUrl +this.totalDistanceUrl);
    }

    public getTotalWorkoutTimeInSeconds(): Observable<QuickData> {
      return this.http.get<QuickData>(this.baseUrl +this.totalTimeUrl);
    }

    public getTotalRuns(): Observable<QuickData> {
      return this.http.get<QuickData>(this.baseUrl +this.totalRunUrl);
    }

}
