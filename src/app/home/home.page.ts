import { Component } from '@angular/core';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonButton,
} from '@ionic/angular/standalone';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Product {
  _id: string;
  productId: string;
  productName: string;
  productDesc: string;
  price: number;
  photo: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonButton,
    IonCardContent,
    IonCard,
    IonCol,
    IonRow,
    IonGrid,
    IonContent,
    NavbarComponent,
    RouterModule,
    CommonModule,
  ],
})
export class HomePage {
  products: Product[] = [];
  apiURL = 'http://localhost:5000/';
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.showProducts();
  }

  showProducts() {
    this.http
      .get<Product[]>(this.apiURL + 'show-products')
      .subscribe((data) => {
        this.products = data;
      });
  }

  filteredProductsFruitsVeg() {
    return this.products
      ? this.products.filter((p: any) => p.productId.startsWith('F&V'))
      : [];
  }

  filteredProductsBakery() {
    return this.products
      ? this.products.filter((p: any) => p.productId.startsWith('BK'))
      : [];
  }

  filteredProductsBeverages() {
    return this.products
      ? this.products.filter((p: any) => p.productId.startsWith('BV'))
      : [];
  }

  goToProduct(productId: string) {
    if (!productId) {
      console.error('Product ID is missing!');
      return;
    }
    this.router.navigate(['/product', productId]).then((success) => {
      if (!success) {
        console.error('Navigation to product failed');
      }
    });
  }

  addProduct(
    productId: string,
    productName: string,
    quantity: number,
    photo: string,
    price: number
  ) {
    if (!productId || !productName || !quantity || !photo || !price) {
      console.error('Product details are missing');
      return;
    }

    let formData = new FormData();
    formData.append('productId', productId);
    formData.append('productName', productName);
    formData.append('quantity', String(quantity));
    formData.append('photo', photo);
    formData.append('price', String(price));

    this.http.post(this.apiURL + 'add-to-cart', formData).subscribe((data) => {
      console.log('Product of ID ' + productId + ' was added');
    });
  }
}
