import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RealizarInventarioPage } from './realizar-inventario.page';

describe('RealizarInventarioPage', () => {
  let component: RealizarInventarioPage;
  let fixture: ComponentFixture<RealizarInventarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RealizarInventarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
