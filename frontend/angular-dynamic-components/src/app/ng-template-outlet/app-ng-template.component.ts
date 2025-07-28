import { Component, signal } from '@angular/core';
import { StepActionsComponent } from './step/step-actions.component';
import { Step, StepComponent } from './step/step.component';

@Component({
  selector: 'app-root',
  templateUrl: './app-ng-template.component.html',
  imports: [StepComponent, StepActionsComponent],
  styleUrl: '../app.component.css',
})
export class AppComponent {
  steps = signal<Step[]>([
    {
      id: 1,
      text: 'Este es el primer step.',
    },
    {
      id: 2,
      text: 'Este es el segundo step.',
    },
    {
      id: 3,
      text: 'Este es el tercer step.',
    },
  ]);
}
