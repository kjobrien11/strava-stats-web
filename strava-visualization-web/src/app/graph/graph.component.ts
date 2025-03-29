import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Workout } from '../workout';
import { WeeklyTotal } from '../weekly-total';
import { DataBoxComponent } from '../data-box/data-box.component';
import { QuickData } from '../quick-data';
import { Observable, forkJoin } from 'rxjs';

@Component({
    standalone: true,
    selector: 'app-graph',
    imports: [NgxChartsModule, DataBoxComponent],
    templateUrl: './graph.component.html',
    styleUrl: './graph.component.css',

})
export class GraphComponent implements OnInit {
  lineChartData!: any[];
  barChartData!:any[]
  customColors!:any[]; 
  totalDistanceData!: QuickData;
  totalTimeData!: QuickData;
  totalRunsData!: QuickData;
  avgerageSpeedData!: QuickData;
  averageHeartRateData!: QuickData;
  longestRunData!: QuickData;

  constructor(private apiService: ApiService){}

  ngOnInit() {
    this.getData();

    forkJoin({
      totalDistance: this.apiService.getTotalDistanceStats(),
      totalTime: this.apiService.getTotalWorkoutTimeInSeconds(),
      totalRuns: this.apiService.getTotalRuns(),
      averageSpeed: this.apiService.getAverageSpeed(),
      avgerageHearRate: this.apiService.getAverageHeartRate(),
      longestRun: this.apiService.getLongestRun()
    }).subscribe({
      next: ({ totalDistance, totalTime, totalRuns, averageSpeed, avgerageHearRate, longestRun }) => {
        this.totalDistanceData = totalDistance;
        this.totalTimeData = totalTime;
        this.totalRunsData = totalRuns;
        this.avgerageSpeedData = averageSpeed;
        this.averageHeartRateData = avgerageHearRate;
        this.longestRunData = longestRun;
      },
      error: (error) => {
        console.error('Error fetching athlete stats:', error);
        this.totalDistanceData = { title: 'Total Distance', value: 0, units: 'Miles' };
        this.totalTimeData = { title: 'Total Time', value: 0, units: 'Seconds' };
        this.totalRunsData = { title: 'Total Runs', value: 0, units: 'Count' };
        this.longestRunData = { title: 'Longest Run', value: 0, units: 'Miles' };
        this.averageHeartRateData = { title: 'Average Heart Rate', value: 0, units: 'BPM' };
        this.avgerageSpeedData = { title: 'Average Speed', value: 0, units: 'MPH' };
      }
    });
  }


  getData(){
    this.lineChartData = this.apiService.getLineChartData();
    this.barChartData = this.apiService.getBarChartData();
    this.customColors = this.apiService.getCustomColors();
  } 

}
