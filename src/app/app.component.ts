import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Observable, reduce } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe((data: number[]) => {
      const dataObservable = new Observable<number>((obs) => {
        for (let val of data) {
          obs.next(val);
        }
        obs.complete();
      });

      const doubledValues: number[] = [];
      const evenValues: number[] = [];

      // double emitted value
      dataObservable.subscribe((val: number) => {
        const doubleVal = val * 2;
        doubledValues.push(doubleVal);
        console.log('Double emitted value:', doubleVal);
      });

      // even value
      dataObservable.subscribe((val: number) => {
        if (val % 2 === 0) {
          evenValues.push(val);
          console.log('Even value:', val);
        }
      });

      // sum of all value
      const sum = dataObservable.pipe(reduce((acc, val) => acc + val, 0));
      sum.subscribe((totalSum) => {
        console.log('Sum of all values:', totalSum);
      });

      console.log('Even value array : ' + evenValues);
      console.log('Doubled value array : ' + doubledValues);
    });
  }
}
