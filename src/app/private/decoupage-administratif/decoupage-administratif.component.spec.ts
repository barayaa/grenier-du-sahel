import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoupageAdministratifComponent } from './decoupage-administratif.component';

describe('DecoupageAdministratifComponent', () => {
  let component: DecoupageAdministratifComponent;
  let fixture: ComponentFixture<DecoupageAdministratifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecoupageAdministratifComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DecoupageAdministratifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
