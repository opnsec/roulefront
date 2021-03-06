/// <reference types="googlemaps" />
import { Component, OnInit } from '@angular/core';
import { MapsAPILoader } from "@agm/core";
import { ViewChild } from '@angular/core';
import { TripsService, Trip } from '../api/trips.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User, AuthService } from '../api/auth.service';
import { MatchService, Match } from '../api/match.service';

@Component({
  selector: 'app-trip-details-page',
  templateUrl: './trip-details-page.component.html',
  styleUrls: ['./trip-details-page.component.css']
})
export class TripDetailsPageComponent implements OnInit {
  tripId: string;
  currentTrip: Trip;
  connectedUser: User;
  matchDetails: Match;

  constructor(
    private myActivatedRouteServ: ActivatedRoute,
    private myRouterServ: Router,
    private myAuthServ: AuthService,
    private myTripServ: TripsService,
    private myMatchServ: MatchService,
  ) { }

  ngOnInit() {
    this.myActivatedRouteServ.paramMap
      .subscribe((myParams) => {
        this.tripId = myParams.get("tripId");
        this.getTripDetails();
      })
      this.getConnectedUserDetails();
      this.checkIfMatched();
  };

  getTripDetails(){
    this.myTripServ.getTripDetails(this.tripId)
      .then((response: any) => {
        this.currentTrip = response;
        console.log(response)
      })
      .catch((err) => {
        alert("Oups! Les détails de ce trajet ne sont pas actuellement disponible.")
        console.log(err)
      })
  }

  getConnectedUserDetails(){
    this.myAuthServ.check()
      .then((response: any) => {
        this.connectedUser = response.userDoc;
        console.log(this.connectedUser)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  checkIfMatched(){
    this.myMatchServ.checkMatch(this.tripId)
      .then((response: any) => {
        this.matchDetails = response;
        console.log(this.matchDetails)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  deleteTrip(){
    const confirmRequest = confirm("Voulez-vous supprimer ce trajet?");

    if(confirmRequest){
    this.myTripServ.deleteTrip(this.tripId)
      .then((response) => {
        this.myRouterServ.navigateByUrl("/dashboard");
        alert("Ce voyage a été supprimé")
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }

}
