import { Component } from '@angular/core';
import { IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { NavbarComponent } from "../navbar/navbar.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonButton, IonCardContent, IonCard, IonCol, IonRow, IonGrid, IonContent, NavbarComponent, RouterModule],
})
export class HomePage {
  constructor() {}
}
