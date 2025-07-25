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
  IonButtons,
} from '@ionic/angular/standalone';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { addIcons } from 'ionicons';
import { removeOutline, addOutline } from 'ionicons/icons';
import { ProductReviewComponent } from 'src/app/product-review/product-review.component';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

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
  constructor() {
    addIcons({ removeOutline, addOutline });
  }

  ngOnInit() {
    this.generateItems(5); // Load initial 5 items
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
    // Simulate a network request or data fetching delay
    setTimeout(() => {
      this.generateItems(10); // Load another 10 items
      event.target.complete(); // Signal completion
    }, 500); // Simulate 500ms loading time
  }

  @ViewChild(IonModal) modal!: IonModal;

  updatedName!: string;
  updatedReview!: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.updatedName, 'confirm');
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      console.log('Review updated');
    }
  }

  @ViewChild(IonModal) reviewModal!: IonModal;

  name!: string;
  review!: string;

  submit() {
    this.reviewModal.dismiss(this.name, 'confirm');
  }

  onWillAdd(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      console.log('Product review added');
    }
  }
}
