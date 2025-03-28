import http from "http";
import fs from "fs"
import mime from "mime-types"
import { ProductModel } from "./models/ProductModel.mjs";
import { buffer } from "stream/consumers";


const server = http.createServer((request,response)=>{
    let body;

    const path = "../public"+request.url;
    console.log("-> "+path+" <-");

    if (path=="../public/") {
        response.appendHeader("Content-types","text/html")
        body = fs.readFileSync("../public/index.html");
        response.write(body);
        response.end();
    }
    else{
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
            'Access-Control-Max-Age': 2592000, // 30 days
            /** add other headers as per requirement */
        }
        
        if (request.method === 'OPTIONS') {
            response.appendHeader("Content-type",mime.lookup(path));
            response.writeHead(204,headers)
            console.log("OPTIONS");
        }
        if (["GET","POST"].indexOf(request.method> -1)) {
            response.appendHeader("Content-type",mime.lookup(path));
            if (path!="../public/read_product.json") {
                response.writeHead(200,headers);
            }
            console.log("GET/POST");
        }
        switch (path) {
            case "../public/read_product.json":
                request.addListener("data",async (data)=>
                    {
                    await ProductModel.readProduct(JSON.parse(data.toString()))
                    .then(bdd_string=>{
                        if (bdd_string=="Pas de resultat pour cette recherche") {
                            console.log("oueoaizueoizaueoi")
                            response.writeHead(400,headers);
                        }
                        else{
                            response.writeHead(200,headers);
                        }
                        response.write(bdd_string)
                    })
                    .catch(error=>{
                        // console.error(error)
                        response.write("error");
                    })
                    .finally(()=>{
                        response.end()
                    })
                })
                break;
            case "../public/add_product.json":
                request.addListener("data",async (data)=>{
                    console.log("OKKKKKK : ",data.toString());
                    await ProductModel.createProduct(JSON.parse(data.toString()))
                    .then(product=>{
                        const productJSON = JSON.stringify(product);
                        response.write(productJSON);
                    })
                    .catch((error)=>{
                        response.statusCode=400;
                        console.error(error);
                        response.write(JSON.stringify({msg:"Creation failed"}));
                    })
                    .finally(()=>{
                        response.end()
                    })
                })
                break;
            case "../public/get_all_products.json":
                body=fs.readFileSync("models/products.json");
                response.write(body);
                response.end();
                break;
            case "../public/style.css":
                body = fs.readFileSync(path);
                response.end(body);
                break;
            case "../public/script.js":
                body = fs.readFileSync(path);
                response.write(body);
                response.end();
                break;
            case "../public/admin/dashboard.html":
                body = fs.readFileSync(path);
                response.write(body);
                response.end();
                break;
            default:       
                response.statusCode=404;
                response.end("error 404 not found")
                break;
        }
    }
    
})


server.listen(4650,()=>{
    console.log("server listen on port 4650")
})