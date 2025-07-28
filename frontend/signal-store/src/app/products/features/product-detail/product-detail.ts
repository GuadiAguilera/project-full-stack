import { Component, effect, inject, input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailStateService } from '../data-access/product-detail-state.service';
import { CurrencyPipe } from '@angular/common';
import { CartStateService } from '../../../shared/data-access/cart-state.service';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe],
  templateUrl: './product-detail.html',
  providers: [ProductDetailStateService],
})
export default class ProductDetail {
  productDetailService = inject(ProductDetailStateService).state;
  cartStateService = inject(CartStateService).state;
  id = input.required<String>();

  constructor() {
    effect(() => {
      this.productDetailService.getById(this.id());
    });
  }

  addToCart() {
    this.cartStateService.add({
      product: this.productDetailService.product()!,
      quantity: 1,
    });
  }
}
