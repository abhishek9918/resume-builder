import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ResumeDownlaodComponent } from '../../../core/modals/resume-downlaod/resume-downlaod.component';
import { ApiServiceService } from '../../../core/services/api-service.service';
import { AuthService } from '../../../core/services/auth-service.service';
import { GridViewComponent } from '../../../core/shared/template-view/grid-view.component';
import { ListViewComponent } from '../../../core/shared/template-view/list-view.component';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger,
} from '@angular/animations';
import { DataUpdateService } from '../../../core/services/data-update.service';
import { debounceTime, filter, Subject, takeUntil } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-template',
  imports: [CommonModule, GridViewComponent, ListViewComponent],

  templateUrl: './template.component.html',
  styleUrl: './template.component.scss',
  animations: [
    trigger('cardAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-50px)' }),
            stagger(200, [
              animate(
                '500ms ease-in',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class TemplateComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _service: ApiServiceService,
    private _authService: AuthService,
    private dataUpdateService: DataUpdateService
  ) {
    toObservable(this.dataUpdateService.needsUpdate)
      .pipe(
        takeUntil(this.destroy$),
        filter((needsUpdate) => needsUpdate === true),
        debounceTime(300),
        filter(() => this.dataUpdateService.apiStatus() === 'idle')
      )
      .subscribe(() => {
        console.log(
          'Component A: Detected update needed via Debounced Signal!'
        );
        const userId = this._authService.getUserInfo()?.user?._id;
        console.log(userId);
        if (userId) {
          this.getResumeByUserId(userId);
        }
      });
  }

  allResumeData: any[] = [];
  ngOnInit(): void {
    const userId = this._authService.getUserInfo()?.user?._id;
    console.log(userId);
    if (userId) {
      this.getResumeByUserId(userId);
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  ngAfterViewInit(): void {}
  getResumeByUserId(userId: any) {
    const URL = `resumes/get_Resume_By_UserId/${userId}`;
    this._service.get(URL).subscribe({
      next: (res: any) => {
        this.allResumeData = res.data;
        this.dataUpdateService.setApiSuccess();

        this.dataUpdateService.resetUpdateAndStatus();
      },
      error: (err: any) => {
        console.error('Error fetching resumes:', err);
        this.dataUpdateService.setApiError();
      },
    });
  }

  @ViewChild('OpenDownloadModal') OpenDownloadModal!: ResumeDownlaodComponent;

  onDownloadClick() {
    this.OpenDownloadModal.openPopup();
  }

  onPrintClick() {
    window.print();
  }

  onEmailClick() {
    alert('Feature coming soon!');
  }

  onFinishClick() {
    this._router.navigate(['/dashboard']);
  }

  downloadResume() {}
  showViewType: string = 'GRID';
  ShowGridOrTable(string: string) {
    this.showViewType = string;
  }
}
