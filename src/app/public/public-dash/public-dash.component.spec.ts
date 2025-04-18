import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicDashComponent } from './public-dash.component';

describe('PublicDashComponent', () => {
  let component: PublicDashComponent;
  let fixture: ComponentFixture<PublicDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicDashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
