/* eslint-disable @typescript-eslint/no-explicit-any */
import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  inject,
  Injector,
  input,
  signal,
  TemplateRef,
} from '@angular/core';

export interface Step {
  id: number;
  text: string;
}

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  imports: [NgTemplateOutlet],
})
export class StepComponent {
  headerTemplate = input<TemplateRef<any>>();

  bodyTemplate = input<TemplateRef<any>>();

  footerTemplate = input<TemplateRef<any>>();

  steps = input.required<Step[]>();

  currentStep = signal(0);

  injector = inject(Injector);

  next() {
    if (this.currentStep() === this.steps().length - 1) return;

    this.currentStep.update((i) => i + 1);
  }

  previous() {
    if (this.currentStep() === 0) return;

    this.currentStep.update((i) => i - 1);
  }
}
