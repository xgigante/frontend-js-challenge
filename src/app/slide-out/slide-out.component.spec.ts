// slide-out.component.spec.ts
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { SlideOutComponent } from './slide-out.component';
import { Store } from '@ngrx/store';
import { TrendStateEnum } from '../trends/models/trend-states.model';
import { SlideOutService } from './slide-out.service';
import { of } from 'rxjs';
import { TrendUtilsService } from '../share/trend-utils.service';

describe('SlideOutComponent', () => {
  let component: SlideOutComponent;
  let fixture: ComponentFixture<SlideOutComponent>;
  let store: Store;
  let slideOutServiceMock: jasmine.SpyObj<SlideOutService>;
  let trendUtilsService: jasmine.SpyObj<TrendUtilsService>;

  beforeEach(async () => {
    slideOutServiceMock = jasmine.createSpyObj('SlideOutService', ['getTrend']);
    slideOutServiceMock.getTrend.and.returnValue(
      of({ trend: undefined, state: undefined })
    );
    trendUtilsService = jasmine.createSpyObj('TrendUtilsService', [
      'isTrendValid',
    ]);
    trendUtilsService.isTrendValid.and.returnValue(true);

    await TestBed.configureTestingModule({
      declarations: [SlideOutComponent],
      providers: [
        {
          provide: Store,
          useValue: jasmine.createSpyObj('Store', ['dispatch']),
        },
        { provide: SlideOutService, useValue: slideOutServiceMock },
        { provide: TrendUtilsService, useValue: trendUtilsService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideOutComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    slideOutServiceMock = TestBed.inject(
      SlideOutService
    ) as jasmine.SpyObj<SlideOutService>;
    trendUtilsService = TestBed.inject(
      TrendUtilsService
    ) as jasmine.SpyObj<TrendUtilsService>;
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    it('should initialize trend and trendState on ngOnInit', fakeAsync(() => {
      const mockTrend = { id: 1, name: 'Sample Trend' } as any;
      const mockState = TrendStateEnum.New;
      slideOutServiceMock.getTrend.and.returnValue(
        of({ trend: mockTrend, state: mockState })
      );
      component.ngOnInit();
      tick();
      expect(component.trend).toEqual(mockTrend);
      expect(component.originalTrend).toEqual(mockTrend);
      expect(component.trendState).toBe(mockState);
    }));

    it('should not set trend if trend is null', fakeAsync(() => {
      const mockState = TrendStateEnum.New;
      slideOutServiceMock.getTrend.and.returnValue(
        of({ trend: undefined, state: undefined })
      );
      component.ngOnInit();
      tick();
      expect(component.trend).toBeUndefined();
      expect(component.originalTrend).toBeUndefined();
      expect(component.trendState).toBe(mockState);
    }));
  });

  describe('confirmDelete', () => {
    it('should set the `showDeleteModal` property to false', () => {
      component.showDeleteModal = true;
      component.confirmDelete();
      expect(component.showDeleteModal).toBeFalse();
    });
  });

  describe('cancelDelete', () => {
    it('should set the `showDeleteModal` property to false', () => {
      component.showDeleteModal = true;
      component.cancelDelete();
      expect(component.showDeleteModal).toBeFalse();
    });
  });

  describe('saveTrend', () => {
    beforeEach(() => {
      trendUtilsService.isTrendValid.and.returnValue(true);
    });

    it('should call createTrend when state is New and trend is valid', () => {
      const spyOnCreateTrend = spyOn(component as any, 'createTrend');
      const spyOnUpdateTrend = spyOn(component as any, 'updateTrend');
      component.saveTrend(TrendStateEnum.New);
      expect(spyOnCreateTrend).toHaveBeenCalled();
      expect(spyOnUpdateTrend).not.toHaveBeenCalled();
    });

    it('should call updateTrend when state is Edit and trend is valid', () => {
      const spyOnCreateTrend = spyOn(component as any, 'createTrend');
      const spyOnUpdateTrend = spyOn(component as any, 'updateTrend');
      component.saveTrend(TrendStateEnum.Edit);
      expect(spyOnUpdateTrend).toHaveBeenCalled();
      expect(spyOnCreateTrend).not.toHaveBeenCalled();
    });
  });
});
