import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from './animation/star-rating/star-rating.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { HotelMapComponent } from './animation/hotel-map/hotel-map.component';
import {AgmCoreModule} from '@agm/core';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [StarRatingComponent, HotelMapComponent, AutocompleteComponent],
    imports: [
        CommonModule,
        MatTooltipModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        AgmCoreModule,
        FormsModule
    ],
    exports: [
        StarRatingComponent,
        HotelMapComponent,
        AutocompleteComponent
    ],
})
export class SharedModule { }
