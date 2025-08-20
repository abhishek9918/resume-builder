import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from '../../services/api-service.service';
import { AuthService } from '../../services/auth-service.service';
import { DataUpdateService } from '../../services/data-update.service';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-delete-modal',
  imports: [CommonModule, LoaderComponent],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss',
  animations: [
    trigger('modalState', [
      state('void', style({ opacity: 0, transform: 'scale(0.7)' })),
      state('*', style({ opacity: 1, transform: 'scale(1)' })),
      transition(':enter', [animate('200ms ease-out')]),
      transition(':leave', [
        animate(
          '200ms ease-in',
          style({ opacity: 0, transform: 'scale(0.7)' })
        ),
      ]),
    ]),
  ],
})
export class DeleteModalComponent {
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private fb: FormBuilder,
    private auth: AuthService,
    private _service: ApiServiceService,
    private _toaster: ToastrService,
    private dataUpdateService: DataUpdateService
  ) {}
  @ViewChild('deleteModal') deleteModal!: ElementRef;
  @Input() isOpen = false;
  @Input() itemName = 'your resume';
  openDeleteModal: boolean = false;
  resumeId: any;
  openDelete(data: any) {
    if (data) this.resumeId = data.id;
    console.log(this.resumeId, 'resume');
    this.openDeleteModal = true;
  }
  onCancel() {
    this.openDeleteModal = false;
  }
  isLoader = false;

  onDelete() {
    this.isLoader = true;
    console.log(this.resumeId);
    const id = '';
    const URL = `resumes/delete_resume/${this.resumeId}`;
    this._service.delete(URL).subscribe({
      next: (res) => {
        this._toaster.success(res.message);
        this.isLoader = false;
        this.dataUpdateService.notifyComponentAShouldUpdate();
        console.log(res);
      },
      error: (err) => {
        this._toaster.error(err.message);

        this.isLoader = false;
      },
    });
    this.openDeleteModal = false;
  }
}
