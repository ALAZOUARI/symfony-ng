
import { NgModule } from '@angular/core';
import {MaterialModule} from './material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http';
import {ConfirmDialogModule} from './confirm-dialog/confirm-dialog.module';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';



@NgModule({
  imports: [
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    ConfirmDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserModule,
    CommonModule,
    MaterialModule,

  ],
  exports: [
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    ConfirmDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserModule,
    CommonModule,
    MaterialModule,
  ]
})
export class SharedModule { }
