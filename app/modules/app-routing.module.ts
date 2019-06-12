import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { Page404Component } from '../components/page404/page404.component';
import { CommonModule } from '@angular/common';
import { AdminComponent } from '../components/admin/admin.component';
import { CustomerRegisterComponent } from '../components/customer-register/customer-register.component';

const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "admin", component: AdminComponent },
    { path: "admin/admin-board", loadChildren: "./admin.module#AdminModule" },
    { path: "home/register", component: CustomerRegisterComponent },
    { path: "home/shop", loadChildren: "./customers.module#CustomersModule" },
    { path: "", pathMatch: "full", redirectTo: "home" },
    { path: "**", component: Page404Component } // חייב להיות אחרון ברשימה
];

@NgModule({
    imports: [CommonModule, RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
