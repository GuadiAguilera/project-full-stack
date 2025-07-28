import { Component, inject } from '@angular/core';
import { ProductsServiceState } from '../data-access/products-state.service';
import { ProductCard } from '../../ui/product-card/product-card';
import { CartStateService } from '../../../shared/data-access/cart-state.service';
import { Product } from '../../../shared/interfaces/product.interface';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCard],
  templateUrl: './product-list.html',
  styles: ``,
  providers: [ProductsServiceState],
})
export default class ProductList {
  productsState = inject(ProductsServiceState);
  cartState = inject(CartStateService).state;

  changePage() {
    const page = this.productsState.state.page() + 1;
    this.productsState.changePage$.next(page);
  }

  addToCart(product: Product) {
    this.cartState.add({ product, quantity: 1 });
  }
}
