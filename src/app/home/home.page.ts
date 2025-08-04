import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { NavbarComponent } from "../navbar/navbar.component";
import { ProductPage } from "../pages/product/product.page";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonButton, IonCardContent, IonCard, IonCol, IonRow, IonGrid, IonHeader, IonToolbar, IonTitle, IonContent, NavbarComponent, ProductPage],
})
export class HomePage {
  constructor() {}
}
