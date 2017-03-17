import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { routing,
         appRoutingProviders } from './app.routing';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LeafletModule } from "@asymmetrik/angular2-leaflet";
import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProjectComponent } from './project/project.component';
import { ProjectsComponent } from './projects/projects.component';
import { SearchComponent } from './search/search.component';
import { CscsComponent } from './cscs/cscs.component';
import { TopicsComponent } from './topics/topics.component';
import { MapComponent } from './map/map.component';
import { SearchNavComponent } from './search-nav/search-nav.component';
import { LocalJsonService } from './local-json.service';
import { SearchService } from './search.service';
import { NccwscDrupalService } from './nccwsc-drupal.service';
import { CscComponent } from './csc/csc.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProjectComponent,
    ProjectsComponent,
    SearchComponent,
    CscsComponent,
    TopicsComponent,
    MapComponent,
    SearchNavComponent, CscComponent
  ],
  imports: [
    LeafletModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    MultiselectDropdownModule,
    NgbModule.forRoot(),
  ],
  providers: [LocalJsonService, NccwscDrupalService, SearchService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
