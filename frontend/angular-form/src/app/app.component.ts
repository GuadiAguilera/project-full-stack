import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { FormChildComponent } from './form-child/form-child.component';
import { toSignal } from '@angular/core/rxjs-interop';

export interface ItemForm {
  id: FormControl<number>;
  name: FormControl<string>;
  value: FormControl<number>;
}

export type CustomFormGroup = FormGroup<ItemForm>;
@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, FormChildComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // form: FormGroup<{items: FormArray<CustomFormGroup>}>;

  fb = inject(NonNullableFormBuilder); // sirve para indicarle a angular que cuando haga un reset del formulario no se queden las cosas en null sino que va a volver a agregarse el valor por defecto. 
  // constructor(private fb: FormBuilder) {
  //   this.form = fb.group({
  //     items: fb.array<CustomFormGroup>([]),
  //   });
  // }

  form: FormGroup<{items: FormArray<CustomFormGroup>}> = this.fb.group({
    items: this.fb.array<CustomFormGroup>([]),
  });

  items = signal(this.form.controls.items.controls);

  // totalValue = computed(()=> {
  //   const value = this.items().reduce((total,formGroup)=>total + formGroup.controls.value.value,0);
  //   console.log('Calculando total value:', value);
  //   return value;
  // })

  constructor() {
    effect(() => {
      this.form.controls.items.valueChanges.subscribe(() =>
      this.items.set([... this.form.controls.items.controls])); // para que cada vez que cambie el valor del formulario se actualice la señal
    });
  }
// ---------------------------------
  getItems(){
    return this.form.controls.items;
  }
  itemChanges = toSignal(this.form.valueChanges); // El toSignal transforma un observable a una señal y cuando se emitan valores por el observable automaticamente se obtienen los cambios

  totalValue = computed(() => {
    const value = this.itemChanges()?.items?.reduce((total, item) => total + (Number(item?.value) || 0), 0);
    return value;
  });
  addItem() {
    const id = this.items.length + 1;
    const itemForm = this.fb.group<ItemForm>({
      id: this.fb.control(id),
      name: this.fb.control('',{validators : [Validators.required]}),
      value: this.fb.control(0,{validators : [Validators.required]}),
    });

    this.form.controls.items.push(itemForm); // lo agrega a los controles
    this.items.set([...this.form.controls.items.controls]); // lo agrega a la señal y actualiza toda la señal
  }



// -------------------  
  // addItem() {
  //   const id = this.items().length + 1;

  //   const itemForm = this.fb.group<ItemForm>({
  //     id: this.fb.control(id),
  //     name: this.fb.control('',{validators : [Validators.required]}),
  //     value: this.fb.control(0,{validators : [Validators.required]}),
  //   });

  //   this.form.controls.items.push(itemForm); // lo agrega a los controles

  //   this.items.set([...this.form.controls.items.controls]); // lo agrega a la señal y actualiza toda la señal
  // }
}
