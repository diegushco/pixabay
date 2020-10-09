import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { PixabayService } from '../../services/images/pixabay.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap, share, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { IPixabay } from '../../interfaces/Pixabay.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private searchSubject: BehaviorSubject<{text: string, category: any}> = new BehaviorSubject({text: '', category: null});

  faSearch = faSearch;

  textToSearch: string = '';

  images$: Observable<any> = new Observable();

  category: any = null;

  actualPage = 1;

  categories = [
    {id: 'all' , value: 'All' },
    {id: 'science', value: 'Science'},
    {id: 'education', value: 'Education'},
    {id: 'people', value: 'People'},
    {id: 'feelings', value: 'Feelings'},
    {id: 'computer', value: 'Computer'},
    {id: 'buildings', value: 'Buildings'},
  ];

  constructor(
    private pixaBayService: PixabayService
  ) { }

  ngOnInit(): void {
    this.images$ = this.searchSubject.pipe(
      debounceTime(400), distinctUntilChanged(),
      switchMap((data) => {
        return this.doSearch(data.text, data.category);
      }),
      tap((data)=>console.log("resultado:", data)),
      share()
    );
    this.search();
  }

  search(): void{
    this.searchSubject.next({text: this.textToSearch, category: this.category});
  }

  doSearch(text: string, category: any): Observable<IPixabay>{
    return this.pixaBayService.getImageBySearch(text, category);
  }

  chgCategory(value: string): void{
    this.category = this.categories.find((c) => c.value === value).id;
    if (value === 'All'){
      this.category = null;
    }
  }

}
