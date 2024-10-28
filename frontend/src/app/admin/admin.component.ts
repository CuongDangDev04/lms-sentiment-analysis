import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarAdminComponent } from "./components/sidebar-admin/sidebar-admin.component";
import { HeaderAdminComponent } from "./components/header-admin/header-admin.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, SidebarAdminComponent, HeaderAdminComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
