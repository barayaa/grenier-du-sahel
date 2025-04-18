import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcherInfoComponent } from './marcher-info.component';

describe('MarcherInfoComponent', () => {
  let component: MarcherInfoComponent;
  let fixture: ComponentFixture<MarcherInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarcherInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarcherInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
