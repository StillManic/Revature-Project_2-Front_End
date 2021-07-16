import { Component, ɵɵsetComponentScope } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from "@angular/common";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private location: Location,
    private route: Router,
  ) { }

  path: string = ''
  title = 'project-two';
  name: string = '';
  ngOnInit(): void {
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.path = this.location.path()
      }
    }
  )
  }
}
