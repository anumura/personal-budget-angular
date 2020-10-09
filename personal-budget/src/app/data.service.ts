import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  // dataURL: string = 'http://localhost:3000/budget';

  constructor(private http: HttpClient) {}
    getChartData(): Observable<any[]>{
      return this.http.get<any[]>('http://localhost:3000/budget');
    }
}

