import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BestBuyStoreComponent } from '../components/best-buy-store/best-buy-store.component';
import { Routes, RouterModule } from '@angular/router';
import { AdminLoginGuardService } from '../services/login-guard.service';
import { CustomersGuardService } from '../services/customers-guard.service';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderPageComponent } from '../components/order-page/order-page.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ThankYouComponent } from '../components/thank-you/thank-you.component';
import { NgRedux } from 'ng2-redux';
import { Store } from '../redux/store';
import { Reducer } from '../redux/reducer';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const myShop: Routes = [

    {
        path: "", component: BestBuyStoreComponent, canActivate: [CustomersGuardService],
        children: [],

    },
    { path: 'order', component: OrderPageComponent, canActivate: [CustomersGuardService] },
    { path: 'thank-you', component: ThankYouComponent, canActivate: [CustomersGuardService] }

];


@NgModule({
    declarations: [BestBuyStoreComponent,
        OrderPageComponent,
        ThankYouComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(myShop),
        MatTabsModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatFormFieldModule,
        MatButtonModule,
        MatProgressSpinnerModule
    ]
})
export class CustomersModule {

}
