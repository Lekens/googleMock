import {IRouting} from './interfaces/irouting';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {EventsService} from './services/eventServices/event.service';

const landingRoutes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: '**', component: HomeComponent},
];

export const landingRouting: IRouting = {
  routes: RouterModule.forRoot(landingRoutes, {useHash: false}),
  components: [
    HomeComponent
  ],
  entryComponent: [],
  providers: [EventsService]
};

