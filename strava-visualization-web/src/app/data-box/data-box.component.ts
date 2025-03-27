import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-data-box',
  imports: [],
  templateUrl: './data-box.component.html',
  styleUrl: './data-box.component.css',
  standalone: true
})
export class DataBoxComponent {
  @Input() title: string = "Title";
  @Input() value: number = 0;
  @Input() units: string = "units";
}
