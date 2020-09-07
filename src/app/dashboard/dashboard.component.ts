import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

import {ShowsService} from '../service/shows.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('500ms ease-out', style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate('500ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit {

  currentSlide = 0;
  visibleShowsCount = 6;
  topShows = [];
  showList = [];
  dramaShows = {};
  actionShows = {};
  romanceShows = {};
  sciFiShows = {};
  horrorShows = {};

  constructor(private service: ShowsService) { }

  ngOnInit(): void {
    this.service.getAllShows().subscribe((data: any) => {
      this.showList = data as any[];
      this.topShows = this.showList.filter(obj => {
        return obj.rating.average > 8
      }).map(obj =>  {
        return {
          id: obj.id,
          src : obj.image.original,
          name : obj.name,
          rating : obj.rating.average,
          summary : obj.summary,
          language : obj.language,
          genres : obj.genres,
          url : obj.url
        };
      });
      this.createDataBasedOnGenre();
    });
  }

  // Creates data based on Genre to display in the dashboard.
  createDataBasedOnGenre(): void {
    this.dramaShows = {
      type: 'Popular in Drama',
      list : this.showList.filter(obj => 
        obj.genres.includes('Drama') || 
        obj.genres.includes('Family') || 
        obj.genres.includes('Comedy')
    )};
    this.service.dramaShows = this.dramaShows;

    this.romanceShows = {
      type: 'Popular in Romance',
      list : this.showList.filter(obj => 
        obj.genres.includes('Romance')
    )};
    this.service.romanceShows = this.romanceShows;

    this.actionShows = {
      type: 'Popular in Action',
      list : this.showList.filter(obj => 
        obj.genres.includes('Crime') || 
        obj.genres.includes('Action') || 
        obj.genres.includes('Thriller')
    )};
    this.service.actionShows = this.actionShows;

    this.sciFiShows = {
      type: 'Popular in Science-Fiction',
      list : this.showList.filter(obj => 
        obj.genres.includes('ScienceFiction') || 
        obj.genres.includes('Adventure') || 
        obj.genres.includes('Supernatural')
    )};
    this.service.sciFiShows = this.sciFiShows;

    this.horrorShows = {
      type: 'Popular in Horror',
      list : this.showList.filter(obj => 
        obj.genres.includes('Horror')
    )};
    this.service.horrorShows = this.horrorShows;
  }

  // Handles previous button click in the carousel to show previous item.
  onPreviousClick(): void {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.topShows.length - 1 : previous;
  }

  // Handles next button click in the carousel to show next item
  onNextClick(): void {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.topShows.length ? 0 : next;
  }
}
