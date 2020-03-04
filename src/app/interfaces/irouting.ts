/**
 * Create by Arokoyu Olalekan<arokoyuolalekan@gmail.com>
 */
import {ModuleWithProviders} from '@angular/core';

export interface IRouting {
  routes: ModuleWithProviders;
  components: any[];
  entryComponent?: any[];
  providers?: any[];
}

