import { DepartmentService } from './department.service';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { Product } from './product';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly url = 'http://localhost:3000/products';
  private productSubject$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(null);
  private loaded = false;

  constructor(
    private http: HttpClient,
    private departmentService: DepartmentService) {

     }

  get(): Observable<Product[]> {

    if (!this.loaded) {
       this.loaded = true;
       combineLatest(
      this.http.get<Product[]>(this.url),
      this.departmentService.get())
      .pipe(
        tap(([products, departments]) => console.log(products, departments)),
        map(([products, departments]) => {
          for (const p of products) {
            const ids = (p.departments as string[]);
            p.departments = ids.map((id) => departments.find(dep => dep._id === id));
          }
          return products;
        }),
        tap((products) => console.log(products))
      )
      .subscribe(this.productSubject$);

    }
    return this.productSubject$.asObservable();
  }


}
