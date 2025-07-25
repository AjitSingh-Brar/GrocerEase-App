import { Component, OnInit } from '@angular/core';
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
  constructor() {}

  ngOnInit() {
    addIcons({ trash, pencil });
  }
}
