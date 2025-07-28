import { Component, inject } from '@angular/core';
import { StepComponent } from './step.component';

@Component({
  selector: 'app-step-actions',
  templateUrl: './step-actions.component.html',
})
export class StepActionsComponent {
  parentComponent = inject(StepComponent);

  next() {
    this.parentComponent.next();
  }
}
