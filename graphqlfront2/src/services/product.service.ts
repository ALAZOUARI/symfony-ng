import { Injectable } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Product} from '../models/product';


const  GET_ALL_PRODUCTS = gql `
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
        `;
const GET_PRODUCT_BY_ID = gql`
query GetProductById($productId: ID!){
  product(id: $productId){
    id
    name
    price
  }
}
`;
const CREATE_PRODUCT = gql `
mutation createProduct($name: String! , $price: Float!){
  createProduct(input: {name: $name , price: $price}){
  clientMutationId
  }

}
`;
const UPDATE_PRODUCT = gql `
mutation updateProduct($id:ID! ,$name: String! , $price: Float!){
  updateProduct(input: {id: $id ,name: $name , price: $price}){
  clientMutationId
  }

}
`;

const DELETE_PRODUCT = gql `
mutation deleteProduct($id: ID! ){
   deleteProduct(input:{id : $id}){
    clientMutationId
  }

}
`;
@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private apollo: Apollo) { }

  getProductById(id: string): any{
    return this.apollo.watchQuery({
      query: GET_PRODUCT_BY_ID,
      variables: {
        productId: id,
      },
    });
  }

  getAllProducts(): any{
    return this.apollo
      .watchQuery({
        query: GET_ALL_PRODUCTS});
  }
  saveProd(objecttosubmit: Product): any {
    this.apollo.mutate({
      mutation: CREATE_PRODUCT,
      refetchQueries: [{query: GET_ALL_PRODUCTS}],
      variables: {
        name: objecttosubmit.name,
        price: Number(objecttosubmit.price),
      },
    }).subscribe(() => {
      console.log('created');
    });
  }
  updateProd(objecttosubmit: Product): any {
    this.apollo.mutate({
      mutation: UPDATE_PRODUCT,
      refetchQueries: [{query: GET_ALL_PRODUCTS}],
      variables: {
        name: objecttosubmit.name,
        price: Number(objecttosubmit.price),
      },
    }).subscribe(() => {
      console.log('created');
    });
  }
  deleteprod(id: any): any{
    this.apollo.mutate({
      mutation: DELETE_PRODUCT,
      refetchQueries: [{query: GET_ALL_PRODUCTS}],
      variables: {
        id,
      },
    }).subscribe(() => {
      this.getAllProducts();
    });
  }
}
