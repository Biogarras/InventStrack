import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventariosPendientesPage } from './inventarios-pendientes.page';

describe('InventariosPendientesPage', () => {
  let component: InventariosPendientesPage;
  let fixture: ComponentFixture<InventariosPendientesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InventariosPendientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
