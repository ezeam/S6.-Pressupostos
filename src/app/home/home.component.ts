import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { PanelComponent } from '../panel/panel.component';
import { BudgetService } from '../services/budget.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, PanelComponent],
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
  }

  actualizarPrecioTotal(coste: number): void {
    console.log("Precio total al entrar: ", this.precioTotal);
    console.log("Precio parcial al entrar: ", this.precioParcial);
    console.log("Coste que llega del panel: ", coste)
    this.precioTotal = this.precioParcial;
    console.log("Precio total al que se le ha asignado el precio parcial: ", this.precioTotal);
    this.precioTotal = this.precioTotal + coste;
    console.log("Precio total final: ", this.precioTotal);
  }

  
}



