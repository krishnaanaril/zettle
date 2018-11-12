import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  categoriesUrl = 'assets/data/categories.json';

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get(this.categoriesUrl);
  }
}
