import { Component, Input, OnInit } from '@angular/core';
import { Car } from '../models/Car';

@Component({
  selector: 'app-listing-card',
  templateUrl: './listing-card.component.html',
  styleUrls: ['./listing-card.component.scss']
})
export class ListingCardComponent implements OnInit {
  @Input() car!: Car

  constructor() { }

  ngOnInit(): void {
  }

  addToFavorites(carId: string = '') {
    console.log(carId);
  }

}
