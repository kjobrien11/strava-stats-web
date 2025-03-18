import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.css'
})
export class GraphComponent {

  constructor(private apiService: ApiService){}

  getData(){
    console.log(this.apiService.getWorkouts());
  }

}
