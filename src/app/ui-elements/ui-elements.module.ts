import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

import { ButtonsComponent }   from './buttons/buttons.component';
import { ProgressBarComponent }   from './progress-bar/progress-bar.component';
import { TabsComponent }   from './tabs/tabs.component';
import { AccordionsComponent }   from './accordions/accordions.component';
import { PaginationComponent }   from './pagination/pagination.component';
import { TooltipComponent }   from './tooltip/tooltip.component';
import { CardsComponent }   from './cards/cards.component';
import { SocialIconsComponent }   from './social-icons/social-icons.component';
import { TypographyComponent }   from './typography/typography.component';
import { BadgesComponent }   from './badges/badges.component';
import { DropdownComponent }   from './dropdown/dropdown.component';
import { AlertComponent }   from './alert/alert.component';
import { CarouselComponent }   from './carousel/carousel.component';
import { DatepickerComponent }   from './datepicker/datepicker.component';

import { UiElementsRoutes } from './ui-elements.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMyDatePickerModule,
    RouterModule.forChild(UiElementsRoutes)
  ],
  declarations: [ 
    ButtonsComponent,
    ProgressBarComponent,
    TabsComponent,
    AccordionsComponent,
    PaginationComponent,
    TooltipComponent,
    CardsComponent,
    SocialIconsComponent,
    TypographyComponent,
    BadgesComponent,
    DropdownComponent,
    AlertComponent,
    CarouselComponent,
    DatepickerComponent,
  ]
})

export class UiElementsModule {}
