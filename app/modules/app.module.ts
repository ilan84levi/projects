import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from '../components/layout/layout.component';
import { HeaderComponent } from '../components/header/header.component';
import { HomeComponent } from '../components/home/home.component';
import { FooterComponent } from '../components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { NgReduxModule, NgRedux } from "ng2-redux";
import { Page404Component } from '../components/page404/page404.component';
import { Store } from '../redux/store';
import { Reducer } from '../redux/reducer';
import { store } from '@angular/core/src/render3';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { CustomerRegisterComponent } from '../components/customer-register/customer-register.component';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    declarations: [
        LayoutComponent,
        HeaderComponent,
        HomeComponent,
        FooterComponent,
        Page404Component,
        CustomerRegisterComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        NgReduxModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatCardModule,
        FlexLayoutModule,
        MatTabsModule,
        MatFormFieldModule,
        AngularFileUploaderModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule
    ],
    providers: [],
    bootstrap: [LayoutComponent]
})
export class AppModule {
    public constructor(redux: NgRedux<Store>) {
        redux.configureStore(Reducer.reduce, new Store());
    }
}
