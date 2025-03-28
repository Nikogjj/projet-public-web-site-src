import fs from "fs/promises"

export class ProductModel{
    /**
     * 
     * @param {{nom:string,taille:string,prix:string,id:string}} newProduct 
     * @returns 
     */
    static async createProduct(newProduct){

        return fs.readFile("models/products.json",{
        })
        .then((productsJSON)=>{
            const bdd = JSON.parse(productsJSON);
            newProduct.id=bdd.length;
            console.log(newProduct)
            bdd.push(newProduct);
            fs.writeFile("models/products.json",JSON.stringify(bdd));
            return newProduct;
        })
        .catch((error)=>{
            return error
        })
        .finally((product)=>{
            return product;
        })
    }
    /**
     * 
     * @param {{nom:string,taille:string,prix:string,id:string}} productToFind 
     */
    static async readProduct(productToFind) {

        return fs.readFile("models/products.json")
        .then(productsJSON=>{
            let bdd = JSON.parse(productsJSON);
            for (const key in productToFind) {
                bdd = bdd.filter(product=>product[key]==productToFind[key]);
            }
            if (bdd.length==0) {
                return "Pas de resultat pour cette recherche"
            }
            else{
                return JSON.stringify(bdd);
            }
        })
        .catch(error=>{
            return error;
        })
        .finally(bdd_string=>bdd_string)
    }
}

