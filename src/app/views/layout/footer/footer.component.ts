import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  fullYear: string;
  constructor() {
    this.fullYear = new Date().getFullYear().toString();

  }

  ngOnInit(): void {
  }

}
