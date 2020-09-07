import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ShowsService } from '../service/shows.service';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.scss']
})
export class ShowDetailsComponent implements OnInit {

  isLoaded = false;
  showId = 0;
  showDetails = {};
  showSeasonList = [];

  constructor(
    private actRoute: ActivatedRoute, 
    private service: ShowsService, 
    public location: Location
  ) { }

  ngOnInit(): void {
    this.showId = this.actRoute.snapshot.params.id;
    this.service.getShowById(this.showId).subscribe(data => {
      this.isLoaded = true;
      this.showDetails = data;
    });
    this.service.getShowSeasonList(this.showId).subscribe(data => {
      this.showSeasonList = data;
    });
  }

  // Handles back button click in the details page.
  // Navigates user to previous screen based on history.
  goBack(): void{
    this.location.back();
  }

}
