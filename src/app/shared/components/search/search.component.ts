import {Component, OnInit, ViewChild} from '@angular/core';
import {EventsService} from '../../../services/eventServices/event.service';
import data from '../../../DataStore/autoComplete';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild('searchInput') elementRef;
  public searchText: string;
  public matchedData: any[] = [];
  public dictionary: any[] = [];
  public alreadySearchedData: any[] = [];
  public loaders = {
    isTyping: false,
    startTyping: false,
    isDomShown: false
  };
  constructor(private eventService: EventsService) {  }

  ngOnInit() {
    this.listenToGlobalEvent();
  }
  public performSearch () {
    this.notifyDomOfThisClick();
    console.log('Search Text ', this.searchText, this.loaders.startTyping);
    if (!this.loaders.startTyping) {
      this.triggerShowDom();
      setTimeout(() => {
        if (this.elementRef) {
          this.elementRef.nativeElement.focus();
        }
      }, 1000);
    }
    this.displayAutoComplete();
  }
  public triggerShowDom() {
    this.loaders.startTyping = true;
    if (!this.searchText) {
      this.loaders.isDomShown = true;
    }
  }
  public updateDom() {
    if (!this.searchText) {
      setTimeout(() => {
        this.loaders.isDomShown = false;
      }, 3000);
    }
    // this.loaders.isDomShown = false;
  }
  public listenToGlobalEvent() {
    this.eventService.on('USER_CLICK_ON_DOM', () => {
      this.updateDom();
    });
  }
  private displayAutoComplete() {
    console.log('Auto complete ', data);
    this.matchedData = JSON.parse(JSON.stringify(data.data));
    this.matchedData.length = 7;
    if (this.alreadySearchedData.length > 3) {
      this.alreadySearchedData.length = 3;
    }
    if (this.searchText) {
      const deepCopy = JSON.parse(JSON.stringify(data.data));
      const matchedData = deepCopy.filter((copy) => {
        if (copy.text.toLowerCase().trim().match(this.searchText)
          || copy.description.toLowerCase().trim().match(this.searchText.toLowerCase().trim())) {
          return true;
        } else if (copy.text.toLowerCase().trim().includes(this.searchText)
          || copy.description.toLowerCase().trim().includes(this.searchText.toLowerCase().trim())) {
          return true;
        } else if (copy.text.toLowerCase().trim().split(' ').reverse().join(' ').includes(this.searchText)) {
          return true;
        } else {
          return false;
        }
          });
      console.log('Search Test ', matchedData);
      this.matchedData = matchedData;
      if (matchedData.length < 10) {
        console.log('Checking dictionary');
        this.proceedToCheckDictionary();
      }
    }
  }
  public notifyDomOfThisClick() {
    if (this.loaders.startTyping) { this.loaders.startTyping = false;}
    this.eventService.broadcast('SEARCH_INITIATED');
  }
  public proceedToCheckDictionary() {
    const deepCopy = JSON.parse(JSON.stringify(this.dictionary));
    const matchedData = deepCopy.filter((copy) => {
      if (copy.text.toLowerCase().trim().match(this.searchText)) {
        return true;
      } else if (copy.text.toLowerCase().trim().includes(this.searchText)) {
        return true;
      } else if (copy.text.toLowerCase().trim().split(' ').reverse().join(' ').includes(this.searchText)) {
        return true;
      } else {
        return false;
      }
    });
    console.log('Already searched ', matchedData);
    this.alreadySearchedData = matchedData;
    this.alreadySearchedData.reverse();
    if (!matchedData.length && this.searchText.split('').length > 10) {
      this.addToDictionary();
    }
    if (matchedData.length > 10) {
      this.alreadySearchedData.reverse();
      this.alreadySearchedData.length = 10;
      this.matchedData = [];
    }
  }
  public addToDictionary() {
    if (this.searchText.split(' ').length <= 2) {
      this.dictionary.push({text: this.searchText});
    } else {
      for (let data of this.dictionary) {
        if (data.text.includes(this.searchText)) {
          return false;
        } else {
          this.dictionary.push({text: this.searchText});
          return false;
        }
      }
    }
    console.log('Dictionary ', this.dictionary);
  }
}
