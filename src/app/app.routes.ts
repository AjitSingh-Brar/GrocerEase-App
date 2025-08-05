import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'product',
    loadComponent: () => import('./pages/product/product.page').then( m => m.ProductPage)
  },  {
    path: 'shopping-cart',
    loadComponent: () => import('./pages/shopping-cart/shopping-cart.page').then( m => m.ShoppingCartPage)
  },

];
