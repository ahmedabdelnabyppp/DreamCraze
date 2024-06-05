import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  deleteCategory(categoryId: any): Observable<any> {
    return this._http.delete(`http://localhost:8090/api/categories/delete/${categoryId}`);
  }

  constructor(private _http: HttpClient) { }
  getAllCategory(): Observable<any> {
    return this._http.get("http://localhost:8090/api/categories/allCategories");
  }

  createCategory(categoryDate: any): Observable<any> {
    return this._http.post("http://localhost:8090/api/categories/createCategory", categoryDate)
  }
}
