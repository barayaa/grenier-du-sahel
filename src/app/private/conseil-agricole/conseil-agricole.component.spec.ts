import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConseilAgricoleComponent } from './conseil-agricole.component';

describe('ConseilAgricoleComponent', () => {
  let component: ConseilAgricoleComponent;
  let fixture: ComponentFixture<ConseilAgricoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConseilAgricoleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConseilAgricoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
