import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RouterModule, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  isLeftSidebarCollepsed = input.required<boolean>();

  screenWidth = input.required<number>();

  sizeClass = computed(() => {
    const isLeftSidebarCollepsed = this.isLeftSidebarCollepsed()
    if(isLeftSidebarCollepsed){
      return '';
    }
    return this.screenWidth() > 768 ? 'body-trimmed' : 'body-md-screen';
  });

}
