import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartographieStockageComponent } from './cartographie-stockage.component';

describe('CartographieStockageComponent', () => {
  let component: CartographieStockageComponent;
  let fixture: ComponentFixture<CartographieStockageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartographieStockageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartographieStockageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
