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
import { RouterModule } from '@angular/router';
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
  constructor() {
    addIcons({ personCircleOutline, cartOutline, star });
  }

  ngOnInit() {}
}
