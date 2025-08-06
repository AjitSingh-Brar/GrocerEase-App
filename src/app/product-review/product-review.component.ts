import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardContent,
  IonIcon,
  IonButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { pencil, trash } from 'ionicons/icons';
import { HttpClient } from '@angular/common/http';

interface ProductReview {
  _id: string;
  customer: string;
  feedback: string;
  productId: string;
  reviewId: string;
}

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.scss'],
  imports: [
    IonButton,
    IonIcon,
    IonCardContent,
    IonCardSubtitle,
    IonCardHeader,
    IonCard,
  ],
})
export class ProductReviewComponent implements OnInit {
  @Input() itemData: ProductReview | undefined;

  @Output() editReview = new EventEmitter<string>();
  @Output() deleteReview = new EventEmitter<string>(); // or reviewId

  onEdit() {
    if (this.itemData) {
      this.editReview.emit(this.itemData.reviewId); // send full object to parent
    }
  }

  onDelete() {
    if (this.itemData?._id) {
      this.deleteReview.emit(this.itemData.reviewId); // send ID to parent
    }
  }

  constructor(private http: HttpClient) {}

  ngOnInit() {
    addIcons({ trash, pencil });
  }
}
