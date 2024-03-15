import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
// import { Chart } from 'chart.js';
import Chart from 'chart.js/auto';
import readXlsxFile from 'read-excel-file'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})


export class DashboardComponent implements OnInit {
  deploymentData: any;
  chart: any = [];
  linechart: any;
  changeChart: any;
  buildCountChart: any;
  deploymentCycleChart: any;
  releaseCharts: any;
  incidentData: any;
  changeData: any;
  mttr: any;
  otat: any;
  getHighLeadTime: any = [];
  getLowLeadTime: any = [];

  constructor( private router: Router  ) {}

  async ngOnInit() {
    await fetch('../../assets/data/deployments.xlsx')
      .then(response => response.blob())
      .then(blob => readXlsxFile(blob))
      .then((rows) => {
        this.deploymentData = rows;
      })

    await fetch('../../assets/data/incidents.xlsx')
      .then(response => response.blob())
      .then(blob => readXlsxFile(blob))
      .then((rows) => {
        this.incidentData = rows;
      })

    await fetch('../../assets/data/change_request.xlsx')
      .then(response => response.blob())
      .then(blob => readXlsxFile(blob))
      .then((rows) => {
        this.changeData = rows;
      })

    this.getDeploymentChart()
    this.getWeeklyDeployment()
    this.getTypeOfChanges()
    this.buildCount()
    this.DeploymentCycle()
    this.releaseChart()
    this.getMttrOtat()
    this.getLeadTime()
  }

  updateRange() {

  }

  navigate(){
    this.router.navigate(['metrics'])
  }
  async getMttrOtat() {
    this.mttr = 0;
    this.otat = 0;
    let mttrtempCount = 0
    let otatCount = 0;
    await this.incidentData.forEach((element: any) => {
      if (typeof (element[21]) == 'number') {
        this.mttr = this.mttr + element[21]
        mttrtempCount = mttrtempCount + 1;
      }
      if (typeof (element[22]) == 'number') {
        this.otat = this.otat + element[22]
        otatCount = otatCount + 1;
      }
    });
    this.mttr = Math.round(this.mttr / mttrtempCount)
    this.otat = Math.round(this.otat / otatCount)
  }

  async getLeadTime() {
    this.getHighLeadTime = []
    this.getLowLeadTime = []
    this.deploymentData.splice(0, 1);
    console.log('deploymentList '+this.deploymentData)
    await this.deploymentData.forEach((element: any, index: any) => {
      if (typeof (element[22]) == 'number') {
        this.deploymentData.splice(index, 1);
      }
    });
    await this.deploymentData.sort((a: any, b: any) => {
      a[24] - b[24];
    });
    for (let i = 0; i < 10; i++) {
      this.getHighLeadTime.push(this.deploymentData[i])
    }
    for (let i = 1; i < 11; i++) {
      this.getLowLeadTime.push(this.deploymentData[this.deploymentData.length - i])
    }
    console.log("sasd " + this.getHighLeadTime)
    console.log("saasdasdassd " + this.getLowLeadTime)
  }

  async getDeploymentChart() {
    let tempData = [0, 0, 0]
    await this.deploymentData.forEach((element: string[]) => {
      if (element[15] == "hsp") {
        tempData[0] = tempData[0] + 1
      } else if (element[15] == "on") {
        tempData[1] = tempData[1] + 1
      } else if (element[15] == "off") {
        tempData[2] = tempData[2] + 1
      }
    });
    console.log(tempData)

    this.chart = new Chart('typeOfdeployment', {
      type: 'pie',
      data: {
        datasets: [{
          data: tempData
        }],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
          'HSP : ' + tempData[0],
          'On : ' + tempData[1],
          'off : ' + tempData[2],
          'Total : ' + (tempData[0] + tempData[1] + tempData[2])
        ]
      },
      options: {
        aspectRatio: 1.75,
        animation: {
          animateRotate: true
        },
      }
    });
  }

  getWeeklyDeployment() {
    this.linechart = new Chart("weeklyUpdate", {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: "M&O",
            data: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderWidth: 2,
            pointBackgroundColor: 'rgb(255, 99, 132)',
          },
          {
            label: "PVS",
            data: [10, 20, 30, 40, 50, 60, 20, 15, 10, 5, 8],
            borderColor: 'rgb(99, 111 ,255)',
            backgroundColor: 'rgba(99, 111, 255, 0.2)',
            borderWidth: 2,
            pointBackgroundColor: 'rgb(99, 111, 255)',
          },
          {
            label: "SVS",
            data: [14, 25, 56, 76, 85, 23, 87, 13, 12, 90, 100, 124],
            borderColor: 'rgb(53, 169, 96)',
            backgroundColor: 'rgba(53, 169, 96, 0.2)',
            borderWidth: 2,
            pointBackgroundColor: 'rgb(53, 169, 96)',
          },
          {
            label: "JVS",
            data: [45, 21, 54, 87, 64, 23, 89, 56, 12, 44, 90, 98],
            borderColor: 'rgb(206, 74, 43)',
            backgroundColor: 'rgba(206, 74, 43, 0.2)',
            borderWidth: 2,
            pointBackgroundColor: 'rgb(206, 74, 43)',
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
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

  //done
  async getTypeOfChanges() {
    let tempData = [0, 0, 0, 0]
    await this.changeData.forEach((element: string[]) => {
      if (element[14] == "distributed") {
        tempData[0] = tempData[0] + 1
      } else if (element[14] == "host") {
        tempData[1] = tempData[1] + 1
      } else if (element[14] == "DB") {
        tempData[2] = tempData[2] + 1
      } else if (element[14] == "Manual") {
        tempData[3] = tempData[3] + 1
      }
    });
    this.changeChart = new Chart('typeOfChange', {
      type: 'pie',
      data: {
        datasets: [{
          data: tempData
        }],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
          'Distributed',
          'Host',
          'DB',
          'Manual'
        ]
      },
      options: {
        aspectRatio: 2.5,
        animation: {
          animateRotate: true
        },
      }
    });
  }

  //done, no of build happening across env's
  async buildCount() {
    let tempData = [0, 0, 0, 0]
    await this.deploymentData.forEach((element: string[]) => {
      if (element[3] == "uat") {
        tempData[0] = tempData[0] + 1
      } else if (element[3] == "test") {
        tempData[1] = tempData[1] + 1
      } else if (element[3] == "model_office") {
        tempData[2] = tempData[2] + 1
      } else if (element[3] == "production") {
        tempData[3] = tempData[3] + 1
      }
    });
    this.buildCountChart = new Chart("buildCount", {
      type: 'bar',
      data: {
        labels: ['UAT', 'TEST', 'MO', 'PROD'],
        datasets: [
          {
            label: 'No of Build Happening Across Environment',
            data: tempData,
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

  async DeploymentCycle() {
     this.deploymentCycleChart = new Chart("deploymentCycle", {
      type: 'bar',
      data: {
        labels: ['UAT', 'DEV', 'PROD'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3],
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
