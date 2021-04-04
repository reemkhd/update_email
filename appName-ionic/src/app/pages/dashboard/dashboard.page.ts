import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { ModalController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  user: User;

  constructor(
    private menu: MenuController,     
    private modalController: ModalController,
    private navCtrl: NavController,
    private route: Router,
    private alertService: AlertService,
    private authService: AuthService) { 
    this.menu.enable(true);
  }

  ngOnInit() {
    
  }
  dismissReset() {
    this.modalController.dismiss();
  }
  ionViewWillEnter() {
    this.authService.user().subscribe(
      user => {
        this.user = user;
      }
    );
  }
  reset_email(form: NgForm) {
    // , form.value.new_name
    this.authService.reset_email(form.value.email).subscribe(
      data => {
        this.alertService.presentToast("Your email reset");
      },
      error => {
        console.log(error);
        this.alertService.presentToast("error")
      },
      () => {
        this.dismissReset();
        this.navCtrl.navigateRoot('/dashboard');
      }
    );
  }
}