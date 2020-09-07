import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
// import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
// import {Location} from '@angular/common';

import { GenreDashboardComponent } from './genre-dashboard.component';
import { ShowsService} from '../service/shows.service';

describe('GenreDashboardComponent:', () => {
  let component: GenreDashboardComponent;
  let fixture: ComponentFixture<GenreDashboardComponent>;

  describe('checks drama param type:', () => {
    function setup() {
      TestBed.configureTestingModule({
        declarations: [ GenreDashboardComponent ],
        imports: [RouterTestingModule],
        providers: [
          {provide: ActivatedRoute, useValue: {
              snapshot: {
                  params: {
                    type: 'drama'
                  }
            } }
          },
          {provide: ShowsService, useValue: {
              dramaShows: {type: 'Popular In Drama', list: []}
            }
          },
          { provide: Location, useClass: SpyLocation }]
      })
      .compileComponents();
      fixture = TestBed.createComponent(GenreDashboardComponent);
      component = fixture.componentInstance;
      const showService = fixture.debugElement.injector.get(ShowsService);

      return { fixture, component, showService };
    }

    it('should create', () => {
      const { component } = setup();
      expect(component).toBeTruthy();
    });
    it('should verify the headline of the page correctly', () => {
      const { fixture } = setup();
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('.container .genre-name').textContent).toContain('Popular In Drama');
    });
    it('should verify component data correctly', () => {
      const { component, fixture } = setup();
      fixture.detectChanges();
      expect(component.genreType).toBe('drama');
      expect(component.genreData['type']).toBe('Popular In Drama');
      expect(component.genreData['list'].length).toBe(0);
    });
    it('should have goBack method and should call location.back', () => {
      const { component, fixture } = setup();
      fixture.detectChanges();
      spyOn(component.location, 'back');  
      let ele = fixture.debugElement.queryAll(By.css('.back-icon'));
      expect(ele.length).toBe(1);
      let backBtn: HTMLElement = ele[0].nativeElement;
      expect(backBtn).toHaveClass('back-icon');
      backBtn.click();
      expect(component.goBack).toBeDefined();
      expect(component.location.back).toHaveBeenCalled();
    });
  });
  describe('checks romance param type:', () => {
    function setup() {
      TestBed.configureTestingModule({
        declarations: [ GenreDashboardComponent ],
        imports: [RouterTestingModule],
        providers: [
          {provide: ActivatedRoute, useValue: {
              params: {type: 'romance'},
              snapshot: {
                  params: {
                    type: 'romance'
                  }
            } }
          },
          {provide: ShowsService, useValue: {
              romanceShows: {type: 'Popular In Romance', list: []}
            }
          }]
      })
      .compileComponents();
      const fixture = TestBed.createComponent(GenreDashboardComponent);
      const component = fixture.componentInstance;
      const showService = fixture.debugElement.injector.get(ShowsService);

      return { fixture, component, showService };
    }

    it('should create', () => {
      const { component } = setup();
      expect(component).toBeTruthy();
    });
    it('should verify the headline of the page correctly', () => {
      const { fixture } = setup();
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('.container .genre-name').textContent).toContain('Popular In Romance');
    });
    it('should verify component data correctly', () => {
      const { component, fixture } = setup();
      fixture.detectChanges();
      expect(component.genreType).toBe('romance');
      expect(component.genreData['type']).toBe('Popular In Romance');
      expect(component.genreData['list'].length).toBe(0);
    });
  });
  describe('checks action param type:', () => {
    function setup() {
      TestBed.configureTestingModule({
        declarations: [ GenreDashboardComponent ],
        imports: [RouterTestingModule],
        providers: [
          {provide: ActivatedRoute, useValue: {
              snapshot: {
                  params: {
                    type: 'action'
                  }
            } }
          },
          {provide: ShowsService, useValue: {
              actionShows: {type: 'Popular In Action', list: []}
            }
          }]
      })
      .compileComponents();
      const fixture = TestBed.createComponent(GenreDashboardComponent);
      const component = fixture.componentInstance;
      const showService = fixture.debugElement.injector.get(ShowsService);

      return { fixture, component, showService };
    }

    it('should create', () => {
      const { component } = setup();
      expect(component).toBeTruthy();
    });
    it('should verify the headline of the page correctly', () => {
      const { fixture } = setup();
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('.container .genre-name').textContent).toContain('Popular In Action');
    });
    it('should verify component data correctly', () => {
      const { component, fixture } = setup();
      fixture.detectChanges();
      expect(component.genreType).toBe('action');
      expect(component.genreData['type']).toBe('Popular In Action');
      expect(component.genreData['list'].length).toBe(0);
    });
  });
  describe('checks sciFi param type:', () => {
    function setup() {
      TestBed.configureTestingModule({
        declarations: [ GenreDashboardComponent ],
        imports: [RouterTestingModule],
        providers: [
          {provide: ActivatedRoute, useValue: {
              snapshot: {
                  params: {
                    type: 'sciFi'
                  }
            } }
          },
          {provide: ShowsService, useValue: {
              sciFiShows: {type: 'Popular In Science-Fiction', list: []}
            }
          }]
      })
      .compileComponents();
      const fixture = TestBed.createComponent(GenreDashboardComponent);
      const component = fixture.componentInstance;
      const showService = fixture.debugElement.injector.get(ShowsService);

      return { fixture, component, showService };
    }

    it('should create', () => {
      const { component } = setup();
      expect(component).toBeTruthy();
    });
    it('should verify the headline of the page correctly', () => {
      const { fixture } = setup();
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('.container .genre-name').textContent).toContain('Popular In Science-Fiction');
    });
    it('should verify component data correctly', () => {
      const { component, fixture } = setup();
      fixture.detectChanges();
      expect(component.genreType).toBe('sciFi');
      expect(component.genreData['type']).toBe('Popular In Science-Fiction');
      expect(component.genreData['list'].length).toBe(0);
    });
  });
  describe('checks horror param type:', () => {
    function setup() {
      TestBed.configureTestingModule({
        declarations: [ GenreDashboardComponent ],
        imports: [RouterTestingModule],
        providers: [
          {provide: ActivatedRoute, useValue: {
              snapshot: {
                  params: {
                    type: 'horror'
                  }
            } }
          },
          {provide: ShowsService, useValue: {
              horrorShows: {type: 'Popular In Horror', list: []}
            }
          }]
      })
      .compileComponents();
      const fixture = TestBed.createComponent(GenreDashboardComponent);
      const component = fixture.componentInstance;
      const showService = fixture.debugElement.injector.get(ShowsService);

      return { fixture, component, showService };
    }

    it('should create', () => {
      const { component } = setup();
      expect(component).toBeTruthy();
    });
    it('should verify the headline of the page correctly', () => {
      const { fixture } = setup();
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('.container .genre-name').textContent).toContain('Popular In Horror');
    });
    it('should verify component data correctly', () => {
      const { component, fixture } = setup();
      fixture.detectChanges();
      expect(component.genreType).toBe('horror');
      expect(component.genreData['type']).toBe('Popular In Horror');
      expect(component.genreData['list'].length).toBe(0);
    });
  });
});

class SpyLocation{}
