import { Routes } from '@angular/router';

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

export const UiElementsRoutes: Routes = [{
  path: '',
  children: [{
    path: 'buttons',
    component: ButtonsComponent
  },{
    path: 'progressbar',
    component: ProgressBarComponent
  },{
    path: 'tabs',
    component: TabsComponent
  },{
    path: 'accordions',
    component: AccordionsComponent
  },{
    path: 'tabs',
    component: TabsComponent
  },{
    path: 'pagination',
    component: PaginationComponent
  },{
    path: 'tooltip',
    component: TooltipComponent
  },{
    path: 'cards',
    component: CardsComponent
  },{
    path: 'social-icons',
    component: SocialIconsComponent
  },{
    path: 'typography',
    component: TypographyComponent
  },{
    path: 'badges',
    component: BadgesComponent
  },{
    path: 'dropdown',
    component: DropdownComponent
  },{
    path: 'alert',
    component: AlertComponent
  },{
    path: 'carousel',
    component: CarouselComponent
  },{
    path: 'datepicker',
    component: DatepickerComponent
  }]
}];
