import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private modalController: ModalController,
    private navCtrl: NavController,
    private route: Router,
    private alertService: AlertService,
    private authService: AuthService,
    ) { }

  ngOnInit() {
  }

  // Dismiss Modal
  dismissReset() {
    this.modalController.dismiss();
  }

}