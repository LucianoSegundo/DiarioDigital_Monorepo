import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConteudoCapituloComponent } from './conteudo-capitulo.component';

describe('ConteudoCapituloComponent', () => {
  let component: ConteudoCapituloComponent;
  let fixture: ComponentFixture<ConteudoCapituloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConteudoCapituloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConteudoCapituloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
