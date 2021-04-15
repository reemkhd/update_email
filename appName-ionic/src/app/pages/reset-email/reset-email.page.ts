import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { ModalController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-reset-email',
  templateUrl: './reset-email.page.html',
  styleUrls: ['./reset-email.page.scss'],
})
export class ResetEmailPage implements OnInit {

  user: User;

  constructor(    
    private menu: MenuController,     
    private modalController: ModalController,
    private navCtrl: NavController,
    private route: Router,
    private alertService: AlertService,
    private authService: AuthService) { 
  }

  ngOnInit() {
  }
  reset_email(form: NgForm) {
    // , form.value.new_name
    this.authService.user().subscribe(
      user => {this.user = user;});
    this.authService.reset_email(form.value.email, this.user).subscribe(
      data => {
        this.alertService.presentToast("Your email reset");
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

