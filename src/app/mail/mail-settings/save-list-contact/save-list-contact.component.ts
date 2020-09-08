import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState, BlackList, UserState, WhiteList } from '../../../store/datatypes';
import { BlackListAdd, WhiteListAdd } from '../../../store/actions';
import { NotificationService } from '../../../store/services/notification.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-save-list-contact',
  templateUrl: './save-list-contact.component.html',
  styleUrls: ['./save-list-contact.component.scss']
})
export class SaveListContactComponent implements OnInit, OnDestroy {
  @Input() public contactType: 'Whitelist' | 'Blacklist' = 'Whitelist';

  @Input() public contact: WhiteList | BlackList = { email: '', name: '' };

  @Output() public closed = new EventEmitter();

  @ViewChild('modalContent') modalContent: any;

  public contactForm: FormGroup;
  public showFormErrors: boolean;
  private modalRef: NgbModalRef;

  public inProgress: boolean;

  constructor(
    private modalService: NgbModal,
    private store: Store<AppState>,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email]]
    });
    setTimeout(() => {
      this.openModal();
    }, 50);

    this.handleUserState();
  }

  private handleUserState(): void {
    this.store
      .select(state => state.user)
      .pipe(untilDestroyed(this))
      .subscribe((state: UserState) => {
        if (this.inProgress && !state.inProgress) {
          this.inProgress = false;
          if (!state.isError) {
            this.notificationService.showSnackBar(
              `${this.contactType} contact ${this.contact.id ? 'updated' : 'saved'} successfully.`
            );
            this.closed.emit();
            this.modalRef.close();
          } else {
            this.notificationService.showSnackBar(`Failed to ${this.contact.id ? 'update' : 'save'} ${
              this.contactType
            } contact.
                          ${state.error}`);
          }
        }
      });
  }

  openModal() {
    this.modalRef = this.modalService.open(this.modalContent, {
      centered: true,
      windowClass: 'modal-sm'
    });
    this.modalRef.result.then(
      result => {
        this.closed.emit();
      },
      reason => {
        this.closed.emit();
      }
    );
  }

  public addContact() {
    this.showFormErrors = true;
    if (this.contactForm.valid) {
      this.inProgress = true;
      if (this.contactType === 'Whitelist') {
        this.store.dispatch(new WhiteListAdd(this.contactForm.value));
      } else {
        this.store.dispatch(new BlackListAdd(this.contactForm.value));
      }
    }
  }

  ngOnDestroy(): void {}
}
