import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleseChartComponent } from './relese-chart.component';

describe('ReleseChartComponent', () => {
  let component: ReleseChartComponent;
  let fixture: ComponentFixture<ReleseChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReleseChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReleseChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
