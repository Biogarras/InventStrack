import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearTiendaPage } from './crear-tienda.page';

describe('CrearTiendaPage', () => {
  let component: CrearTiendaPage;
  let fixture: ComponentFixture<CrearTiendaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearTiendaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
