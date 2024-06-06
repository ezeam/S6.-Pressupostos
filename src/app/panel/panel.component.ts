import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent {
  formularioPanel: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formularioPanel = this.fb.group({
      numPaginas: 1,
      numIdiomas: 1
    });
  }

  sumarPaginas() {
    let numPaginas = this.formularioPanel.get('numPaginas')?.value;
      console.log("Número de páginas", numPaginas);
          
      numPaginas += 1;
      this.formularioPanel.get('numPaginas')?.setValue(numPaginas); 
  }

  restarPaginas() {
    let numPaginas = this.formularioPanel.get('numPaginas')?.value;
    console.log("Número de páginas", numPaginas);
    if(numPaginas > 1){
      numPaginas -= 1;
      this.formularioPanel.get('numPaginas')?.setValue(numPaginas);
    }
    else {
      alert("No puede haber menos de 1 página")
    }    
  }

  sumarIdiomas() {
    let numIdiomas = this.formularioPanel.get('numIdiomas')?.value;
      console.log("Número de idiomas", numIdiomas);          
      numIdiomas += 1;
      this.formularioPanel.get('numIdiomas')?.setValue(numIdiomas);
  }

  restarIdiomas() {
    
    let numIdiomas = this.formularioPanel.get('numIdiomas')?.value;
    console.log("Número de idiomas", numIdiomas);
    if(numIdiomas > 1){
      numIdiomas -= 1;
      this.formularioPanel.get('numIdiomas')?.setValue(numIdiomas);
    }
    else {
      alert("No puede haber menos de 1 idioma")
    }
  }
}
