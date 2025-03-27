import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GraphComponent } from "./graph/graph.component";
import { DataBoxComponent } from "./data-box/data-box.component";

@Component({
    selector: 'app-root',
    imports: [GraphComponent, DataBoxComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone:true
})
export class AppComponent {
  title = 'strava-visualization-web';
}
