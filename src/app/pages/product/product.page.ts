import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonTitle,
  IonGrid,
  IonRow,
  IonButton,
  IonIcon,
  IonCol,
  IonList,
  IonItem,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonModal,
  IonHeader,
  IonToolbar,
} from '@ionic/angular/standalone';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { addIcons } from 'ionicons';
import { removeOutline, addOutline } from 'ionicons/icons';
import { ProductReviewComponent } from 'src/app/product-review/product-review.component';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Product {
  _id: string;
  productId: string;
  productName: string;
  productDesc: string;
  price: number;
  photo: string;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
  standalone: true,
  imports: [
    IonToolbar,
    IonHeader,
    IonModal,
    IonInfiniteScrollContent,
    IonInfiniteScroll,
    IonItem,
    IonList,
    IonCol,
    IonIcon,
    IonButton,
    IonRow,
    IonGrid,
    IonContent,
    IonTitle,
    CommonModule,
    FormsModule,
    NavbarComponent,
    ProductReviewComponent,
  ],
})
export class ProductPage implements OnInit {
  quantity = 1;
  price = 5.0;
  product: Product | undefined;
  apiURL = 'http://localhost:5000/';

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    addIcons({ removeOutline, addOutline });
  }

  ngOnInit() {
    this.generateItems(5); // Load initial 5 items
    this.route.paramMap.subscribe((params) => {
      const id = params.get('productId');
      if (id) {
        this.http
          .get<Product>(this.apiURL + `show-product/${id}`)
          .subscribe((data) => {
            this.product = data;
          });
      }
    });
  }

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

  addToCart() {
    if (!this.product?.productId || !this.product?.productName || !this.quantity || !this.product?.photo || !this.product?.price) {
      console.error('Product details are missing');
      return;
    }

    let formData = new FormData();
    formData.append('productId', this.product?.productId);
    formData.append('productName', this.product?.productName);
    formData.append('quantity', String(this.quantity));
    formData.append('photo', this.product?.photo);
    formData.append('price', String(this.product?.price));

    this.http.post(this.apiURL + 'add-to-cart', formData).subscribe((data) => {
    });
  }

  items: string[] = [];
  private dataCounter = 0; // To simulate fetching new data

  private generateItems(count: number) {
    const remaining = 5 - this.items.length;
    const limit = Math.min(count, remaining);

    for (let i = 0; i < limit; i++) {
      this.items.push(`Item ${this.dataCounter++}`);
    }
  }

  async onIonInfinite(event: InfiniteScrollCustomEvent) {
    setTimeout(() => {
      this.generateItems(10); // Load another 10 items
      event.target.complete(); // Signal completion
    }, 500); // Simulate 500ms loading time
  }

  @ViewChild('addModal') modal!: IonModal;

  name!: string;
  review!: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  submit() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillAdd(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      console.log('Product review added');
    }
  }

  @ViewChild('reviewModal') reviewModal!: IonModal;

  updatedName!: string;
  updatedReview!: string;

  close() {
    this.reviewModal.dismiss(null, 'cancel');
  }
  confirm() {
    this.reviewModal.dismiss(this.updatedName, 'confirm');
  }
  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      console.log('Review updated');
    }
  }
}
