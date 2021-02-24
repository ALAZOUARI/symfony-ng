import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-productform',
  templateUrl: './productform.component.html',
  styleUrls: ['./productform.component.css']
})
export class ProductformComponent implements OnInit {

  currentitemId: string ;
  item: Product;
  form: FormGroup;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private productService: ProductService) { }


  ngOnInit(): void {
    this.currentitemId = this.activatedRoute.snapshot.params.id ;
    if (!!this.currentitemId){
      this.productService.getProductById('/api/products/' + this.currentitemId).valueChanges.subscribe(item => {
        this.item = item.data.product;
        console.log(this.item);
        console.log(this.currentitemId);
        this.initForm(item);
      });
    }
    else {
      this.initForm(null);
      console.log(this.currentitemId);
    }
  }
  private initForm(item: Product): void{
    this.form = new FormGroup({
      name: new FormControl(!!item ? item.name : null, [Validators.required]),
      price: new FormControl(!!item ? item.price : null, [Validators.required]),
    });
  }
  onSubmit(): void {
    const objecttosubmit: Product = {...this.item, ...this.form.value};
    console.log(this.form.value);
    this.productService.saveProd(objecttosubmit);
    this.router.navigate(['./products']);
  }


}
