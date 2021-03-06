import { Component, OnInit, ViewEncapsulation, LOCALE_ID } from '@angular/core';
import { DatePipe } from '@angular/common';
import { LocalJsonService } from '../local-json.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  sub: any;
  projectId: string;
  cscId: string;
  projectJson: any;
  previewImage: any;
  modal_image: any;
  closeResult: string;
  trustedDashboardUrl : SafeUrl;
  sbURL = environment.sbmainURL;

  constructor(private route: ActivatedRoute, private localJson: LocalJsonService, private router: Router, private sanitizer: DomSanitizer, private modalService: NgbModal) { }

  openImage(imageModal, image) {
    this.modal_image = image;
    this.modalService.open(imageModal, { size: 'lg', windowClass: 'dark-modal' });
  }

  goodTitle(title) {
    console.log(title.substring(0,8))
    if (title == 'Thumbnail' || title.substring(0,8) == 'metadata') {

      return false
    }
    return true
  }
  /*
  Takes a string of 'yyyy', 'yyyy-MM', or 'yyyy-MM-dd' and returns a formatted date, only using the values present:
    1981 -> 1981
  */
  static niceDate(value) {
    try {
      switch(value.split('-').length) {
        case 2:
          /* the '-01' is a fix but the reason for why it's needed is unclear. */
          return new DatePipe('en-US').transform(value + '-01', 'MM/yyyy');
        case 3:
          return new DatePipe('en-US').transform(value, 'MM/dd/yyyy');
        case 1: default:
          return value;
      }
    } catch (error) {
      console.log(`Could not parse value: ${value}`)
      return value
    }
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.projectId = params['id'];
      this.cscId = params['csc'];
      this.localJson.loadProject(this.cscId, this.projectId).subscribe(data => {
        this.projectJson = data;
        this.projectJson.dates.start_date = ProjectComponent.niceDate(this.projectJson.dates.start_date);
        this.projectJson.dates.end_date = ProjectComponent.niceDate(this.projectJson.dates.end_date);
        if (this.projectJson.images) {
          for (var image in this.projectJson.images) {
            if (this.projectJson.images[image]['useForPreview']) {
              this.previewImage = this.projectJson.images[image];
              this.trustedDashboardUrl = this.sanitizer.bypassSecurityTrustUrl(this.projectJson.images[image]['url']);
            }
          }
        }
      });


    });
  }
}
