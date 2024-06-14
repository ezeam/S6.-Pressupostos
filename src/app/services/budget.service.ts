import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor() { }

  calcularCoste(numPaginas: number = 1, numIdiomas: number = 1):number{
    return numPaginas * numIdiomas * 30;
  }
}
