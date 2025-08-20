import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../../services/api-service.service';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';

import { CommonModalComponent } from '../../modals/common-modal/common-modal.component';
import { DeleteModalComponent } from '../../modals/delete-modal/delete-modal.component';
@Component({
  selector: 'app-list-view',
  imports: [CommonModule, CommonModalComponent, DeleteModalComponent],
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.scss',
  animations: [
    trigger('listAnimation', [
      transition(':enter', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-20px)' }),
            stagger(200, [
              animate(
                '500ms ease-out',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1, height: '*' }),
        animate(
          '1000ms cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({
            transform: 'scale(0.5)',
            opacity: 0,
            height: '0px',
            margin: '0px',
          })
        ),
      ]),
    ]),
  ],
})
export class ListViewComponent implements OnInit, AfterViewInit {
  constructor(private route: Router, private _service: ApiServiceService) {}
  @Input() resumes: any;
  @ViewChild('modalOpen') modalOpen!: CommonModalComponent;
  @ViewChild('deleteModal') deleteModal!: DeleteModalComponent;
  @Output() refreshResumes = new EventEmitter();
  // @Input() resumes: any;
  heading = 'Update an existing resume';
  subHeading = 'Changed your mind about the name? Give it a new one';

  ngOnInit(): void {}
  ngAfterViewInit(): void {}

  openedCardIndex: number | null = null;

  openModal(index: number) {
    this.openedCardIndex = this.openedCardIndex === index ? null : index;
  }
  isSmallScreen(): boolean {
    return window.innerWidth < 640;
  }
  screenWidth: any;
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.screenWidth = window.innerWidth;
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.popup') && !target.closest('.group')) {
      this.openedCardIndex = null;
    }
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const isPopupClick = target.closest('.popup');
    const isMenuButtonClick = target.closest('button[data-index]');

    if (!isPopupClick && !isMenuButtonClick) {
      this.openedCardIndex = null;
    }
  }
  actions(val: string, resume: any) {
    let obj: any = {};
    switch (val) {
      case 'Open':
        this.route.navigate(['/resume/builder', resume._id]);
        break;
      case 'Rename':
        this.modalOpen.heading = 'Update an existing resume';
        this.modalOpen.subHeading =
          'Changed your mind about the name? Give it a new one';
        obj.key = val;
        obj = { ...obj, ...resume };
        this.modalOpen.openPopup(obj);
        this.openedCardIndex = null;
        break;
      case 'Duplicate':
        this.modalOpen.heading = 'Duplicate an existing resume';
        this.modalOpen.subHeading = 'Give your old resume a new name.';
        obj.key = val;
        obj = { ...obj, ...resume };

        this.modalOpen.openPopup(obj);
        this.openedCardIndex = null;
        break;
      case 'Delete':
        console.log(resume);
        obj.key = val;
        obj.id = resume._id;
        this.deleteModal.openDelete(obj);
        this.openedCardIndex = null;
        break;
      case 'Lock':
        break;
      default:
        break;
    }
  }
}
