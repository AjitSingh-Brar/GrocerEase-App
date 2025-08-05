import { Component, OnInit } from '@angular/core';
import {
  IonIcon,
  IonHeader,
  IonNav,
  IonContent,
  IonSearchbar,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonToolbar,
  IonButton,
  IonBadge,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cartOutline, star, personCircleOutline } from 'ionicons/icons';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

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
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [
    IonBadge,
    IonButton,
    IonToolbar,
    IonCol,
    IonRow,
    IonGrid,
    IonSearchbar,
    IonNav,
    IonHeader,
    IonIcon,
    RouterModule,
  ],
})
export class NavbarComponent implements OnInit {
  cartItems: Cart[] = [];
  apiURL = 'http://localhost:5000/';

  constructor(private http: HttpClient, private router: Router) {
    addIcons({ personCircleOutline, cartOutline, star });
  }

  ngOnInit() {
    this.showCart();
  }

  showCart() {
    this.http.get<Cart[]>(this.apiURL + 'show-cart').subscribe((data) => {
      this.cartItems = data;
    });
  }
}
