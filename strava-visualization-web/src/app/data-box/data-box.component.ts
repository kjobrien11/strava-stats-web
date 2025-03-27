import { Component } from '@angular/core';

@Component({
  selector: 'app-data-box',
  imports: [],
  templateUrl: './data-box.component.html',
  styleUrl: './data-box.component.css',
  standalone: true
})
export class DataBoxComponent {
  title: string = "Total Distance"
  value: number = 200;
  units: string = "miles"
}
