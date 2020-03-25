import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Injectable, Injector, TemplateRef, Type } from '@angular/core';
import { ModalOverlayRef } from './overlay-ref';
import { DialogComponent } from '../../components';
// import { ModalComponent } from '../../components';


@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  open<R = any, T = any>(
    content: string | TemplateRef<any> | Type<any>,
    data: T
  ): ModalOverlayRef<R> {
    let classElm: string[] = ['modal', 'is-active'];
    if (data.hasOwnProperty('size')){
      classElm.push(data['size']);
    }
    if (data.hasOwnProperty('animated') && data.hasOwnProperty('animated')){
      classElm.push('modal-animated');
    }
    const configs = new OverlayConfig({
      hasBackdrop: data.hasOwnProperty('hasBackdrop') ? !!data['hasBackdrop']: true,
      panelClass: classElm,
      backdropClass: 'modal-background',
    });
    const overlayRef = this.overlay.create(configs);

    const refObj = new ModalOverlayRef<R, T>(overlayRef, content, data);

    const injector = this.createInjector(refObj, this.injector);
    overlayRef.attach(new ComponentPortal(DialogComponent, null, injector));

    return refObj;
  }

  createInjector(ref: ModalOverlayRef, inj: Injector) {
    const injectorTokens = new WeakMap([[ModalOverlayRef, ref]]);
    return new PortalInjector(inj, injectorTokens);
  }
}
