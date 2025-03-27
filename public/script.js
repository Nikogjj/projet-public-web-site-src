console.log("Hello World ! Le fichier script est bien récupéré !");

const div_all_products = document.querySelector(".all_products");
const template_products = document.querySelector(".template_product");

fetch("http://localhost:4650/get_all_products.json")
.then(response=>response.json())
.then(body=>{
    body.forEach(produit => {
        console.log(produit);
        const clone = template_products.content.cloneNode(true);
        const div_product = clone.querySelector(".product");
        const tab_p = div_product.querySelectorAll("p");
        tab_p.forEach((p,i) => {
            if (i==0) {
                p.textContent="nom : "+produit.nom;
            }
            if (i==1) {
                p.textContent="taille : "+produit.taille;
            }
            if (i==2) {
                p.textContent="prix : "+produit.prix;
            }
        });
        div_all_products.appendChild(div_product);
    });
})

const form_create = document.querySelector(".create>form");
const form_read = document.querySelector(".read>form");
const form_update = document.querySelector(".update>form");
const form_delete = document.querySelector(".delete>form");

form_create.addEventListener("submit", (event)=>{
    event.preventDefault();
    console.log("ajouter");

    const formData = new FormData(form_create);
    const produit = {
        nom:formData.get("nom"),
        taille:formData.get("taille"),
        prix:formData.get("prix")
    }
    // const OPTIONS = {
    //     method:"POST",
    //     body:JSON.stringify(produit)
    // }
    const request = new Request("http://localhost:4650/add_product.json", {
        method: "POST",
        body: JSON.stringify(produit),
      });
    // fetch("http://localhost:4650/add_product",OPTIONS)
    // .then(response=>console.log(response))
    fetch(request)
    .then(response=>response.json())
    .then(body=>{
        console.log(body);
    })
})
form_read.addEventListener("submit",(event)=>{
    event.preventDefault();
})
form_update.addEventListener("submit",(event)=>{
    event.preventDefault();
})
form_delete.addEventListener("submit",(event)=>{
    event.preventDefault();
})