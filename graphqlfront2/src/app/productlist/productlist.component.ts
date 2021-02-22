import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Product} from '../../models/product';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../@root/confirm-dialog/confirm-dialog.component';
import {Apollo, gql} from 'apollo-angular';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit{

  protected onDestroy = new Subject<void>();
  displayedColumns: string[] = ['id', 'name', 'price'];
  dataSource: Product[] = [] ;


  constructor(private dialog: MatDialog,
              private apollo: Apollo) { }
  ngOnInit(): void {
    this.fetchDataSource();
  }

  // tslint:disable-next-line:typedef
  private fetchDataSource(): void{
    this.apollo
      .watchQuery({
        query: gql`
          {
            products{
                  edges{
                      node{
                          id
                          name
                          price
                          }
                      }
                  }
          }
        `})
      .valueChanges.subscribe((res: any) => {
      console.log({res});
      const edges: any[] = res.data.products.edges;
      console.log('Ayyy');
      this.dataSource = edges.map(item => item.node);
    });
  }


}
