import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AdminComponent } from '../components/admin/admin.component';
import { AdminBoardComponent } from '../components/admin-board/admin-board.component';
import { AdminLoginGuardService } from '../services/login-guard.service';
import { AddProductComponent } from '../components/add-product/add-product.component';
import { UpdateProductComponent } from '../components/update-product/update-product.component';


const adminRoutes: Routes = [

    {
        path: "", component: AdminBoardComponent, canActivate: [AdminLoginGuardService],
        children: [
            { path: 'app-add-product', component: AddProductComponent },
            { path: 'app-update-product/:id', component: UpdateProductComponent }
        ]
    },

];

@NgModule({
    declarations: [],
    imports: [
        CommonModule, RouterModule.forChild(adminRoutes)
    ],

})
export class AdminRouterModule { }

