import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ShowsService } from '../service/shows.service';

@Component({
  selector: 'genre-dashboard',
  templateUrl: './genre-dashboard.component.html',
  styleUrls: ['./genre-dashboard.component.scss']
})
export class GenreDashboardComponent implements OnInit {

  genreType = '';
  genreData = {};

  constructor(
    private actRoute: ActivatedRoute, 
    private service: ShowsService,  
    public location: Location
  ) { }

  ngOnInit(): void {
    this.genreType = this.actRoute.snapshot.params.type;
    this.setGenreData();
  }

  // Creates data based on Genre type to display in the dashboard UI.
  setGenreData(): void {
    switch(this.genreType){
      case 'drama': { 
        this.genreData = this.service.dramaShows;
        break;
       };
      case 'romance': {
        this.genreData = this.service.romanceShows;
        break;
      }
      case 'action': {
        this.genreData = this.service.actionShows;
        break;
      }
      case 'sciFi': {
        this.genreData = this.service.sciFiShows;
        break;
      }
      case 'horror': {
        this.genreData = this.service.horrorShows;
        break;
      }
    }
  }

  // Handles back button click in the dashoard.
  // Navigates user to previous screen based on history.
  goBack(): void{
    this.location.back();
  }
}
