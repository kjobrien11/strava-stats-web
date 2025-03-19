import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
    selector: 'app-graph',
    imports: [NgxChartsModule],
    templateUrl: './graph.component.html',
    styleUrl: './graph.component.css',
    standalone: true
})
export class GraphComponent implements OnInit {
  data!: any[];
  lineChartData!: any[];

  constructor(private apiService: ApiService){}

  ngOnInit(): void {
      this.getData();
  }

  getData(){
    this.lineChartData = this.apiService.getLineChartData();
  } 

}
