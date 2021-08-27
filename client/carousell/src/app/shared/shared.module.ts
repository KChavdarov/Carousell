import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MaterialModule } from '../material/material.module';
import { ListingCardComponent } from './listing-card/listing-card.component';
import { ShortenPipe } from './pipes/shorten.pipe';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ConfirmationDialogComponent,
    ListingCardComponent,
    ShortenPipe,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [
    ShortenPipe,
    ListingCardComponent,
    ConfirmationDialogComponent,
    ListingCardComponent,
  ]
})
export class SharedModule {}
