import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { routingAnimation } from '../shared/animations/opacityAnimation';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  animations: [routingAnimation]
})
export class AdminComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.cdr.detectChanges();
  }

}
