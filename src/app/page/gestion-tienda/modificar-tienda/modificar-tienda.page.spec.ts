import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarTiendaPage } from './modificar-tienda.page';

describe('ModificarTiendaPage', () => {
  let component: ModificarTiendaPage;
  let fixture: ComponentFixture<ModificarTiendaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarTiendaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
