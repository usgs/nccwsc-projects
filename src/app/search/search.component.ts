import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import {Subscription} from 'rxjs/Subscription';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  query = ''
  results = []
  total_results: number
  filteredResultsCount: number
  closeResult: string
  filteredResultsSubscription: Subscription
  filteredResultsCountSubscription: Subscription
  totalResultsSubscription: Subscription 
  nonProjectItem: any
  loadingResults = false

  constructor(private searchService: SearchService, private modalService: NgbModal) { }

  open(nonProject, item) {
    this.nonProjectItem = item;
    this.modalService.open(nonProject, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  isProject(types) {
    for (var type in types) {
      if (types[type] == 'Project') {
        return true;
      }
    }
    return false;
  }

  ngOnInit() {
    this.filteredResultsSubscription = this.searchService.filteredResults$.subscribe(filteredResults=>
    {
      this.results = filteredResults;
    });
    this.filteredResultsCountSubscription = this.searchService.filteredResultsCount$.subscribe(filteredResultsCount=>
    {
      this.filteredResultsCount = filteredResultsCount;
    });
    this.totalResultsSubscription = this.searchService.totalItem$.subscribe(totalItems=>
    {
      this.total_results = totalItems;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  ngOnDestroy() {
    this.filteredResultsSubscription.unsubscribe();
    this.totalResultsSubscription.unsubscribe();
  }

}
