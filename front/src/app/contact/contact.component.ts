import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesModule } from 'primeng/messages';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    MessagesModule
  ],
   templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitted = false;
  success=   [{ severity: 'success', summary: 'Succès', detail: 'Demande de contact envoyée avec succès' }];
  invalidEmail=   [{ severity: 'error', summary: 'Invalid', detail: ' Un email valide est requis.' }];
  invalidMessage=   [{ severity: 'error', summary: 'Invalid', detail: '  Le message doit être rempli et contenir moins de 300 caractères.' }];
  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.maxLength(300)]]
    });
  }

  get email() {
    return this.contactForm.get('email');
  }

  get message() {
    return this.contactForm.get('message');
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.contactForm.valid) {
      const email = this.email?.value;
      const message = this.message?.value;

      if (email && message) {
        console.log('Formulaire envoyé', { email, message });
        // Envoyer les données ici (API ou autre traitement)
      }
    }
  }
}