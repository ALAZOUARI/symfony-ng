import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-productform',
  templateUrl: './productform.component.html',
  styleUrls: ['./productform.component.css']
})
export class ProductformComponent implements OnInit {
  form: FormGroup;
  currentitemId: string ;
  item: Product;

  constructor() { }

  ngOnInit(): void {
    this.initForm(null);
  }

  private initForm(item: Product): void {
    this.form = new FormGroup({
      titre: new FormControl(!!item ? item.name : null, [Validators.required]),
      type: new FormControl(!!item ? item.price : null, [Validators.required]),
    });
  }
  onSubmit(): void {
    const objecttosubmit: Product = {...this.form.value};
    console.log(this.form.value);
    this.publicationService.savePub(objecttosubmit).then(() => {
      this.router.navigate(['./publications']);
    });

}
