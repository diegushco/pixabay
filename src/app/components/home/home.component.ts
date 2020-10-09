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

  /**
   * Behavior Subject to search and filter repeating fields
   */
  private searchSubject: BehaviorSubject<{text: string, category: any, page: number}> =
   new BehaviorSubject({text: '', category: null, page: null });

   /**
    * Icon search next to input text
    */
  faSearch = faSearch;

  /**
   * Text to search
   */
  textToSearch: string = '';

  /**
   * Observable to render the images
   */
  images$: Observable<any> = new Observable();

  /**
   * Variable to handle the category of images
   */
  category: any = null;

  /**
   * Handles current page of page
   */
  actualPage = 1;

  /**
   * Categories for dropwdown
   */
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
        return this.doSearch(data.text, data.category, data.page);
      }),
      share()
    );
    this.search();
  }

  /**
   * Calls the subject for next search
   */
  search(): void{
    this.searchSubject.next({text: this.textToSearch, category: this.category, page: this.actualPage});
  }

  /**
   * makes call to the api service
   * @param text for search
   * @param category for category
   * @param page for current page to find it
   */
  doSearch(text: string, category: any, page: number): Observable<IPixabay>{
    return this.pixaBayService.getImageBySearch(text, category, page);
  }

  /**
   * Update category when changing from dropdown
   */
  chgCategory(value: string): void{
    this.category = this.categories.find((c) => c.value === value).id;
    if (value === 'All'){
      this.category = null;
    }
  }

  /**
   *
   * @param pageNumber to update actual page and search a new result
   */
  chgPage(pageNumber): void{
    this.actualPage = pageNumber;
    this.search();
  }

}
