import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagasinDetailsComponent } from './magasin-details.component';

describe('MagasinDetailsComponent', () => {
  let component: MagasinDetailsComponent;
  let fixture: ComponentFixture<MagasinDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagasinDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MagasinDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
