import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  constructor() {}
  ngOnInit() {
    const cssRule = 'color: #3c8308;' +
      'font-size: 20px;' +
      'text-align: center' +
      'font-weight: bold;' +
      'text-shadow: 1px 1px 5px rgb(249, 162, 34);' +
      'filter: dropshadow(color=#3c8308, offx=1, offy=1);';
    setTimeout(console.info.bind(console, '%cSEAMLESSHR', cssRule), 0);
  }
}
