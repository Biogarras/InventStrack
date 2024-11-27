import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerTiendasPage } from './ver-tiendas.page';

describe('VerTiendasPage', () => {
  let component: VerTiendasPage;
  let fixture: ComponentFixture<VerTiendasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerTiendasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
