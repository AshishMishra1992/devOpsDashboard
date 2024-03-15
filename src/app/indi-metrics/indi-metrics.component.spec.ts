import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndiMetricsComponent } from './indi-metrics.component';

describe('IndiMetricsComponent', () => {
  let component: IndiMetricsComponent;
  let fixture: ComponentFixture<IndiMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndiMetricsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndiMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
