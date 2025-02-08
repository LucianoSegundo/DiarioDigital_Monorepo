import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaRecuperarComponent } from './tela-recuperar.component';

describe('TelaRecuperarComponent', () => {
  let component: TelaRecuperarComponent;
  let fixture: ComponentFixture<TelaRecuperarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaRecuperarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaRecuperarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
