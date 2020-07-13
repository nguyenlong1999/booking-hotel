import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StarRatingComponent} from './animation/star-rating/star-rating.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {HotelMapComponent} from './animation/hotel-map/hotel-map.component';
import {AgmCoreModule} from '@agm/core';
import {AutocompleteComponent} from './autocomplete/autocomplete.component';
import {FormsModule} from '@angular/forms';
import {ImageComponent} from './animation/image/image.component';
import {FileUploadModule} from 'ng2-file-upload';
import {ScrollTopComponent} from './animation/scroll-top/scroll-top.component';
import {TooltipComponent} from './animation/tooltip/tooltip.component';
import {TooltipDirective} from './animation/tooltip/tooltip.directive';
import {TranslateModule} from '@ngx-translate/core';
import {TooltipImgPreviewComponent} from './animation/tooltip-img-preview/tooltip-img-preview.component';
import {TooltipImgPreviewDirective} from './animation/tooltip-img-preview/tooltip-img-preview.directive';


@NgModule({
    declarations: [StarRatingComponent, HotelMapComponent, AutocompleteComponent,
        ImageComponent, ScrollTopComponent, TooltipComponent, TooltipDirective, TooltipImgPreviewComponent, TooltipImgPreviewDirective],
    imports: [
        CommonModule,
        MatTooltipModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        AgmCoreModule,
        FormsModule,
        FileUploadModule,
        TranslateModule,
    ],
    exports: [
        StarRatingComponent,
        HotelMapComponent,
        AutocompleteComponent,
        ImageComponent,
        ScrollTopComponent,
        TooltipDirective,
        TooltipComponent,
        TooltipImgPreviewComponent,
        TooltipImgPreviewDirective
    ],
})
export class SharedModule {
}
