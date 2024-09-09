import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaTiendasPage } from './lista-tiendas.page';

describe('ListaTiendasPage', () => {
  let component: ListaTiendasPage;
  let fixture: ComponentFixture<ListaTiendasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTiendasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
