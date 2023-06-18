
import { crearTarjeta } from "./tarjeta.js";

const $divAnuncios = document.getElementById("divAnuncios");
actualizarAnuncios(); 

function actualizarAnuncios(){
    while($divAnuncios.hasChildNodes()){
        $divAnuncios.removeChild($divAnuncios.firstElementChild);


    }

    const data = JSON.parse(localStorage.getItem("anuncios")) ;
    
    if(data != null){
        console.log("entre aca");
        $divAnuncios.appendChild(crearTarjeta(data));
    
          
    }
}