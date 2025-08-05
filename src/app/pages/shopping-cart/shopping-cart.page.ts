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
  constructor() {}

  ngOnInit() {}

  productId = 1;
  quantity = 1;

  increment() {
    // increasing quantity
    this.quantity += 1;
  }
  decrement() {
    // decreasing quantity
    if (this.quantity <= 1) {
      this.quantity = 1;
    } else {
      this.quantity -= 1;
    }
  }

  delete() {
    this.quantity = 0;
  }
}
