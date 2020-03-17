import { Injectable, Injector } from '@angular/core';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType, PortalInjector } from '@angular/cdk/portal';
import { OverlayControllerRef } from './overlay-controller-ref';
import { OverlayParams } from './overlay-controller-params';

@Injectable({
  providedIn: 'root'
})
export class OverlayController {

  constructor(
    private injector: Injector,
    private overlay: Overlay
  ) { }

  open(component: ComponentType<unknown>, config: any = {}): OverlayControllerRef {
    const dialogConfig = {...config };
    const overlayRef = this.createOverlay(dialogConfig);
    const viewRef = new OverlayControllerRef(overlayRef);
    // const componentPortal = this.attachDialogContainer(component, overlayRef, dialogConfig, viewRef);
    overlayRef.backdropClick().subscribe(_ => viewRef.close());

    return viewRef;
  }

  private createOverlay(config: any) {
    const overlayConfig = this.getOverlayConfig(config);
    return this.overlay.create(overlayConfig);
  }

  private getOverlayConfig(config: any): OverlayConfig {
    const overlayConfig = new OverlayConfig(config);

    return overlayConfig;
  }

  private attachDialogContainer(component: ComponentType<unknown>, overlayRef: OverlayRef, config: any, dialogRef: OverlayControllerRef) {
    const injector = this.createInjector(config, dialogRef);

    const containerPortal = new ComponentPortal(component, null, injector);
    const containerRef = overlayRef.attach(containerPortal);

    return containerRef;
  }

  private createInjector(config: any, dialogRef: OverlayControllerRef): PortalInjector {
    const injectionTokens = new WeakMap();

    injectionTokens.set(OverlayControllerRef, dialogRef);
    injectionTokens.set(OverlayParams, {data: config.data} );

    return new PortalInjector(this.injector, injectionTokens);
  }
}
