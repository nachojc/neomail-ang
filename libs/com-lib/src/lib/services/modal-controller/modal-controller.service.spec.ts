import { TestBed } from '@angular/core/testing';
import { OverlayModule, OverlayConfig } from '@angular/cdk/overlay';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { ModalController } from './modal-controller.service';
import { OverlayController } from '../overlay-controller/overlay-controller.service';
import { ToastComponent } from '../toast-controller/toast.component';
import { ToastModule } from '../toast-controller/toast-controller.module';



export class OverlayMock {
  create(config?: OverlayConfig) {
    return {
      attach: () => {
        return { onDestroy: (callback) => callback };
      },
      dispose: () => {}
    };
  }

}

describe('ModalControllerService', () => {
  let service: ModalController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
        OverlayModule,
        ToastModule,
    ],
    providers: [
      OverlayController
    ]
  }).overrideModule(BrowserDynamicTestingModule, {
    set: {
      entryComponents: [ToastComponent],
    }
  }));

  it('should be created', () => {
      service = TestBed.get(ModalController);
      expect(service).toBeTruthy();
  });


  it('test modal present ', () => {
    service.present(ToastComponent);
    expect(service['overlayRef']).toBeDefined();
  });

  it('test modal dismiss ', () => {

    service.present(ToastComponent);
    expect(service['overlayRef']).toBeDefined();
    const spy = spyOn(service['overlayRef'], 'close');
    service.dismiss();
    expect(spy).toHaveBeenCalled();
  });


  describe('open()', () => {
    let options;
    beforeEach(() => {
        options = {
        };
    });
    it('should return a OverlayReference', () => {
        const ref = service.open(ToastComponent, options);
        expect(ref).toBeDefined();
    });

    // it('should fire onDidDismiss', fakeAsync(() => {
    //     const ref = service.open(ToastComponent, options);
    //     // tslint:disable-next-line: no-string-literal
    //     const spy = spyOn<any>(ref['_onDidDismiss'], 'next');
    //     ref.onDidDismiss().subscribe(res => {
    //         expect(spy).toHaveBeenCalled();
    //     });
    //     ref.close();
    // }));
});
});
