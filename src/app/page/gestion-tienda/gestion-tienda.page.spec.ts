import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionTiendaPage } from './gestion-tienda.page';

describe('GestionTiendaPage', () => {
  let component: GestionTiendaPage;
  let fixture: ComponentFixture<GestionTiendaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionTiendaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
