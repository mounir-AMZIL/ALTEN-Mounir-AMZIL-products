import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CartItem } from './cartItem.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.cartItems);

  cartItems$ = this.cartItemsSubject.asObservable();

  
  constructor() { }

  addToCart(product: Product): void {
    const existingProduct = this.cartItems.find(item => item.product.id === product.id);
    if (existingProduct) {
      // update quantity or other properties
      existingProduct.quantity += 1;
    } else {
      this.cartItems.push({ quantity: 1, product: { ...product } });
    }
    this.cartItems.forEach(e => console.log(e))
    this.cartItemsSubject.next(this.cartItems);
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.cartItemsSubject.next(this.cartItems);
  }

  decreaseQuantityInCart(productId: number): void {
    const existingProduct = this.cartItems.find(item => item.product.id === productId);
    if (existingProduct) {
      existingProduct.quantity -= 1;
      if (existingProduct.quantity == 0) {
        this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
      }
      this.cartItemsSubject.next(this.cartItems);
    }
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartItemsSubject.asObservable();
  }

  // Optionally add more methods, e.g., for calculating totals
}