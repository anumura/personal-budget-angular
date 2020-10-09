import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  name="Rajesh";
 // budgetservice1 = require('.../server/budget.json');
  budgetservice = { 'myBudget' : [
    {
        'title': 'Shopping',
        'budget': 1200
    },
    {
        'title': 'Grocery',
        'budget': 400
    },
    {
        'title': 'Rent',
        'budget': 100
    },
    {
        'title': 'Utilities',
        'budget': 500
    },
    {
        'title': 'EMI',
        'budget': 110
    },
    {
        'title': 'Insurance',
        'budget': 500
    },
    {
        'title': 'FoodLion',
        'budget': 500
    }
 ]
} ;
  constructor() { }
}
