import { JudgementAPIService } from './../../@services/judgement-api.service';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as OpenSeadragon from 'openseadragon';
import { interval } from 'rxjs';
import { RecordService } from 'src/app/@services/record.service';
import { ImageAPIService } from 'src/app/@services/image-api.service';
import { Organ } from '../../@models/organ.const';

@Component({
  selector: 'app-second-judgement',
  templateUrl: './second-judgement.component.html',
})
export class SecondJudgementComponent implements OnInit {
  judgeForm!: FormGroup;
  judges = [{ id: 1, name: 'test'}];

  counterString = '00:00:00';
  subscription: any;
  title: string = "";

  constructor(
    private recordService: RecordService,
    private imageAPIService: ImageAPIService,
    private judgementAPIService: JudgementAPIService,
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private fb: FormBuilder
  ) {
    this.subscription = this.recordService.selectProject$.subscribe(project => {
      this.title = project.title;
    });
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => {
      // console.log(params);
    });

    this.judgeForm = this.fb.group({
      judge: [null],
    });

    switch(this.title) {
      case "Breast":
        this.judges = Organ[this.title];
        break;
      case "Lung":
        this.judges = Organ[this.title];
        break;
      case "Brain":
        this.judges = Organ[this.title];
        break;
      default:
        this.judges = [];
        break;
    }

    const viewer = this.ngZone.runOutsideAngular(() =>
      OpenSeadragon({
        id: 'openseadragon1',
        prefixUrl:
          'https://cdn.jsdelivr.net/npm/openseadragon@2.3/build/openseadragon/images/',
        tileSources: this.imageAPIService.getImagePath(this.recordService.selectImage),
      })
    );

    const config = {
      id: 'openseadragon2',
      prefixUrl:
        'https://cdn.jsdelivr.net/npm/openseadragon@2.3/build/openseadragon/images/',
      tileSources: {}
    };
    if(this.recordService.selectImage.name == "TCGA-A2-A0T5-01Z-00-DX1.128C288B-B357-439B-A8D4-8E7DEBF73E4E" || this.recordService.selectImage.name == "TCGA-5T-A9QA-01Z-00-DX1.B4212117-E0A7-4EF2-B324-8396042ACEC1") {
      config.tileSources = {
        type: "image",
        url: this.imageAPIService.getHeatMapPath(this.recordService.selectImage),
      }
    } else {
      config.tileSources = this.imageAPIService.getImagePath(this.recordService.selectImage)
    }
    const viewer2 = new OpenSeadragon.Viewer(config);

    viewer.addHandler('zoom', function (event) {
      // console.log(event);
      viewer2.viewport.zoomTo(event.zoom, event.refPoint, event.immediately);
    });

    viewer.addHandler('pan', function(event) {
      viewer2.viewport.panTo(event.center, event.immediately);
    })

    const startTime = new Date();
    interval(1000).subscribe(() => {
      const currentTime = new Date();
      const timeDiff = currentTime.getTime() - startTime.getTime();
      this.counterString = this.recordService.formatTime(timeDiff);
    });
  }

  back() {
    this.counterString = '00:00:00';
    this.router.navigate(['..', 'firstJudgement'], {
      relativeTo: this.route,
    });
  }

  next() {
    this.recordService.secondDuration = this.counterString;
    this.recordService.secondJudge = this.judgeForm.value.judge;
    this.judgementAPIService.postJudgement({
      'u_id': this.recordService.u_id,
      'i_id': null,
      'title': this.title,
      'name': this.recordService.selectImage.name,
      'path': this.recordService.selectImage.path,
      'firstDuration': this.recordService.firstDuration,
      'secondDuration': this.recordService.secondDuration,
      'firstJudge': this.recordService.firstJudge,
      'secondJudge': this.recordService.secondJudge
    }).subscribe((data: any) => {
      if(data.status == 201) {
        // alert('紀錄已儲存');
        this.router.navigate(['..', 'analysis'], {
          relativeTo: this.route,
        });
      }
    });
  }
}
