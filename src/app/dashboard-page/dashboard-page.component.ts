import { Component, OnInit } from "@angular/core";
import { AuthService, User } from "../api/auth.service";
import { TripsService, Trip, Location } from "../api/trips.service";
import {
  faPencilAlt,
  faMobileAlt,
  faEnvelope,
  faKey
} from "@fortawesome/free-solid-svg-icons";
import { MatchService } from "../api/match.service";

@Component({
  selector: "app-dashboard-page",
  templateUrl: "./dashboard-page.component.html",
  styleUrls: ["./dashboard-page.component.css"]
})
export class DashboardPageComponent implements OnInit {
  userData: User;
  faPencilAlt = faPencilAlt;
  faMobileAlt = faMobileAlt;
  faEnvelope = faEnvelope;
  faKey = faKey;

  constructor(
    public myAuthServ: AuthService,
    private myTripServ: TripsService,
    private myMatchServ: MatchService
  ) {}

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    this.myAuthServ
      .check()
      .then((response: any) => {
        this.userData = response.userDoc;
      })
      .catch(err => {
        console.log(err);
      });
  }
}
