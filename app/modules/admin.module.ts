import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from '../components/admin/admin.component';
import { AdminBoardComponent } from '../components/admin-board/admin-board.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { AdminRouterModule } from './admin-router.module';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { AddProductComponent } from '../components/add-product/add-product.component';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { UpdateProductComponent } from '../components/update-product/update-product.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    declarations: [AdminComponent, AdminBoardComponent, AddProductComponent, UpdateProductComponent],
    imports: [
        CommonModule, FormsModule, HttpClientModule,
        AdminRouterModule,
        MatCardModule, MatSidenavModule, MatToolbarModule, FlexLayoutModule,
        MatTabsModule, MatChipsModule, MatFormFieldModule, MatSelectModule,
        MatInputModule, MatButtonModule, ReactiveFormsModule, RouterModule,
        AngularFileUploaderModule, MatMenuModule, MatProgressSpinnerModule


    ],
    exports: [RouterModule]

})
export class AdminModule { }
