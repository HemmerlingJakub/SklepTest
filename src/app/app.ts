import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LocalHttpSimulationService } from './core/services/local-http-simulation.service';

@Component({
  imports: [RouterLink, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  private readonly httpSimulation = inject(LocalHttpSimulationService);
  Loading = 0

  ngOnInit(): void {
    this.LoadPage();
  }

  LoadPage() : void {
    this.httpSimulation.simulate('LOADING_PAGE').subscribe({
      next: () => {
        this.Loading = 0
      },

      error: () => {
        this.Loading = 1
      }
    })
  }
}
