import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Workout } from '../workout';
import { WeeklyTotal } from '../weekly-total';
import { DataBoxComponent } from '../data-box/data-box.component';
import { QuickData } from '../quick-data';
import { Observable } from 'rxjs';

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

  constructor(private apiService: ApiService){}

ngOnInit() {
  this.getData();
  this.apiService.getTotalDistanceStats().subscribe({
    next: (response) => {
      this.totalDistanceData = response;
      console.log(this.totalDistanceData)
    },
    error: (error) => {
      console.error('Error fetching athlete stats:', error);
      this.totalDistanceData = {
        title: 'Total Distance',
        value: 0,
        units: 'miles',
      };
    }
  });

  this.apiService.getTotalWorkoutTimeInSeconds().subscribe({
    next: (response) => {
      this.totalTimeData = response;
      console.log(this.totalTimeData)
    },
    error: (error) => {
      console.error('Error fetching athlete stats:', error);
      this.totalTimeData = {
        title: 'Total Distance',
        value: 0,
        units: 'miles',
      };
    }
  });

  this.apiService.getTotalRuns().subscribe({
    next: (response) => {
      this.totalRunsData = response;
      console.log(this.totalRunsData)
    },
    error: (error) => {
      console.error('Error fetching athlete stats:', error);
      this.totalRunsData = {
        title: 'Total Distance',
        value: 0,
        units: 'miles',
      };
    }
  });
}

  getData(){
    this.lineChartData = this.apiService.getLineChartData();
    this.barChartData = this.apiService.getBarChartData();
    this.customColors = this.apiService.getCustomColors();
  } 

}
