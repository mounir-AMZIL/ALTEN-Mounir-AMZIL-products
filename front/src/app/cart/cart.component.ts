import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { ProductFormComponent } from "app/products/ui/product-form/product-form.component";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { CartService } from 'app/products/data-access/cart.service';
import { Product } from 'app/products/data-access/product.model';
import { CartItem } from 'app/products/data-access/cartItem.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ FormsModule,  DataViewModule, CardModule, ButtonModule, DialogModule, ProductFormComponent, TagModule, RatingModule,BadgeModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  private readonly cartService = inject(CartService);
  cartItems: CartItem[] = [];
  ngOnInit() {
   
    this.cartService.getCartItems().subscribe((items: CartItem[]) => {
      this.cartItems = items;
    });
  }
  decreaseQuantity(cart:CartItem){
     this.cartService.decreaseQuantityInCart(cart.product.id);
  }

  increaseQuantity(cart:CartItem){
    this.cartService.addToCart(cart.product);  
  }

  public onDelete(product: Product) {
    this.cartService.removeFromCart(product.id);
  }
  public getBadgeSeverity(status: string): 'success' | 'warning' | 'danger' | 'info' | null {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning'; 
      case 'OUTOFSTOCK':
        return 'danger';  
      default:
        return 'info';  
    }
  } 
  
}
