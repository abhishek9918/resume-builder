import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../../services/api-service.service';
import { CommonModalComponent } from '../../modals/common-modal/common-modal.component';
import { DeleteModalComponent } from '../../modals/delete-modal/delete-modal.component';
import {
  trigger,
  style,
  animate,
  transition,
  stagger,
  query,
} from '@angular/animations';

@Component({
  selector: 'app-grid-view',
  imports: [CommonModule, CommonModalComponent, DeleteModalComponent],
  templateUrl: './grid-view.component.html',
  styleUrl: './grid-view.component.scss',
  animations: [
    trigger('listAnimation', [
      transition('void => *', [
        style({
          transform: 'translateX(-100%)',
          opacity: 0,
        }),
        animate(
          '600ms cubic-bezier(0.25, 0.8, 0.25, 1)',
          style({
            transform: 'translateX(0)',
            opacity: 1,
          })
        ),
      ]),
    ]),

    trigger('cardAnimation', [
      transition(
        'void => *',
        [
          style({
            opacity: 0,
            transform: 'translateX(-50px) scale(0.9)',
          }),
          animate(
            '500ms {{delay}}ms cubic-bezier(0.34, 1.56, 0.64, 1)',
            style({
              opacity: 1,
              transform: 'translateX(0) scale(1)',
            })
          ),
        ],
        { params: { delay: 0 } }
      ),
      transition('* => void', [
        animate(
          '400ms ease-in',
          style({
            opacity: 0,
            transform: 'translateX(50px) scale(0.8) rotateZ(5deg)',
            filter: 'blur(2px)',
          })
        ),
      ]),
    ]),
  ],
})
export class GridViewComponent implements OnInit, AfterViewInit {
  @ViewChild('modalOpen') modalOpen!: CommonModalComponent;
  @ViewChild('deleteModal') deleteModal!: DeleteModalComponent;
  @Output() refreshResumes = new EventEmitter();
  @Input() resumes: any;
  heading = 'Update an existing resume';
  subHeading = 'Changed your mind about the name? Give it a new one';
  constructor(private route: Router, private _service: ApiServiceService) {}
  ngOnInit(): void {
    this.shouldAnimateList = true;
  }

  isLoading = true;

  @ViewChild('tiltCard', { static: true }) tiltCard!: ElementRef;

  ngAfterViewInit(): void {}
  isModalOpen = false;
  selectedResumeIndex: number | null = null;
  modalStyles = {};

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

  closeModal() {
    this.openedCardIndex = null;
  }
  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.popup') && !target.closest('.transform-wrapper')) {
      this.openedCardIndex = null;
    }
  }
  activeCardIndex: number | null = null;
  shouldAnimateList = true;
  togglePopup(index: number) {
    this.activeCardIndex = this.activeCardIndex === index ? null : index;
  }
  onModalActionSuccess() {
    this.refreshResumes.emit();
  }
  actions(val: string, resume: any) {
    this.shouldAnimateList = false;
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
    setTimeout(() => {
      this.shouldAnimateList = true;
    }, 100);
  }

  trackByResumeId(index: number, resume: any): any {
    return resume.id || resume.resumeName || index;
  }
  getAnimationDelay(index: number): any {
    return {
      value: '',
      params: {
        delay: index * 100,
      },
    };
  }
  getWaveDelay(index: number): any {
    const row = Math.floor(index / this.getCardsPerRow());
    const col = index % this.getCardsPerRow();
    return {
      value: '',
      params: {
        delay: row * 150 + col * 80,
      },
    };
  }

  getCardsPerRow(): number {
    if (window.innerWidth >= 1536) return 5;
    if (window.innerWidth >= 1280) return 4;
    if (window.innerWidth >= 640) return 3;
    return 1;
  }
}
