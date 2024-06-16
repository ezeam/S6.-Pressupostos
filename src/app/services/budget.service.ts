import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor() { }

  calcularCoste(numPaginas: number = 1, numIdiomas: number = 1):number{
    if(numPaginas > 1 || numIdiomas > 1){
      return numPaginas * numIdiomas * 30;
    }   
    else {
      return 0;
    }
  }
}
