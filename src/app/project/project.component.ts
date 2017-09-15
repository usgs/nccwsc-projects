import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LocalJsonService } from '../local-json.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

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

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.projectId = params['id'];
      this.cscId = params['csc'];    
      console.log(this.projectId)
      console.log(this.cscId)
    this.localJson.loadProject(this.cscId, this.projectId).subscribe(data => {
      this.projectJson = data;
      console.log(this.projectJson);
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
