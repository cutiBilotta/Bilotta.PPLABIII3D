
export const crearTarjeta = (elemento)=>{
    const fragment = document.createDocumentFragment();
    elemento.forEach((e) => {
        
        
        const tarjeta= document.createElement("article");
        const alias= document.createElement("h3");
        const nombre= document.createElement("p");

        const div= document.createElement("div");
        
        const fuerza= document.createElement("p");
        const editorial = document.createElement("p");
        const arma = document.createElement("p");
        //const vacunacion = document.createElement("p");

        alias.textContent= e.alias;
        nombre.textContent = e.nombre;

        div.appendChild(fuerza);
        div.appendChild(editorial);
        div.appendChild(arma);


        fuerza.innerHTML= "<i class='fa-solid fa-hand-fist fa-xl' style='color: #000000;'></i>" + "  " + e.fuerza ;
        editorial.innerHTML = "<i class='fa-solid fa-pen fa-xl' style='color: #000000;'></i>" + "  " + e.editorial ;
        arma.innerHTML = "<i class='fa-solid fa-shield-halved fa-xl' style='color: #000000;'></i>" + "  " + e.arma;

        fuerza.style.setProperty("display", "inline-block");
        fuerza.style.setProperty("padding", "15px");
        
        editorial.style.setProperty("display", "inline-block");
        editorial.style.setProperty("padding", "15px");

        arma.style.setProperty("display", "inline-block");
        arma.style.setProperty("padding", "15px");
    
        alias.style.setProperty("text-transform", "uppercase");
        alias.style.setProperty("font-size", "25px");
    
        nombre.style.setProperty("color", "red");
        nombre.style.setProperty("font-size", "18px");


        div.style.setProperty("position", "relative");
        div.style.setProperty("top", "-30px");

        tarjeta.style.setProperty("width", "400px");
        tarjeta.style.setProperty("height", "200px");
        tarjeta.style.setProperty("background-color", "lavender");
        tarjeta.style.setProperty("border", "4px solid darkgrey");
        tarjeta.style.setProperty("display", "inline-block");
        tarjeta.style.setProperty("margin", "15px 15px");

        tarjeta.appendChild(alias);
        tarjeta.appendChild(nombre);
        tarjeta.appendChild(div);


        fragment.appendChild(tarjeta);
    });

    
    return fragment;
};