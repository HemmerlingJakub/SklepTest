import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  selector: 'app-regulations',
  styleUrl: './regulations.css',
  templateUrl: './regulations.html',
})
export class Regulations {
  private readonly router = inject(Router);

  SkipTo(): void {
    this.router.navigate(['/400']);
  }
}
