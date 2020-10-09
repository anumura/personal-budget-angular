import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Chart} from 'chart.js';
import * as d3 from 'd3';
import { DataService } from '../data.service';
@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  // --------------------------D3JS---------------------------------
  private k = -1;
  private mydata ;
  private svg;
  private margin = 50;
  private width = 750;
  private height = 600;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private innerradius = this.radius / 2 ;
  private colors;
  // --------------------------D3JS---------------------------------
  public dataSource = {
    datasets: [
      {
        data: [],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)', '#c7d3ec', 'rgba(255, 99, 132, 0.7)',
      'rgba(54, 162, 235, 0.6)', 'rgba(75, 192, 192, 0.6)', '#a5b8db', '#879cc4',
      '#ffcd56', '#ff6384', '#36a2eb', '#fd6b19', 'rgba(255, 99, 132, 0.7)',
      'rgba(54, 162, 235, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)',
      '#5a6782', '#fd6b19', '#ff6384', '#fd6b19', '#36a2eb'
        ]
      }
    ],
  labels : []
  };

  constructor(private http: HttpClient, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getChartData().subscribe((data) => {
      // console.log(data.myBudget.length);
      for (let  i = 0; i < data.myBudget.length; i++){
              this.dataSource.datasets[0].data[i] = data.myBudget[i].budget;
              this.dataSource.labels[i] = data.myBudget[i].title;
          }
      // console.log(data);
      this.createChart();
      this.createSvgForD3JS();
      this.createColorsForD3JS();
      console.log(this.colors);
      this.drawChartForD3JS(this.mydata);
    });
  }

  // tslint:disable-next-line: typedef
  createChart(){
    const ctx = document.getElementById('myChart');
    const myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
    });
  }

  // =====================================D3JS=================================
  private createSvgForD3JS(): void {
    this.svg = d3.select('#D3JSChart')
    .append('svg')
    .attr('width', this.width)
    .attr('height', this.height)
    .append('g')
    .attr(
      'transform',
      'translate(' + this.width / 2 + ',' + this.height / 2 + ')'
    );
}

  private createColorsForD3JS(): void {
    // console.log(this.dataSource);
    this.mydata = this.dataSource.labels.map((label) => {
      this.k++;
      return { label : label , value : this.dataSource.datasets[0].data[this.k] };
  });
    // console.log(this.mydata);
    this.colors = d3.scaleOrdinal()
    .domain(this.mydata)
    .range(['rgba(75, 192, 192, 0.6)', '#c7d3ec', 'rgba(255, 99, 132, 0.7)',
      'rgba(54, 162, 235, 0.6)', 'rgba(75, 192, 192, 0.6)', '#a5b8db', '#879cc4',
      '#ffcd56', '#ff6384', '#36a2eb', '#fd6b19', 'rgba(255, 99, 132, 0.7)',
      'rgba(54, 162, 235, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)',
      '#5a6782', '#fd6b19', '#ff6384', '#fd6b19', '#36a2eb']);
  }

  private drawChartForD3JS(data): void {
    console.log(data);

    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().value((d: any) => Number(d.value));
    const angleGen = d3.pie();
    const data1 = angleGen(this.dataSource.datasets[0].data);
    // console.log(data1);

    // Build the pie chart
    this.svg
    .selectAll('pieces')
    .data(pie(data1))
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(this.innerradius)
      .outerRadius(this.radius)
    )
    .attr('fill', (d, i) => (this.colors(i)))
    .attr('stroke', '#121926')
    .style('stroke-width', '1px');

    // Add labels
    const labelLocation = d3.arc()
    .innerRadius(this.innerradius)
    .outerRadius(this.radius);

    this.svg
    .selectAll('pieces')
    .data(pie(data))
    .enter()
    .append('text')
    .text(d => d.data.label)
    .attr('transform', d => 'translate(' + labelLocation.centroid(d) + ')')
    .style('text-anchor', 'middle')
    .style('font-size', 15);
  }
  // =====================================D3JS=================================
}
