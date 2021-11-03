import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IRecord } from 'src/app/models/Record';
import { CarsService } from 'src/app/services/cars.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  constructor(private _carsService: CarsService) {
  }

  cars: IRecord[] = [];
  filteredCars: IRecord[] = [];
  field: string = '';
  sortAsc: boolean = true;
  dataLoaded: boolean = false;
  total_records: number = 0;
  total_weight: number = 0;
  recordsLoaded: boolean = false;
  stateError: any = undefined;


  @ViewChild('newCar') newCar!: NgForm;
  @ViewChild('plate') plate!: NgForm;
  @ViewChild('passengers') passengers!: NgForm;
  @ViewChild('weight') weight!: NgForm;
  @ViewChild('dateInput') dateInput!: NgForm;
  @ViewChild('checkInput') checkInput!: NgForm;

  ngOnInit(): void {
    if (this.stateError) {
      alert(`${this.stateError} Please choose car from a list.`);
    }
    this._carsService.getAllCars().subscribe(
      (res) => {
        this.cars = res;
        this.filteredCars = this.cars;
        this.dataLoaded = true;
      },
      (err) => {
        console.log(err);
        this.dataLoaded = true;
      }
    );
    this.getCarsSum();
    this.getTotalWeight();
  }

  onFilter($event: any): void {
    let inp = $event.target.value.toLocaleLowerCase();
    this.filteredCars = this.cars.filter(
      (pl) => pl.plate.toLocaleLowerCase().indexOf(inp) != -1
    );
  }

  onSort(field: string): void {
    let fieldAsKey = field as keyof IRecord;
    this.field = field;
    if (this.sortAsc) {
      this.filteredCars.sort((a, b) => {
        return a[fieldAsKey] < b[fieldAsKey] ? -1 : 0;
      });
      this.sortAsc = !this.sortAsc;
    } else {
      this.filteredCars.sort((a, b) => {
        return a[fieldAsKey] > b[fieldAsKey] ? -1 : 0;
      });
      this.sortAsc = !this.sortAsc;
    }
  }

  addCar() {
    if (this.newCar.valid) {
      this._carsService
        .createCar({ priority: 0, ...this.newCar.value })
        .subscribe(
          (res) => {
            this.cars.push(res);
            this.filteredCars = this.cars;
            alert(
              `Car with plate ${this.plate.value} successfuly added to DB!`
            );
            this.getCarsSum();
            this.getTotalWeight();
          },
          (err) => console.log(err)
        );
    }
  }

  onDelete(id: number): void {
    this._carsService.deleteCar(id).subscribe(
      (res) => {
        alert(
          `Car ${
            this.cars.find((pl) => pl.id == id)?.id
          } successfuly deleted from DB!`
        );
        this.cars = this.cars.filter((pl) => pl.id !== id);
        this.filteredCars = this.cars;
        this.getCarsSum();
        this.getTotalWeight();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onUpdate(car: IRecord): void {
    console.log(car.weight);
    car.weight = car.weight;
    this._carsService.updateCar(car).subscribe(
      (res) => {
        alert(
          `Car ${
            this.cars.find((pl) => pl.id == car.id)?.id
          } successfuly updated in DB!`
        );
        console.log(res);
        this.getCarsSum();
        this.getTotalWeight();
      },
      (err) => {
        alert(err.error.errors[0].msg);
      }
    );
  }

  getCarsSum() {
    this._carsService.getRecordsSum().subscribe(
      (res) => {
        this.total_records = res.total_cars;
        this.recordsLoaded = true;
      },
      (err) => console.log(err)
    );
  }

  getTotalWeight() {
    this._carsService.getTotalWeight().subscribe(
      (res) => {
        this.total_weight = res.total_weight;
      },
      (err) => console.log(err)
    );
  }

}
