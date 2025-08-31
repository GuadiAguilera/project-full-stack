import { Component, effect, input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  imports: [ReactiveFormsModule],
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.css',
  providers: [{ // Con esto se permite utilizar un componente y decir que para nosotros este componente se va a comportar como un acceso del formulario, como un input mas
    provide: NG_VALUE_ACCESSOR,
    useExisting: CustomInputComponent,
    multi: true // PORQUE PUEDE TENER MAS DE UN ELEMENTO, MAS DE UNA INSTANCIA
  }]
})
export class CustomInputComponent implements ControlValueAccessor{
  control = input.required<FormControl<any>>();

  onTouched = () => {};

  onChange = (value: any) => {};

  // CON EL ULTIMO CAMBIO EN APP-COMPONENT NO HACE FALTA ESTA SINCRONIZACION
  // constructor() {
  //   effect(() => {
  //     const currentSignalValue = this.control().value;

  //     if (this.control().dirty || this.control().touched) {
  //       const newValue = this.control().value;

  //       if (newValue !== currentSignalValue) {
  //         this.onChange(newValue);
  //       }
  //     }
  //   });
  // }

  writeValue(value: any): void {
    // writeValue -> cuando se escriba en un input tiene que escribir en el control
    // se crea un input y se va a utilizar ese input como un ControlValueAccessor (simulando que se esta en un control de un formulario) y cuando alguien escriba alli va a escribir en el control que le estamos indicando
    // si el valor que se coloca es igual al que ya esta, no cambia nada, es IMPORTANTE porque sino entra en un ciclo INFINITO
    if (value !== this.control().value) {
      this.control().setValue(value, { emitEvent: false }); // emitEvent: false para que no haya cambios
    }
  }

  registerOnChange(fn: any): void { // registra un cambio proveniente del ControlValueAccesor
      this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
      this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
      isDisabled ? this.control().disable() : this.control().enable();
  }

}
