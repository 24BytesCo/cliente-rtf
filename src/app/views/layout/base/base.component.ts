import { Component, OnInit } from '@angular/core';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { LoaderService } from '../../../core/loader.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  isLoading: boolean = false;

  constructor(private router: Router, private loadinService: LoaderService) {
    this.loadinService.loading$.subscribe(

      r=>{
        console.log("r => ", r);

        this.isLoading = r;
      }
    );




  }

  ngOnInit(): void {
  }

}
