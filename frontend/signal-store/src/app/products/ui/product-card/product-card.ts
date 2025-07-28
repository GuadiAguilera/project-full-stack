import { Component, input, output } from '@angular/core';
import { Product } from '../../../shared/interfaces/product.interface';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
  styles: ``
})
export class ProductCard {
  product = input.required<Product>();

  addToCart = output<Product>();

  add(event: Event){
    event.stopPropagation();
    event.preventDefault();
    this.addToCart.emit(this.product());
  }
}
