import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCollecteComponent } from './data-collecte.component';

describe('DataCollecteComponent', () => {
  let component: DataCollecteComponent;
  let fixture: ComponentFixture<DataCollecteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataCollecteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataCollecteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
