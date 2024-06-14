import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BudgetService } from '../services/budget.service';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent {
  formularioPanel: FormGroup;
  costeExtra: number = 0;

  constructor(private fb: FormBuilder, private budgetService: BudgetService) {
    this.formularioPanel = this.fb.group({
      paginas: [1, [Validators.required, Validators.min(1)]],
      idiomas: [1, [Validators.required, Validators.min(1)]]
    });
    //this.formularioPanel.get('paginas')?.valueChanges.subscribe(values =>{
     //this.costeExtra = this.calcularPresupuesto();
    //});
  }

  calcularPresupuesto(){
    const { paginas, idiomas } = this.formularioPanel.value;
    if(this.formularioPanel.valid){
      this.costeExtra = this.budgetService.calcularCoste(paginas, idiomas)
    }
  }

  validaciones() {
    if(this.formularioPanel.invalid){
      return 
    }
  }

  sumar(campo: string) {
    const valorInput = this.formularioPanel.get(campo);
    if (valorInput) {
      valorInput.setValue(valorInput.value + 1);
    }
    
    
    //let valorActual = this.formularioPanel.get(campo)?.value;
    //console.log("Valor actual suma: ", valorActual);
    //this.formularioPanel.get(campo)?.setValue(valorActual + 1);    
    
    
    //valorActual += 1;
    //this.formularioPanel.get('numPaginas')?.setValue(valorActual); 
  }

  restar(campo: string) {
    let valorInput = this.formularioPanel.get(campo);
    if (valorInput) {
      valorInput.setValue(valorInput.value - 1);
    }   
  }
}
