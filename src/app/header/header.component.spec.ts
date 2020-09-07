import { ComponentFixture, TestBed, tick, fakeAsync} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs/';

import { HeaderComponent } from './header.component';
import { ShowsService} from '../service/shows.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  describe('checks:', () => {
    function setup() {
      TestBed.configureTestingModule({
        declarations: [ HeaderComponent ],
        imports: [ReactiveFormsModule, RouterTestingModule],
        providers: [
          {provide: ShowsService, useValue: {
            search: () => of(showList)
          }},
        ] 
      })
      .compileComponents();
      fixture = TestBed.createComponent(HeaderComponent);
      fixture.detectChanges();
      component = fixture.componentInstance;
      component.ngOnInit();
      const showService = fixture.debugElement.injector.get(ShowsService);

      return { fixture, component, showService };
    }
    
    it('component should create', () => {
      const { component } = setup();
      expect(component).toBeTruthy();
      expect(component.myForm.valid).toBeTruthy();
      let search = component.myForm.controls['searchTerm'];
      expect(search.valid).toBeTruthy();
    });

    it('search functionality correctly', fakeAsync(() => {
      const { fixture } = setup();
      let ele = fixture.debugElement.queryAll(By.css('input'));
      expect(ele.length).toBe(1);
      let inputElement = ele[0].nativeElement;
      expect(inputElement).toHaveClass('search-input');
      component.myForm.controls['searchTerm'].setValue('sara');
      tick(300);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.results.length).toBe(2);
      });
    }));

  });
  describe('checks:', () => {
    function setup() {
      TestBed.configureTestingModule({
        declarations: [ HeaderComponent ],
        imports: [ReactiveFormsModule, RouterTestingModule],
        providers: [
          {provide: ShowsService, useValue: {
            search: () => of([])
           }},
           { provide: Router, useValue: routerSpy }
        ] 
      })
      .compileComponents();
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      component.ngOnInit();
      const showService = fixture.debugElement.injector.get(ShowsService);

      return { fixture, component, showService };
    }
    
    it('component should create', () => {
      const { component } = setup();
      expect(component).toBeTruthy();
      expect(component.myForm.valid).toBeTruthy();
      let search = component.myForm.controls['searchTerm'];
      expect(search.valid).toBeTruthy();
    });
  
    it('should verify route navigate correctly', () => {
      const { fixture } = setup();
      let ele = fixture.debugElement.queryAll(By.css('.logo'));
      expect(ele.length).toBe(1);
      let logoElement = ele[0].nativeElement;
      expect(logoElement).toHaveClass('logo');
      logoElement.click();
      fixture.detectChanges();
      expect (routerSpy.navigate).toHaveBeenCalledWith(['']);
    });
  });
});

var showList = [
   {
      "score":1.893501,
      "show":{
         "id":32000,
         "url":"http://www.tvmaze.com/shows/32000/kings-game-the-animation",
         "name":"King's Game The Animation",
         "type":"Animation",
         "language":"Japanese",
         "genres":[
            "Anime",
            "Horror"
         ],
         "status":"Ended",
         "runtime":25,
         "premiered":"2017-10-05",
         "officialSite":"https://kingsgame-anime.com",
         "schedule":{
            "time":"23:30",
            "days":[
               "Thursday"
            ]
         },
         "rating":{
            "average":null
         },
         "weight":0,
         "network":{
            "id":167,
            "name":"AT-X",
            "country":{
               "name":"Japan",
               "code":"JP",
               "timezone":"Asia/Tokyo"
            }
         },
         "webChannel":null,
         "externals":{
            "tvrage":null,
            "thetvdb":332981,
            "imdb":null
         },
         "image":{
            "medium":"http://static.tvmaze.com/uploads/images/medium_portrait/130/325239.jpg",
            "original":"http://static.tvmaze.com/uploads/images/original_untouched/130/325239.jpg"
         },
         "summary":"<p>An entire high school class of 32 people receive a message on their cellphones from a person known only as the \"King.\" The messages contain orders that the students must obey, or they risk the punishment of death. With their lives on the line, the students soon find out that the orders are getting more and more extreme as time goes on.</p>",
         "updated":1573857002,
         "_links":{
            "self":{
               "href":"http://api.tvmaze.com/shows/32000"
            },
            "previousepisode":{
               "href":"http://api.tvmaze.com/episodes/1347956"
            }
         }
      }
   },
      {
         "score":1.893501,
         "show":{
            "id":32000,
            "url":"http://www.tvmaze.com/shows/32000/kings-game-the-animation",
            "name":"King's Game The Animation",
            "type":"Animation",
            "language":"Japanese",
            "genres":[
               "Anime",
               "Horror"
            ],
            "status":"Ended",
            "runtime":25,
            "premiered":"2017-10-05",
            "officialSite":"https://kingsgame-anime.com",
            "schedule":{
               "time":"23:30",
               "days":[
                  "Thursday"
               ]
            },
            "rating":{
               "average":null
            },
            "weight":0,
            "network":{
               "id":167,
               "name":"AT-X",
               "country":{
                  "name":"Japan",
                  "code":"JP",
                  "timezone":"Asia/Tokyo"
               }
            },
            "webChannel":null,
            "externals":{
               "tvrage":null,
               "thetvdb":332981,
               "imdb":null
            },
            "image":{
               "medium":"http://static.tvmaze.com/uploads/images/medium_portrait/130/325239.jpg",
               "original":"http://static.tvmaze.com/uploads/images/original_untouched/130/325239.jpg"
            },
            "summary":"<p>An entire high school class of 32 people receive a message on their cellphones from a person known only as the \"King.\" The messages contain orders that the students must obey, or they risk the punishment of death. With their lives on the line, the students soon find out that the orders are getting more and more extreme as time goes on.</p>",
            "updated":1573857002,
            "_links":{
               "self":{
                  "href":"http://api.tvmaze.com/shows/32000"
               },
               "previousepisode":{
                  "href":"http://api.tvmaze.com/episodes/1347956"
               }
            }
         }
      }
];
