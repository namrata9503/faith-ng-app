import { Component, ViewChild, OnInit, OnDestroy , HostListener, Inject , ElementRef } from '@angular/core';
import { map, filter, scan } from 'rxjs/operators';



import {} from 'googlemaps';
import { NgwWowService } from 'ngx-wow';
import { Subscription }   from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import * as AOS from 'aos';

import { DOCUMENT } from '@angular/common';

import { trigger, state, transition, style, animate } from '@angular/animations';  

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent implements OnInit {
  title = 'faith';

  constructor(){
   


  }
  
  
ngOnInit() {
  
}

  
}
