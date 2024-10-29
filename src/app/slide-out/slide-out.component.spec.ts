import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { SlideOutComponent } from './slide-out.component';
import { TrendStateEnum } from '../trends/models/trend-states.model';

describe('SlideOutComponent', () => {
  let component: SlideOutComponent;
  let fixture: ComponentFixture<SlideOutComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SlideOutComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(SlideOutComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('closeSlide', () => {
    it('should emit the `closeSlideOut` event and reset the `errorMessage` property', () => {
      const spyOnEmit = spyOn(component.closeSlideOut, 'emit');
      component.errorMessage = 'Error message';
      component.closeSlide();
      expect(spyOnEmit).toHaveBeenCalled();
      expect(component.errorMessage).toBeNull();
    });
  });

  describe('openDeleteModal', () => {
    it('should set the `showDeleteModal` property to true', () => {
      component.showDeleteModal = false;
      component.openDeleteModal();
      expect(component.showDeleteModal).toBeTrue();
    });
  });

  describe('confirmDelete', () => {
    it('should delete a trend if it exists and close the slide-out component', () => {
      component.trend = { id: '1' } as any;
      const spyOnDeleteTrend = spyOn(component as any, 'deleteTrend');
      const spyOnCloseSlide = spyOn(component, 'closeSlide');
      component.confirmDelete();
      expect(spyOnDeleteTrend).toHaveBeenCalled();
      expect(spyOnCloseSlide).toHaveBeenCalled();
    });

    it('should hide the delete confirmation modal regardless of whether a trend exists', () => {
      component.trend = null as any;
      component.showDeleteModal = true;
      component.confirmDelete();
      expect(component.showDeleteModal).toBeFalse();
    });
  });

  describe('cancelDelete', () => {
    it('should hide the delete confirmation modal and close the slide-out component', () => {
      component.showDeleteModal = true;
      const spyOnCloseSlide = spyOn(component, 'closeSlide');
      component.cancelDelete();
      expect(component.showDeleteModal).toBeFalse();
      expect(spyOnCloseSlide).toHaveBeenCalled();
    });
  });

  describe('saveTrend', () => {
    beforeEach(() => {
      spyOn(component as any, 'isTrendValid').and.returnValue(true);
      component.trend = { id: '1' } as any;
    });

    it('should call createTrend when state is New', () => {
      const spyOnCreateTrend = spyOn(component as any, 'createTrend');
      component.saveTrend(TrendStateEnum.New);
      expect(spyOnCreateTrend).toHaveBeenCalled();
    });

    it('should call updateTrend when state is Edit', () => {
      const spyOnUpdateTrend = spyOn(component as any, 'updateTrend');
      component.saveTrend(TrendStateEnum.Edit);
      expect(spyOnUpdateTrend).toHaveBeenCalled();
    });
  });
});
