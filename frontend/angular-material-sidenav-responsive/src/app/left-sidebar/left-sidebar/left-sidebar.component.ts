import { CommonModule, NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule, NgClass],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.css'
})
export class LeftSidebarComponent {
  isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();
  items =[
    {
      routerLink: 'dashboard',
      icon: 'fal fa-home',
      label: 'Dashboard'
    },
    {
      routerLink: 'products',
      icon: 'fal fa-box-open',
      label: 'Products'
    },
    {
      routerLink: 'pages',
      icon: 'fal fa-file',
      label: 'Pages'
    },
    {
      routerLink: 'settings',
      icon: 'fal fa-cog',
      label: 'Settings'
    }
    
  ];

  toggleCollapse(): void{
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  closeSidenav(): void{
    this.changeIsLeftSidebarCollapsed.emit(true);
  }
}
