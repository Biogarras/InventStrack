import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallesTiendasPage } from './detalles-tiendas.page';

describe('DetallesTiendasPage', () => {
  let component: DetallesTiendasPage;
  let fixture: ComponentFixture<DetallesTiendasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesTiendasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
