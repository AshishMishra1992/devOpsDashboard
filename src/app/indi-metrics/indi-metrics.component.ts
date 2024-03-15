import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import readXlsxFile from 'read-excel-file'

@Component({
  selector: 'app-indi-metrics',
  standalone: true,
  imports: [],
  templateUrl: './indi-metrics.component.html',
  styleUrl: './indi-metrics.component.css'
})
export class IndiMetricsComponent implements OnInit {
  deploymentData: any;
  buildCountChartpersonal: any;
  buildCountChartClaim: any;
  buildCountChartBusiness: any;
  buildCountChartBond: any;

  async ngOnInit() {
    await fetch('../../assets/data/deployments.xlsx')
      .then(response => response.blob())
      .then(blob => readXlsxFile(blob))
      .then((rows) => {
        this.deploymentData = rows;
      })

    this.buildCount()
  }

  //done, no of build happening across env's
  async buildCount() {
    let tempDatapersonal = [0, 0, 0, 0]
    let tempDataClaim = [0, 0, 0, 0]
    let tempDataBusiness = [0, 0, 0, 0]
    let tempDataBond = [0, 0, 0, 0]
    await this.deploymentData.forEach((element: string[]) => {
      switch (element[2]) {
        case "personal_insurance":
          if (element[3] == "uat") {
            tempDatapersonal[0] = tempDatapersonal[0] + 1
          } else if (element[3] == "test") {
            tempDatapersonal[1] = tempDatapersonal[1] + 1
          } else if (element[3] == "model_office") {
            tempDatapersonal[2] = tempDatapersonal[2] + 1
          } else if (element[3] == "production") {
            tempDatapersonal[3] = tempDatapersonal[3] + 1
          }
          break;
        case "claims":
          if (element[3] == "uat") {
            tempDataClaim[0] = tempDataClaim[0] + 1
          } else if (element[3] == "test") {
            tempDataClaim[1] = tempDataClaim[1] + 1
          } else if (element[3] == "model_office") {
            tempDataClaim[2] = tempDataClaim[2] + 1
          } else if (element[3] == "production") {
            tempDataClaim[3] = tempDataClaim[3] + 1
          }
          break;
        case "business_insurance":
          if (element[3] == "uat") {
            tempDataBusiness[0] = tempDataBusiness[0] + 1
          } else if (element[3] == "test") {
            tempDataBusiness[1] = tempDataBusiness[1] + 1
          } else if (element[3] == "model_office") {
            tempDataBusiness[2] = tempDataBusiness[2] + 1
          } else if (element[3] == "production") {
            tempDataBusiness[3] = tempDataBusiness[3] + 1
          }
          break;
        case "bond":
          if (element[3] == "uat") {
            tempDataBond[0] = tempDataBond[0] + 1
          } else if (element[3] == "test") {
            tempDataBond[1] = tempDataBond[1] + 1
          } else if (element[3] == "model_office") {
            tempDataBond[2] = tempDataBond[2] + 1
          } else if (element[3] == "production") {
            tempDataBond[3] = tempDataBond[3] + 1
          }
          break;
        default:
          break;
      }
    });

    this.buildCountChartpersonal = new Chart("buildCountpersonal", {
      type: 'bar',
      data: {
        labels: ['UAT', 'TEST', 'MO', 'PROD'],
        datasets: [
          {
            label: 'Deployment Across Env For Personal Insurance',
            data: tempDatapersonal,
            borderWidth: 1,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    this.buildCountChartClaim = new Chart("buildCountClaim", {
      type: 'bar',
      data: {
        labels: ['UAT', 'TEST', 'MO', 'PROD'],
        datasets: [
          {
            label: 'Deployment Across Env For Claim',
            data: tempDataClaim,
            borderWidth: 1,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    this.buildCountChartBusiness = new Chart("buildCountbusiness", {
      type: 'bar',
      data: {
        labels: ['UAT', 'TEST', 'MO', 'PROD'],
        datasets: [
          {
            label: 'Deployment Across Env For Business Insurance',
            data: tempDataBusiness,
            borderWidth: 1,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    this.buildCountChartBond = new Chart("buildCountBond", {
      type: 'bar',
      data: {
        labels: ['UAT', 'TEST', 'MO', 'PROD'],
        datasets: [
          {
            label: 'Deployment Across Env For Bond',
            data: tempDataBond,
            borderWidth: 1,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
