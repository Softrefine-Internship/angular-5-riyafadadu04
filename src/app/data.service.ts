import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private data = [1, 2, 3, 4, 5];

  getData(): Observable<number[]> {
    return new Observable((observer) => {
      observer.next(this.data);
      observer.complete();
    });
  }
}
