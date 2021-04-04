import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-new-pass',
  templateUrl: './new-pass.page.html',
  styleUrls: ['./new-pass.page.scss'],
})
export class NewPassPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private navCtrl: NavController,
    private route: Router,
    private alertService: AlertService,
    private authService: AuthService,
    ) { }

  ngOnInit() {
  }
  // Dismiss Login Modal
  dismissReset() {
    this.modalController.dismiss();
  }
  new_pass(form: NgForm) {
    this.authService.create_reset(form.value.email, form.value.password).subscribe(
      data => {
        this.alertService.presentToast("reset password");
      },
      error => {
        console.log(error);
        this.alertService.presentToast("error")
      },
      // () => {
      //   this.dismissReset();
      //   this.navCtrl.navigateRoot('/dashboard');
      // }
    );
  }
}