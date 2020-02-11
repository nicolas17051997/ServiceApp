import { Component, OnInit } from '@angular/core';
import { TreeApiService } from '../../code/api';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { slideInAnimation } from '../../code/extensions';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  
  providers: [TreeApiService]
})
export class ContentComponent implements OnInit {

  constructor(private readonly api: TreeApiService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.router.url == '/')
      this.router.navigate(['/calc'], { relativeTo: this.route });

  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData.state;
  }

}
