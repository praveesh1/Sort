import { Component } from '@angular/core';

interface City {
  name: string;
  code: string;
}
import {
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  AfterViewInit
} from "@angular/core";
import { Table } from "primeng/table";
import { MOCK_DATA } from "./data";
import {SelectItem} from 'primeng/api'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild("sortTable") sortTable: Table;

  public event;
  name = "Angular 6";
  cols: SelectItem[];
  cities1: SelectItem[];
  cars: any[];
  cities: any[];
  selectedAmendmentCode: number;
  colName: string;
  colName2: string;
  order = false;
  myClass = true;
  status = false;
  drop = true;
  isDisabled = true;
  @Output() sortFunction: EventEmitter<any> = new EventEmitter<any>();
  display: boolean = false;


    //SelectItem API with label-value pairs
  
    showDialog() {
        this.display = true;
    }
  ngOnInit() {
    // this.sortTable.sortFunction = this.sortFunction;
    this.cars = MOCK_DATA;
    this.cols = [
      { value: "id", label: "id" },
      { value: "year", label: "Year" },
      { value: "brand", label: "Brand" },
      { value: "color", label: "Color" }   //field header
    ];
  }

  ngAfterViewInit() {
    this.sortTable.sortFunction = this.sortFunction;
  }

  mySort() {
    console.log(this.sortTable);
    console.log(this.sortTable._value);
 //<-----------------------------------SORTING FOR 1ST SELECTED DROPDWON---------------------------------------->//
    const colNm = this.colName;
    if (this.status) {
      this.sortTable._value.sort((a, b) => {
        if ((a[colNm] <= b[colNm])  ) 
        {
            return -1;
        }
        else if (a[colNm] > b[colNm]) {
          return 1;
        }
        else return 0;
      });
    } else {
      //this.sortTable._value.reverse();
      this.sortTable._value.sort((a, b) => {
        if ((a[colNm] >= b[colNm])  )
        {
            return -1;
        }
        else if (a[colNm] < b[colNm]) {
          return 1;
        }
        else return 0;
      });
    }

    
//<-----------------------------------SORTING FOR 2nd SELECTED DROPDWON---------------------------------------->//
const colNm2 = this.colName2;
    this.sortTable._value.sort((a, b) => {
      if(a[colNm]==b[colNm]){
        if(a[colNm2]<b[colNm2]) {
          if(this.status) return -1;
          else return 1
        }
        else if(a[colNm2]> b[colNm2]){
           if(this.status) return 1;
           else return -1
          }
        else return 0;
      }
    });
  }

  columnselection(ev) {
    this.isDisabled = false;
    this.colName = ev;
    console.log("Column name is"+this.colName);
    this.drop=false;
    
  }
  columnselection2(ev) {
    this.isDisabled = false;
    this.colName2 = ev;
   
  }

  clickEvent() {
    this.status = !this.status;   //Toggling of ascending or desending button
  }
  func(){
    this.display=false;
    this.mySort();
  }
}
