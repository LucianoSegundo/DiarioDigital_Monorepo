import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarCapituloComponent } from './criar-capitulo.component';

describe('CriarCapituloComponent', () => {
  let component: CriarCapituloComponent;
  let fixture: ComponentFixture<CriarCapituloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarCapituloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarCapituloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
