import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearinventarioPage } from './crearinventario.page';

describe('CrearinventarioPage', () => {
  let component: CrearinventarioPage;
  let fixture: ComponentFixture<CrearinventarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearinventarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
