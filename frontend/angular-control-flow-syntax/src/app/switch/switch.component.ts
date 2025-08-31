import { NgSwitch, NgSwitchCase } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-switch',
  standalone: true,
  imports: [],//imports: [NgSwitch, NgSwitchCase],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.css'
})
export class SwitchComponent {
  //permite hacer el ngSwitch
  protected selectedValue = 'option 1';
}
