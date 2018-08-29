import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ConfigComponent } from '../../components/config/config.component';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  config = ""
  
  constructor(private api: ApiService) { }

  ngOnInit() {
    // var reader = new FileReader();
    // reader.readAsText("../../assets/config.json");
  }

  showConfig() {
    this.api.getConfig().subscribe((data: ConfigComponent) => this.config = {
      
    });
  }
}
