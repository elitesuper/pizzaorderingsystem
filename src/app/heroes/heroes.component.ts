import { Component, OnInit } from '@angular/core';
import { VegToppings, nonVegToppings } from '../mock-toppings';
import {Topping} from '../topping';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  toppings = VegToppings;
  ntoppings = nonVegToppings;
  pizatype: any[] = [
  {name:"Small",price:5},
  {name:"Medium",price:7},
  {name:"Large",price:8},
  {name:"Extra Large",price:9}
  ]
  piza: any[] = [];
  allpiza: any[] = [
    {
      name:"small",
      price:5,
      pdts: new Array<any>
    },
    {
      name:"medium",
      price:7,
      pdts:new Array<any>
    },
    {
      name:"large",
      price:8,
      pdts:new Array<any>
    },
    {
      name:"elarge",
      price:9,
      pdts: new Array<any>
    }
  ]

  extralargepiza: Topping[] = [];

  constructor() { }

  ngOnInit(): void {
  }


  onSelect(topping: Topping, number: any): void {
     if(this.allpiza[number].pdts.filter((item:any) => item.name === topping.name).length === 0){
        this.allpiza[number].pdts.push(topping);
     }else{
        this.allpiza[number].pdts = this.allpiza[number].pdts.filter((item:any) => item.name !== topping.name);
     }
  }
  onSelected(topping: Topping, number: any): boolean {
     if(this.allpiza[number].pdts.filter((item:any) => item.name === topping.name).length === 0){
        return false;
     }
     return true;
  }
  totalPrice(number:any){
    var price = 0;
    var ntop = 0;
    if(this.allpiza[number].pdts.length !==0){
      price += this.allpiza[number].price
      this.allpiza[number].pdts.map((item:any)=>{
        price += item.price
        ntop += item.ntopping
      })

      return this.checkoffer(price, this.allpiza[number].name, ntop);
    }
    return {offer:"", price:price}
  }
  checkoffer(price:any, type:any, ntop:any){
    var offer = ""
    var newprice = price
    if(type==="medium"&& ntop>=2){
      newprice = 5;
      offer = "Offer1"
    }else if(type==="medium"&& ntop>=4){
      newprice = 9;
      offer = "Offer2"
    }else if(type==="large"&& ntop>=4){
      newprice = price/2;
      offer = "Offer3"
    }
    return {offer:offer, price:newprice}
  }
}
