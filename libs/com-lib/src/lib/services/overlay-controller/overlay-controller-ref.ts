import { OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';

export class OverlayControllerRef {
  private _onDidDismiss = new Subject<any>();

  constructor(private overlayRef: OverlayRef) {
  }

  close(res?: any): void {
    this.overlayRef.dispose();
    this._onDidDismiss.next(res);
    this._onDidDismiss.complete();
  }

  onDidDismiss(): Observable<any> {
      return this._onDidDismiss.asObservable();
  }
}
