import {
  Component,
} from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { SplitterModule } from 'primeng/splitter';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelMenuComponent } from "./shared/ui/panel-menu/panel-menu.component";
import { CartService } from "./products/data-access/cart.service";
import { BadgeModule } from 'primeng/badge';
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [RouterModule, SplitterModule, ToolbarModule, PanelMenuComponent,BadgeModule],
})
export class AppComponent {
  title = "ALTEN SHOP";
  cartQuantity: number = 0;
  constructor(private cartService: CartService, private router: Router) {}
  ngOnInit() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartQuantity = items.length; // Assuming the quantity is the number of items
    });
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }
}
