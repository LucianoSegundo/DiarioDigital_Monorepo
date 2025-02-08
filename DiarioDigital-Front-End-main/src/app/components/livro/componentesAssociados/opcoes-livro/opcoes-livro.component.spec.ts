import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcoesLivroComponent } from './opcoes-livro.component';

describe('OpcoesLivroComponent', () => {
  let component: OpcoesLivroComponent;
  let fixture: ComponentFixture<OpcoesLivroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpcoesLivroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpcoesLivroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
