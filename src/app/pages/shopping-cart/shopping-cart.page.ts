import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { addIcons } from 'ionicons';
import { removeOutline, addOutline, trash } from 'ionicons/icons';
import { HttpClient } from '@angular/common/http';

interface Cart {
  _id: string;
  productName: string;
  photo: string;
  quantity: number;
  productId: string;
  price: number;
  itemId: string;
}
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonLabel,
    IonItem,
    IonCardContent,
    IonIcon,
    IonContent,
    IonTitle,
    CommonModule,
    FormsModule,
    NavbarComponent,
    IonCard,
    RouterModule,
  ],
})
export class ShoppingCartPage implements OnInit {
  cartItems: Cart[] = [];
  apiURL = 'http://localhost:5000/';
  productId = 1;

  constructor(private http: HttpClient) {
    addIcons({ removeOutline, addOutline, trash });
  }

  ngOnInit() {
    this.showCart();
  }

  showCart() {
    this.http.get<Cart[]>(this.apiURL + 'show-cart').subscribe((data) => {
      this.cartItems = data;
    });
  }
  quantity = 1;

  increment(item: Cart) {
    // increasing quantity
    item.quantity += 1;
    this.http
      .get(
        this.apiURL +
          'update-product-quantity/?itemId=' +
          item.itemId +
          '&quantity=' +
          item.quantity
      )
      .subscribe((data) => {
        console.log('Success')
        this.showCart();
      });
  }
  decrement(item: Cart) {
    // decreasing quantity
    if (item.quantity <= 1) {
      item.quantity = 1;
      this.http
        .get(
          this.apiURL +
            'update-product-quantity/?itemId=' +
            item.itemId +
            '&quantity=' +
            item.quantity
        )
        .subscribe((data) => {
          console.log('Success')
          this.showCart();
        });
    } else {
      item.quantity -= 1;
      this.http
        .get(
          this.apiURL +
            'update-product-quantity/?itemId=' +
            item.itemId +
            '&quantity=' +
            item.quantity
        )
        .subscribe((data) => {
          console.log('Success')
          this.showCart();
        });
    }
  }

  deleteItem(itemId: string) {
    this.http.get(this.apiURL + 'delete-product/?itemId=' + itemId).subscribe((data) => {
      this.showCart()
    });
  }
}
