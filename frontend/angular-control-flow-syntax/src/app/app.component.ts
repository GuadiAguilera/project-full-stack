import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeferComponent } from './defer/defer.component';
import { PlaceholderComponent } from "./placeholder/placeholder.component";
import { LoadingComponent } from "./loading/loading.component";
import { AdvancedDeferComponent } from './advanced-defer/advanced-defer.component';
import { ErrorComponent } from './error/error.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DeferComponent, PlaceholderComponent,LoadingComponent, AdvancedDeferComponent, ErrorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-control-flow-syntax';
}
