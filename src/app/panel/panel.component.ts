import { Component, EventEmitter, Output } from '@angular/core';
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
  @Output() cambioCoste = new EventEmitter<number>();

  constructor(private fb: FormBuilder, private budgetService: BudgetService) {
    this.formularioPanel = this.fb.group({
      paginas: [1, [Validators.required, Validators.min(1)]],
      idiomas: [1, [Validators.required, Validators.min(1)]]
    });
  }

  calcularCoste(): void {
    const numPaginas = this.formularioPanel.get('paginas')?.value || 1;
    const numIdiomas = this.formularioPanel.get('idiomas')?.value || 1;
    const coste = this.budgetService.calcularCoste(numPaginas, numIdiomas);
    this.cambioCoste.emit(coste);
  }

  sumar(campo: string): void {
    const valorInput = this.formularioPanel.get(campo);
    if (valorInput) {
      valorInput.setValue(valorInput.value + 1);
      this.calcularCoste();
    } 
  }

  restar(campo: string): void {
    const valorInput = this.formularioPanel.get(campo);
    if (valorInput) {
      valorInput.setValue(valorInput.value - 1);
      if(valorInput.value < 0){
        valorInput.setValue(1);
      }
      this.calcularCoste();
    }   
  }
}
