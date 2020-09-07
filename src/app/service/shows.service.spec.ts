import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable, empty, of } from 'rxjs';

import { ShowsService } from './shows.service';

describe('ShowsService', () => {
  let showService: ShowsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ShowsService ],
    });
    showService = TestBed.inject(ShowsService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(showService).toBeTruthy();
  });
  it(`should fetch all shows as an Observable`, async(inject([HttpTestingController, ShowsService],
    (httpClient: HttpTestingController, showService: ShowsService) => {
        showService.getAllShows().subscribe((shows: any) => {
          expect(shows.length).toBe(1);
        });
        let req = httpMock.expectOne('http://api.tvmaze.com/shows');
        expect(req.request.method).toBe("GET");
        req.flush(showList);
        httpMock.verify();
    })
  ));
  it(`should fetch shows by id as an Observable`, async(inject([HttpTestingController, ShowsService],
      (httpClient: HttpTestingController, showService: ShowsService) => {
          showService.getShowById(1)
          .subscribe((show: any) => {
            expect(show.length).toBe(1);
          });
        let req = httpMock.expectOne('http://api.tvmaze.com/shows/1');
        expect(req.request.method).toBe("GET");
        req.flush(showList);
        httpMock.verify();
      })
  ));
  it(`should fetch all seasons of a show as an Observable`, async(inject([HttpTestingController, ShowsService],
    (httpClient: HttpTestingController, showService: ShowsService) => {
        showService.getShowSeasonList(1).subscribe((shows: any) => {
          expect(shows.length).toBe(1);
        });
        let req = httpMock.expectOne('http://api.tvmaze.com/shows/1/seasons');
        expect(req.request.method).toBe("GET");
        req.flush(showList);
        httpMock.verify();
    })
  ));
  it(`should verify search functionality with valid value and return result as an Observable`, 
    async(inject([ShowsService],
       ( showService: ShowsService) => {
        showService.search('sara')
        .subscribe((shows: any) => {
          expect(shows.length).toBe(1);
        });
        let params = { key: 'q', value: 'sara' };
      let req = httpMock.expectOne(`http://api.tvmaze.com/search/shows?${params.key}=${params.value}`);
      expect(req.request.method).toBe("GET");
      req.flush(showList);
      httpMock.verify();
    })));
    it(`should verify search functionality with null and return result as an Observable`, 
      async(inject([ShowsService],
        (showService: ShowsService) => {
          showService.search('')
          .subscribe((shows: any) => {
            expect(shows).toBe(null);
          });
    })));
  });
  
const showList = [
  {
    "id":1,
    "url":"http://www.tvmaze.com/shows/4/arrow",
    "name":"Arrow",
    "type":"Scripted",
    "language":"English",
    "genres":[
       "Drama",
       "Action",
       "Science-Fiction"
    ],
    "status":"Ended",
    "runtime":60,
    "premiered":"2012-10-10",
    "officialSite":"http://www.cwtv.com/shows/arrow",
    "schedule":{
       "time":"21:00",
       "days":[
          "Tuesday"
       ]
    },
    "rating":{
       "average":7.4
    },
    "weight":98,
    "network":{
       "id":5,
       "name":"The CW",
       "country":{
          "name":"United States",
          "code":"US",
          "timezone":"America/New_York"
       }
    },
    "webChannel":null,
    "externals":{
       "tvrage":30715,
       "thetvdb":257655,
       "imdb":"tt2193021"
    },
    "image":{
       "medium":"http://static.tvmaze.com/uploads/images/medium_portrait/213/534017.jpg",
       "original":"http://static.tvmaze.com/uploads/images/original_untouched/213/534017.jpg"
    },
    "summary":"<p>After a violent shipwreck, billionaire playboy Oliver Queen was missing and presumed dead for five years before being discovered alive on a remote island in the Pacific. He returned home to Starling City, welcomed by his devoted mother Moira, beloved sister Thea and former flame Laurel Lance. With the aid of his trusted chauffeur/bodyguard John Diggle, the computer-hacking skills of Felicity Smoak and the occasional, reluctant assistance of former police detective, now beat cop, Quentin Lance, Oliver has been waging a one-man war on crime.</p>",
    "updated":1594121583,
    "_links":{
       "self":{
          "href":"http://api.tvmaze.com/shows/4"
       },
       "previousepisode":{
          "href":"http://api.tvmaze.com/episodes/1744752"
       }
    }
 }
];