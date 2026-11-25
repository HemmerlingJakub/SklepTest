import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { LocalHttpSimulationService } from '../../core/services/local-http-simulation.service';


@Component({
  imports: [RouterModule, FormsModule, MatSnackBarModule],
  selector: 'app-contact',
  styleUrl: './contact.css',
  templateUrl: './contact.html',
})
export class Contact {
  private readonly snackBar = inject(MatSnackBar);
  private readonly httpSimulation = inject(LocalHttpSimulationService);

  contact = {
    name: '',
    email: '',
    phone: '',
    message: '',
  };

  sendMessage(): void {
    if (
      this.contact.name.trim() === '' ||
      this.contact.email.trim() === '' ||
      this.contact.message.trim() === ''
    ) {
      this.snackBar.open(
        'Please fill in your name, email, and message.',
        'OK',
        {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
        },
      );
      return;
    }

    this.httpSimulation.simulate('INCORRECT_CONTACT').subscribe({
      next: () => {
        this.snackBar.open(
          'We will review your issue and get back to you as soon as possible.',
          'OK',
          {
            duration: 4000,
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
          },
        );
      },
      error: () => {},
    })
  }
}
