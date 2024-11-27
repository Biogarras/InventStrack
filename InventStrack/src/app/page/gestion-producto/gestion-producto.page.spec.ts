import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionProductoPage } from './gestion-producto.page';

describe('GestionProductoPage', () => {
  let component: GestionProductoPage;
  let fixture: ComponentFixture<GestionProductoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
