import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecord } from '../models/Record';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private http: HttpClient) {}

  getAllCars(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/cars');
  }

  getOneCar(id: any): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/cars/${id}`);
  }

  deleteCar(id: number) {
    return this.http.delete(`http://localhost:3000/cars/${id}`);
  }

  createCar(car: IRecord): Observable<IRecord> {
    return this.http.post<IRecord>(`http://localhost:3000/cars`, car);
  }

  updateCar(car: any): Observable<any> {
    return this.http.put<any>(
      `http://localhost:3000/cars/${car.id}`,
      car
    );
  }

  getRecordsSum(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/total`);
  }

  getTotalWeight(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/weight`);
  }
}
