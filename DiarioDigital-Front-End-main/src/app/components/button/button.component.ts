import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input("mensagem") mensagem: string = '';
  @Input("imagem") imagem: string = '';
  @Input("classe") classe: string = '';
  @Input("desabilitado") desabilitado: boolean = false;
  @Output("submit") onSubmit = new EventEmitter();

  submit() {
    this.onSubmit.emit();
  }

}
