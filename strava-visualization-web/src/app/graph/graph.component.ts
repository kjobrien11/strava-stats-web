import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Workout } from '../workout';
import { WeeklyTotal } from '../weekly-total';
import { DataBoxComponent } from '../data-box/data-box.component';

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

  constructor(private apiService: ApiService){}

  ngOnInit(): void {
      this.getData();
  }

  getData(){
    this.lineChartData = this.apiService.getLineChartData();
    this.barChartData = this.apiService.getBarChartData();
    this.customColors = this.apiService.getCustomColors();
    console.log(this.apiService.getCustomColors())
  } 

}
