import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  faSearch = faSearch;

  textToSearch: string;

  constructor() { }

  ngOnInit(): void {
  }

  search(): void{
    console.log(this.textToSearch);
  }

}
