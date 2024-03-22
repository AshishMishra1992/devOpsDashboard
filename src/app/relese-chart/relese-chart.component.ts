import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import Chart from 'chart.js/auto';
import readXlsxFile from 'read-excel-file'


@Component({
  selector: 'app-relese-chart',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './relese-chart.component.html',
  styleUrl: './relese-chart.component.css'
})
export class ReleseChartComponent implements OnInit {
  deploymentData: any;
  releaseCharts: any;

  constructor( private router: Router  ) {}
  
  async ngOnInit() {
    await fetch('../../assets/data/deployments.xlsx')
    .then(response => response.blob())
    .then(blob => readXlsxFile(blob))
    .then((rows) => {
      this.deploymentData = rows;
    })
    this.releaseChart()
  }


    // No of prod deployment per LOB within selected range of time
    async releaseChart() {
      let tempData = [0, 0, 0, 0]
      await this.deploymentData.forEach((element: string[]) => {
        if (element[2] == "personal_insurance") {
          tempData[0] = tempData[0] + 1
        } else if (element[2] == "business_insurance") {
          tempData[1] = tempData[1] + 1
        } else if (element[2] == "bond") {
          tempData[2] = tempData[2] + 1
        } else if (element[2] == "claims") {
          tempData[3] = tempData[3] + 1
        }
      });
      this.releaseCharts = new Chart("releaseChart", {
        type: 'line',
        data: {
          labels: ['personal_insurance', 'business_insurance', 'bond', 'claims'],
          datasets: [
            {
              label: "Number Of Releases",
              data: tempData,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderWidth: 1,
              pointBackgroundColor: 'rgb(255, 99, 132)',
            }
          ]
        },
        options: {
          aspectRatio: 3,
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.1)',
              }
            },
            x: {
              grid: {
                color: 'rgba(0, 0, 0, 0.1)',
              }
            }
          },
          plugins: {
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              bodyFont: {
                size: 14,
              },
              titleFont: {
                size: 16,
                weight: 'bold',
              }
            },
            legend: {
              labels: {
                font: {
                  size: 14,
                }
              }
            }
            ,
          }
        }
      });
    }

}
