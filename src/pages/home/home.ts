import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { MenuInfoPage } from '../menuInfo/menuInfo';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  menuInfoPage = MenuInfoPage;
  private menus: Array<any> = [];
  private menusDone: Array<any> = [];

  constructor(public navCtrl: NavController, public loading: LoadingController, private http: Http) {
    this.fetchData();
  }

  fetchData() {
    this.http.get("../../assets/data/menus.json").map(res => res.json()).subscribe(data => {
      this.menus = data.menus.menu;
      //console.log(this.menus);
    })
  }

  processData(){
    let auxMenu = this.menus;
    let canteen: Array<any> = [];
    let meal: Array<any> = [];
    let date: Array<any> = [];
    let closed: Array<any> = [];

    for(let i = 0; i < auxMenu.length; i++){
      let auxDate = auxMenu[i].attributes.date.split(" ")
      let day = auxDate[1]
      let month = this.translateMonth(auxDate[2])
      let year = auxDate[3]
      let weekday = this.translateWeekDay(auxMenu[i].attributes.weekday)
      if(auxMenu[i].attributes.disabled == 'Encerrado - não há fornecimento de refeições')
        closed.push(true)
      else
        closed.push(false)
      canteen.push(auxMenu[i].attributes.canteen)
      meal.push(auxMenu[i].attributes.meal)
      date.push(weekday+', '+day+' de '+month+' de '+year)
      //console.log(canteen[i]+' - '+meal[i]+' - '+date[i])
    }

    for(let i = 0; i < auxMenu.length; i++){
      this.menusDone.push({ 'name':canteen[i], 'meal':meal[i], 'date':date[i], 'closed':closed[i], 'items':auxMenu[i].items})
    }
  }

  refreshList() {
    this.processData();
  }

  translateMonth(str:string) : any {
    switch (str) {
      case 'Jan':
          return 'Janeiro'
      case 'Feb':
          return 'Fevereiro'
      case 'Mar':
          return 'Março'
      case 'Apr':
          return 'Abril'
      case 'May':
          return 'Maio'
      case 'June':
          return 'Junho'
      case 'July':
          return 'Julho'
      case 'Aug':
          return 'Agosto'
      case 'Sept':
          return 'Setembro'
      case 'Oct':
          return 'Outubro'
      case 'Nov':
          return 'Novembro'
      case 'Dec':
          return 'Dezembro'
      default:
          return ''
    }
  }

  translateWeekDay(str:string) : any {
    switch (str) {
      case 'Sunday':
          return 'Domingo'
      case 'Monday':
          return 'Segunda'
      case 'Tuesday':
          return 'Terça'
      case 'Wednesday':
          return 'Quarta'
      case 'Thursday':
          return 'Quinta'
      case 'Friday':
          return 'Sexta'
      case 'Saturday':
          return 'Sábado'
      default:
          return ''
    }
  }

  cardClick(menu:any) {
    this.navCtrl.push(
      this.menuInfoPage,
      { 
        name: menu.name, 
        meal: menu.meal, 
        date: menu.date, 
        closed: menu.closed, 
        items: menu.items 
      }
    )
  }
}
