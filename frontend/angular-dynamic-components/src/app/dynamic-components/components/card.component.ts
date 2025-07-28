import { Component, Input, input, OnDestroy, output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnDestroy {
  title = input<string>('View Component');

  @Input() description = 'This is the view component';

  remove = output();

  deleteCard() {
    this.remove.emit();
  }

  ngOnDestroy() {
    console.log('destroy');
  }
}
