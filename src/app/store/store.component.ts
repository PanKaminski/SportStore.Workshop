import { Component } from "@angular/core";
import { Product } from "../model/product.model";
import { ProductRepository } from "../model/product.repository";

@Component({
    selector: "store",
    templateUrl: "store.component.html"
})
export class StoreComponent{
    public selectedCategory: string | null = null;
    public productsPerPage: number = 4;
    public selectedPage: number = 1;

    constructor(private repository: ProductRepository){ }

    get products(): Product[] {
        let pageIndex = (this.selectedPage - 1) * this.productsPerPage;
        return this.repository.getProducts(this.selectedCategory).slice(pageIndex, pageIndex + this.productsPerPage);
    }

    get categories() : string[] {
        return this.repository.getCategories();
    }

    changeCategory(newCategory: string | null = null) {
        this.selectedCategory = newCategory;
    }

    changePage(newPage: number) {
        this.selectedPage = newPage;
    }

    changePageSize(newPageSize: number) {
        this.productsPerPage = Number(newPageSize);
        this.changePage(1);
    }

    get pageCount(): number{
        return Math.ceil(this.repository.getProducts(this.selectedCategory).length / this.productsPerPage)
    }

    get pageNumbers(): number[] {
        return Array(Math.ceil(this.repository.getProducts(this.selectedCategory).length / this.productsPerPage))
        .fill(0).map((x, i) => i + 1);
    }
}