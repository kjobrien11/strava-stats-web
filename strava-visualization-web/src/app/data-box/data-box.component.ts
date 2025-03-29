import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { Input } from '@angular/core';
import { QuickData } from '../quick-data';

@Component({
  selector: 'app-data-box',
  imports: [],
  templateUrl: './data-box.component.html',
  styleUrl: './data-box.component.css',
  standalone: true
})
export class DataBoxComponent implements OnChanges {
  @Input() data: QuickData | null = null;
  title: string = "Title";
  value: number = 0;
  units: string = "Units";

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data != null) {
      this.title = this.data.title;
      this.value = Math.round(this.data.value * 100) / 100;
      this.units = this.data.units;
    }
  }
}