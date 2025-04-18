import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandesDetailsComponent } from './demandes-details.component';

describe('DemandesDetailsComponent', () => {
  let component: DemandesDetailsComponent;
  let fixture: ComponentFixture<DemandesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandesDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemandesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
