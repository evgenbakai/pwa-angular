import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { DataService } from './data.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pwa-test';
  data: any;
  loading: boolean;

  constructor(
    private upd: SwUpdate,
    private dataService: DataService) {
    upd.available.subscribe(event => {

      console.log('There is an update for your app, event: ', event);
      upd.activateUpdate().then(() => document.location.reload());
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.dataService.get().pipe(finalize(() => {
      this.loading = false;
    })).subscribe(response => {
      this.data = response;
    });
  }
}
