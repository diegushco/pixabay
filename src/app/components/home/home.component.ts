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

  private searchSubject: Subject<any> = new Subject();

  faSearch = faSearch;

  textToSearch: string;

  images$: Observable<any> = new Observable();

  category: string = 'all';

  categories = [
    {value: 'All' },
    {value: 'Science'},
    {value: 'Education'},
    {value: 'People'},
    {value: 'Feelings'},
    {value: 'Computer'},
    {value: 'Buildings'}
  ];

  constructor(
    private pixaBayService: PixabayService
  ) { }

  ngOnInit(): void {
    this.images$ = this.searchSubject.pipe(
      debounceTime(400), distinctUntilChanged(),
      switchMap(() => {
        return this.doSearch(this.textToSearch);
      }),
      tap((data)=>console.log("resultado:", data)),
      share()
    );
    this.searchSubject.next('');
    console.log("mmm");
  }

  search(): void{
    console.log(this.textToSearch);
    this.searchSubject.next(this.textToSearch);
  }

  doSearch(text): Observable<IPixabay>{
    return this.pixaBayService.getImageBySearch(text);
  }

  chgCategory(value:string){
    console.log("->"+value);
  }

}
