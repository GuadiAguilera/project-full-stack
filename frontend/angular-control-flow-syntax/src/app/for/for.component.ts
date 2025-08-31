import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-for',
  standalone: true,
  imports: [NgFor],
  templateUrl: './for.component.html',
  styleUrl: './for.component.css'
})
export class ForComponent {
  names: string[] = ['Juan', 'Pedro', 'Maria'];
}
