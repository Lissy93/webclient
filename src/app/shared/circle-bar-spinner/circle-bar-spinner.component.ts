import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-circle-bar-spinner',
  templateUrl: './circle-bar-spinner.component.html',
  styleUrls: ['./circle-bar-spinner.component.scss']
})
export class CircleBarSpinnerComponent implements OnInit {

  @Input() showSpinner: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
