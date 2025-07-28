import { Component, inject } from '@angular/core';
import { CartItem } from './ui/cart-item/cart-item';
import { CartStateService } from '../shared/data-access/cart-state.service';
import { ProductItemCart } from '../shared/interfaces/product.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItem, CurrencyPipe],
  templateUrl: './cart.html',
  styles: ``
})
export default class Cart {
  state = inject(CartStateService).state;

  onRemove(id: number) {
    this.state.remove(id);
  }

  onDecrease(productCart: ProductItemCart) {
    this.state.update({
      product: productCart.product,
      quantity: productCart.quantity - 1
    });
  }

  onIncrease(productCart: ProductItemCart) {
    this.state.update({
      ...productCart,
      quantity: productCart.quantity + 1
    });
  }
  
}
