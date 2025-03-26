import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GraphComponent } from "./graph/graph.component";

@Component({
    selector: 'app-root',
    imports: [GraphComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone:true
})
export class AppComponent {
  title = 'strava-visualization-web';
}
