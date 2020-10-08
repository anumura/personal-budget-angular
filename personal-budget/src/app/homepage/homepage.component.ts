import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';
@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  public dataSource = {
    datasets: [
      {
          data: [100, 400, 50],
          backgroundColor: [
               '#ffcd56',
               '#ff6384',
               '#36a2eb',
               '#fd6b19',
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(75, 192, 192, 0.6)',
               'rgba(153, 102, 255, 0.6)',
          ],
          borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 99, 132, 1)'
          ],
          borderWidth : 1
      }
  ],
  labels : [
      'Grocery', 'Rent', 'Utilities'
  ]
  };
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {
      debugger;
      console.log(res);
      for (let  i = 0; i < res.myBudget.length; i++){
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
    }
    this.createChart();
    });
  }
  createChart(){
    //let ctx = document.getElementById('myChart').getContext("2d");
    let ctx = document.getElementById('myChart');
    let myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
    });
}

}
