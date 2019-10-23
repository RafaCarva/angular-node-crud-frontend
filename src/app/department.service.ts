import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, pipe} from 'rxjs';
import { tap} from 'rxjs/operators';
import { Department } from './department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  readonly url = 'http://localhost:3000/departments';

  private departmentsSubjects$: BehaviorSubject<Department[]> = new BehaviorSubject<Department[]>(null);
  private loaded: boolean = false;

  constructor(private http: HttpClient) { }

  get(): Observable<Department[]> {
    if (!this.loaded) {
      this.http.get<Department[]>(this.url)
        .pipe( tap((deps) => console.log(deps)))
        .subscribe(this.departmentsSubjects$);
      this.loaded = true;
    }
    return this.departmentsSubjects$.asObservable();
  }

  add(d: Department): Observable<Department> {
    return this.http.post<Department>(this.url, d)
    .pipe(
      tap((dep: Department) => this.departmentsSubjects$.getValue().push(dep))
    );
  }

}
