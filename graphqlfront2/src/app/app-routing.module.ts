import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductlistComponent} from './productlist/productlist.component';
import {ProductformComponent} from './productform/productform.component';

const routes: Routes = [
  {
    path: 'products',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ProductlistComponent
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: ProductformComponent
      },
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: ProductformComponent
      },
      {
        path: '**',
        redirectTo: ''
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
