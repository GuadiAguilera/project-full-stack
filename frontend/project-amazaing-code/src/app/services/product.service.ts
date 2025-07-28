import { Injectable } from '@angular/core';
import Product from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  name: string = 'Product Service';

  product: Product;

  constructor() { 
    this.product = {
      name: 'Product 1',
      price: 100,
      isForSale: true
    };
  }


  setProductName(name: string): void {
    this.product.name = name;
  }

  
}
