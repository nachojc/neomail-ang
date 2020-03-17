import { Injectable } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { OverlayController } from '../overlay-controller/overlay-controller.service';
import { OverlayControllerRef } from '../overlay-controller/overlay-controller-ref';

@Injectable({
  providedIn: 'root'
})
export class ModalController {
  private overlayRef: OverlayControllerRef;

  constructor(
    private overlayController: OverlayController
    ) {
  }

  /**
   * Will presente de Component as a modal the component must be imported in it's module as entryComponents
   */
  public present(component: ComponentType<unknown>, onDismiss?: () => void): void {
    console.warn('DEPRECATED: present() method is deprecated, use open() method');

    this.overlayRef = this.open(component);

    this.overlayRef.onDidDismiss().subscribe(() => onDismiss);
  }

  public dismiss(): void {
    this.overlayRef.close();
  }


  public open(component: ComponentType<unknown>, config: any = {}): OverlayControllerRef {
    const defaultOptions = {
      data: config.data ? config.data : {},
      height: config.height ? config.height : '100vh',
      width: config.width ? config.width : '100vw',
      disposeOnNavigation: config.disposeOnNavigation ? config.disposeOnNavigation : true,
      hasBackdrop: config.hasBackdrop ? config.hasBackdrop : false,
      panelClass: `sn-modal${config.panelClass ? ' ' + config.panelClass : ''}`
    };

    if (config.animated) {
      defaultOptions.panelClass += '-animate';
    }

    return this.overlayController.open(component, defaultOptions);
  }
}
