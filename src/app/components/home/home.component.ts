import { Component, OnInit } from '@angular/core';
import {EventsService} from '../../services/eventServices/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private eventService: EventsService) { }

  ngOnInit() {
    this.listenToChildEvent();
  }
  public updateChildDom (e) {
    // console.log('DOM CLICKED', e);
    this.eventService.broadcast('USER_CLICK_ON_DOM');
  }

  public listenToChildEvent() {
    this.eventService.on('SEARCH_INITIATED', () => {
      console.log('Searching...');
    });
  }
}
