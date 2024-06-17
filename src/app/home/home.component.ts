import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { PanelComponent } from '../panel/panel.component';
import { BudgetService } from '../services/budget.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, PanelComponent, ModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  precioSeo: number = 300;
  precioAds: number = 400;
  precioWeb: number = 500;
  precioTotal: number = 0;
  precioParcial: number = 0;
  formularioHome: FormGroup;

  constructor(private fb: FormBuilder, private budgetService: BudgetService) {
    this.formularioHome = this.fb.group({
      seo: [false],
      ads: [false],
      web: [false]
    });
  }

  onChangeSeo(event: Event): void {
    console.log("Evento que envia el html", event);
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      this.precioTotal += this.precioSeo;
    } else {
      this.precioTotal -= this.precioSeo;
    }
  }

  onChangeWeb(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      this.precioTotal += this.precioWeb;
    } else {
      this.precioTotal -= this.precioWeb;
    }
  }

  onChangeAds(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      this.precioTotal += this.precioAds;
    } else {
      this.precioTotal -= this.precioAds;
    }
  }

  private calcularPrecioParcial(): void {
    this.precioParcial = 0;

    if (this.formularioHome.get('seo')?.value) {
      this.precioParcial += this.precioSeo;
    }

    if (this.formularioHome.get('ads')?.value) {
      this.precioParcial += this.precioAds;
    }

    if (this.formularioHome.get('web')?.value) {
      this.precioParcial += this.precioWeb;
    }

    this.precioTotal = this.precioParcial;
    console.log("precioParcial al salir de la primera función: ", this.precioParcial);
  }

  actualizarPrecioTotal(coste: number): void {
    this.calcularPrecioParcial();
    this.precioTotal = this.precioParcial;
    this.precioTotal = this.precioTotal + coste;
  }

  
}



