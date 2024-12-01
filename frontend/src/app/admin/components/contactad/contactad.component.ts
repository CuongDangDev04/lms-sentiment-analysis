import { Component } from '@angular/core';
import { ContactComponent } from "../../../instructors/components/contact/contact.component";

@Component({
  selector: 'app-contactad',
  standalone: true,
  imports: [ContactComponent],
  templateUrl: './contactad.component.html',
  styleUrl: './contactad.component.css'
})
export class ContactadComponent {

}
