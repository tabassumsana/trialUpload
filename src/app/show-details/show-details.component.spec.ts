import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import {of} from 'rxjs/';
import { By } from '@angular/platform-browser';

import { ShowDetailsComponent } from './show-details.component';
import { ShowsService} from '../service/shows.service';

const showData = {
          'id': 1,
          'url': 'http://www.tvmaze.com/shows/4/arrow',
          'name': 'Arrow',
          'type': 'Scripted',
          'language': 'English',
          'genres': [
             'Drama',
             'Action',
             'Science-Fiction'
          ],
          'status': 'Ended',
          'runtime': 60,
          'premiered': '2012-10-10',
          'officialSite': 'http://www.cwtv.com/shows/arrow',
          'schedule': {
             'time':'21:00',
             'days':[
                'Tuesday'
             ]
          },
          'rating': {
             'average':7.4
          },
          'weight': 98,
          'network': {
             'id':5,
             'name':'The CW',
             'country':{
                'name':'United States',
                'code':'US',
                'timezone':'America/New_York'
             }
          },
          'webChannel': null,
          'externals': {
             'tvrage':30715,
             'thetvdb':257655,
             'imdb':'tt2193021'
          },
          'image': {
             'medium':'http://static.tvmaze.com/uploads/images/medium_portrait/213/534017.jpg',
             'original':'http://static.tvmaze.com/uploads/images/original_untouched/213/534017.jpg'
          },
          'summary': '<p>After a violent shipwreck, billionaire playboy Oliver Queen was missing and presumed dead for five years before being discovered alive on a remote island in the Pacific. He returned home to Starling City, welcomed by his devoted mother Moira, beloved sister Thea and former flame Laurel Lance. With the aid of his trusted chauffeur/bodyguard John Diggle, the computer-hacking skills of Felicity Smoak and the occasional, reluctant assistance of former police detective, now beat cop, Quentin Lance, Oliver has been waging a one-man war on crime.</p>',
          'updated': 1594121583,
          '_links': {
             'self':{
                'href':'http://api.tvmaze.com/shows/4'
             },
             'previousepisode':{
                'href':'http://api.tvmaze.com/episodes/1744752'
             }
          }
       };

describe('ShowDetailsComponent', () => {
  let component: ShowDetailsComponent;
  let fixture: ComponentFixture<ShowDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDetailsComponent ],
      imports: [RouterTestingModule],
      providers: [{ 
            provide: ActivatedRoute, useValue: {
               params: {id: 1},
               snapshot: { params: { id: 1 } } }
         }, {
            provide: ShowsService, useValue: { 
               getShowById: () => of(showData), getShowSeasonList: () => of([]) }
         },
         { provide: Location, useClass: SpyLocation }
      ]       
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should verify show id', () => {
    expect(component.showId).toBe(1);
  });
  it('should verify show data', () => {
    expect(component.showDetails).toBe(showData);
  });
  it('should verify the headline of the page correctly', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.detail-container .show-name').textContent).toContain('Arrow');
  });
  it('should have goBack method and should call location.back', () => {
   spyOn(component.location, 'back');  
   const ele = fixture.debugElement.queryAll(By.css('.back-icon'));
   expect(ele.length).toBe(1);
   const backBtn: HTMLElement = ele[0].nativeElement;
   expect(backBtn).toHaveClass('back-icon');
   backBtn.click();
   expect(component.goBack).toBeDefined();
   expect(component.location.back).toHaveBeenCalled();
   });
});

class SpyLocation{}