import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, switchMap, distinctUntilChanged } from 'rxjs/internal/operators';
import { Router } from '@angular/router';
import { ShowsService } from '../service/shows.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  myForm: FormGroup;
  results: any[] = [];

  constructor(
    private service: ShowsService, 
    private router:Router
  ) {}

  ngOnInit(): void {
      this.myForm = new FormGroup({
        searchTerm: new FormControl(''),
      });
      this.myForm.get('searchTerm').valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => this.service.search(value))
      ).subscribe(users => this.results = users);
      
  }

  // Handles header icon click action.
  // Navigates user to Dashboard/Home screen.
  navigateToHome(): void {
    this.router.navigate(['']);
  } 

  // Track function to handle rendering of data in UI based on id only.
  showsTrackByMethod(index:number, el:any): number {
    return el.show.id;
  }
}

