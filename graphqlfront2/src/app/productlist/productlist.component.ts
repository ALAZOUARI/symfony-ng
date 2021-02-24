import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Product} from '../../models/product';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../@root/confirm-dialog/confirm-dialog.component';
import {Apollo, gql} from 'apollo-angular';
import {takeUntil} from 'rxjs/operators';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit , OnDestroy{

  protected onDestroy = new Subject<void>();
  displayedColumns: string[] = ['id', 'name', 'price', 'actions'];
  dataSource: Product[] = [] ;


  constructor(private dialog: MatDialog,
              private apollo: Apollo ,
              private productService: ProductService) { }
  ngOnInit(): void {
    this.fetchDataSource();
  }
  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
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
                          _id
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


  onRemoveAccount(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
      disableClose: false,
    });

    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this.onDestroy)).subscribe(isDeleteConfirmed => {
      console.log('removing: ', isDeleteConfirmed);
      if (isDeleteConfirmed) {
        this.productService.deleteprod('/api/products/' + id);
      }
    });

  }
}
