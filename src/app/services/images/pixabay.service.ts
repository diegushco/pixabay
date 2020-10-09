import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IPixabay } from '../../interfaces/Pixabay.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PixabayService {
  private api_url: string;
  private key: string;

  constructor(private http: HttpClient) {
    this.api_url = environment.api_root;
    this.key = environment.key;
  }

  getImageBySearch(text?: string): Observable<IPixabay>{
    let params = new HttpParams().set('key', this.key);

    if (text) {
      params = params.set('q', text);
    }

    const apiURL = `${this.api_url}/`;
    return this.http.get<IPixabay>(apiURL, { params });
  }
}
