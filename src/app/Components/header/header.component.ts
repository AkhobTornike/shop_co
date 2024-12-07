import { Component } from '@angular/core';
import { HeaderAddComponent } from "./header-add/header-add.component";
import { SearchComponent } from "./search/search.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HeaderAddComponent, SearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
