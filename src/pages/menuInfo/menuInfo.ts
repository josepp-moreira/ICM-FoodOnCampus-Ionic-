import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddNewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menuInfo',
  templateUrl: 'menuInfo.html',
})
export class MenuInfoPage {

  private name: any;
  private meal: any;
  private date: any;
  private closed: any;
  private items: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.name = navParams.get("name")
    this.meal = navParams.get("meal")
    this.date = navParams.get("date")
    this.closed = navParams.get("closed")
    this.items = navParams.get("items")
  }

}
