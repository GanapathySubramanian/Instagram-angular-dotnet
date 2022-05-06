import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastNotificationService {

  constructor(private toastr: ToastrService) { }

  showSuccess(message: string, title: string) {
    this.toastr.success(message, title, {
      timeOut: 2000
    });
  }

  showError(message: string, title: string) {
    this.toastr.error(message, title, {
      timeOut: 2000
    });
  }

  showWarning(message: string, title: string) {
    this.toastr.warning(message, title, {
      timeOut: 2000
    });
  }

  showPending(message: string, title: string) {
    this.toastr.info(message, title, {
      timeOut: 2000
    });
  }

}
