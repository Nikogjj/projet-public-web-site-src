import fs from "fs/promises"
import { json } from "stream/consumers";

export class ProductModel{
    /**
     * 
     * @param {{nom:string,taille:string,prix:string}} newProduct 
     * @returns 
     */
    static createProduct(newProduct){

        return fs.readFile("models/products.json",{
            encoding:"utf-8"
        })
        .then((productsJSON)=>{
            console.log("productsJSON : ",productsJSON.json());
            const products = JSON.parse(productsJSON);
            products.push(newProduct);
            const newProductsJSON = JSON.stringify(products);
            console.log("newProductsJSON : ",newProductsJSON);
            fs.writeFile("models/products.json",newProductsJSON);
            return newProduct;
        })
        .catch((error)=>{
            return error
        })
        .finally((product)=>{
            return product;
        })
    }
}