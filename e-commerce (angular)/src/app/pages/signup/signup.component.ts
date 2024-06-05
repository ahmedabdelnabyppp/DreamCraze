import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AnimationOpcity } from '../../shared/animations/opacityAnimation';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  animations: [AnimationOpcity]
})
export class SignupComponent implements OnInit, AfterViewInit {

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.cdr.detectChanges(); // Manually trigger change detection after view initialization
  }

}
