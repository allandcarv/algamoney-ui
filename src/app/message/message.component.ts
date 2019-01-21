import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
    <small *ngIf="temErro()" class="ui-message ui-messages-error">
      {{ text }}
    </small>
  `,
  styles: [`
    .ui-messages-error {
      color: white;
      background-color: red;
      margin-top: 5px;
    }
  `]
})

export class MessageComponent {
  @Input() control: FormControl;
  @Input() error: string;
  @Input() text = 'Campo obrigatório';

  temErro(): boolean {
    return this.control.hasError(this.error) && this.control.dirty;
  }
}
