import { Component } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { Admin } from 'src/app/models/admin';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

    public admin = new Admin();

    public constructor(private adminService: AdminService, 
        private router: Router, private activatedRoute: ActivatedRoute) { }

    public login():void {
        this.admin._id = undefined;
        this.admin.firstName = undefined;
        this.admin.lastName = undefined;
        
        this.adminService.CheckAdmin(this.admin);
        
    }

}
