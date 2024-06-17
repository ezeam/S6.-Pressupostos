import { ChangeDetectorRef, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BudgetService } from '../services/budget.service';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-panel',
    standalone: true,
    templateUrl: './panel.component.html',
    styleUrl: './panel.component.css',
    imports: [ReactiveFormsModule, ModalComponent, CommonModule]
})
export class PanelComponent {
  formularioPanel: FormGroup;
  @Output() cambioCoste = new EventEmitter<number>();
  @ViewChild('modalComponent') modalComponent?: ModalComponent;
 

  constructor(private fb: FormBuilder, private budgetService: BudgetService, private cdr: ChangeDetectorRef) {
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

  /*abrirModal():void {
    console.log("¿Entras al abrir?");
    this.modalVisible = true;
  }

  cerrarModal():void {
    console.log("¿Entras al cerrar?");
    this.modalVisible = false;
  }*/

    abrirModal() {
      console.log("Entras en el abrir modal del panel?");
      this.modalComponent?.abrirModal('Número de páginas', 'Añade las páginas que tendrá tu proyecto. El coste de cada página extra es de 30€');
    }
}


