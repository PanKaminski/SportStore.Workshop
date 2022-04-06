import { Injectable } from "@angular/core";
import { Product } from "./product.model";
import { StaticDataSource } from "./static.datasource";

@Injectable()
export class ProductRepository{
    private products: Product[] = [];
    private categories: string[] = [];

    constructor(private dataSOurce: StaticDataSource){
        dataSOurce.getProducts().subscribe(data => {
            this.products = data;
            this.categories = data.filter(p => p.category as string !== undefined)
            .map(p => p.category as string)
            .filter((c, index, array) => array.indexOf(c) == index)
            .sort();
        })
    }

    getProducts(category: string | null = null): Product[] {
        return this.products.filter(p => category == null || p.category === category)
    }

    getProduct(id: number): Product {
        return this.products.find(p => p.id === id) as Product;
    }

    getCategories() : string[] {
        return this.categories;
    }
}