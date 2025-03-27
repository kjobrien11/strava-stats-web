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
  data!: Workout[];
  lineChartData!: any[];
  barChartData!:any[]
  customColors!:any[]; 
  totalDistance!: QuickData;

  constructor(private apiService: ApiService){}

ngOnInit() {
  this.getData();
  this.getTotalDistanceStats().subscribe({
    next: (response) => {
      this.totalDistance = response;
    },
    error: (error) => {
      console.error('Error fetching athlete stats:', error);
      this.totalDistance = {
        title: 'Total Distance',
        value: 0,
        units: 'miles',
      };
    }
  });
}

public getTotalDistanceStats(): Observable<QuickData> {
  return this.apiService.getTotalDistanceStats();
}

  getData(){
    this.lineChartData = this.apiService.getLineChartData();
    this.barChartData = this.apiService.getBarChartData();
    this.customColors = this.apiService.getCustomColors();
  } 

}
