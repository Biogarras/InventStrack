import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EliminarTiendaPage } from './eliminar-tienda.page';

describe('EliminarTiendaPage', () => {
  let component: EliminarTiendaPage;
  let fixture: ComponentFixture<EliminarTiendaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarTiendaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
