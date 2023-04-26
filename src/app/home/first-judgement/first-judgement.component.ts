import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as OpenSeadragon from 'openseadragon';
import { Project } from 'src/app/@models/project-list.model';
import { ProjectListService } from 'src/app/@services/project-list.service';

@Component({
  selector: 'app-first-judgement',
  templateUrl: './first-judgement.component.html',
  styleUrls: ['./first-judgement.component.css']
})
export class FirstJudgementComponent implements OnInit{

  judgeForm!: FormGroup;
  judges = [
    { id: 1, name: 'LUAD'},
    { id: 2, name: 'LUSC'},
    { id: 3, name: 'None of the above'}
  ];

  constructor(private projectListService: ProjectListService,
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private fb: FormBuilder) { }

  get title() {
    return this.projectListService.selectProject.title;
  }

  get counterString() {
    return this.projectListService.counterString;
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      console.log(params);
    })

    this.judgeForm = this.fb.group({
      judge: [null]
    });

    const viewer = this.ngZone.runOutsideAngular(() =>
      OpenSeadragon({
        id: "openseadragon1",
        prefixUrl: "https://cdn.jsdelivr.net/npm/openseadragon@2.3/build/openseadragon/images/",
        tileSources: {
          Image: {
            xmlns: "http://schemas.microsoft.com/deepzoom/2008",
            Url: "/assets/svs/TCGA-BRCA_files/",
            Overlap: "1",
            TileSize: "254",
            Format: "jpeg",
            Size: {
              Height: "13527",
              Width: "14000"
            }
          }
        }
      })
    );
    this.projectListService.startTimer();

  }
  back() {
    this.projectListService.stopTimer(0);
    this.router.navigate(['..'], {
      relativeTo: this.route,
    });
  }

  next() {
    this.projectListService.stopTimer(0);
    this.projectListService.firstJudge = this.judgeForm.value.judge;

    this.router.navigate(['..', 'secondJudgement'], {
      relativeTo: this.route,
    });
  }
}
