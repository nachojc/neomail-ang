import { TestBed } from '@angular/core/testing';

import { OverlayController } from './overlay-controller.service';
import { OverlayModule, Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { of } from 'rxjs';



export class OverlayMock {
  create(config?: OverlayConfig) {
    return {
      attach: () => {
        return { onDestroy: (callback) => callback };
      },
      backdropClick: () => of({}),
      dispose: () => {}
    };
  }
}

describe('OverlayController', () => {
    let service: OverlayController;

    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            OverlayModule,
        ],
        declarations: [],
        providers: [
            { provide: Overlay, useClass: OverlayMock }
        ]

    }).overrideModule(BrowserDynamicTestingModule, {
        set: {
        entryComponents: [],
        }
    }));

    it('should be created', () => {
        service = TestBed.get(OverlayController);
        expect(service).toBeTruthy();
    });
});
