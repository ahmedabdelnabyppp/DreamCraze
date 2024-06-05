import { Component } from '@angular/core';
import { routingAnimation } from '../../../shared/animations/opacityAnimation';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  animations: [routingAnimation]
})
export class DashboardComponent {

}
