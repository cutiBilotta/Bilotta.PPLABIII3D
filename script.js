
import { Superheroe } from "./Superheroe.js";
import { crearTabla } from "./tabla.js";
//import { validarCadenaCantCaracteres, validarPrecio } from "./validaciones.js";
//import { crearTarjeta } from "./tarjeta.js";

const $divTabla = document.getElementById("divTabla");
const $btnPrecio = document.getElementById("btnPrecio");
const $btnAlfabet = document.getElementById("btnAlfabet");
const $btnDelete = document.getElementById("btnDelete");
const $btnEnviar= document.getElementById("btnEnviar");
const $txtId= document.getElementById("txtId");
const $tituloAlta= document.getElementById("tituloAlta");
const $spinner= document.getElementById("spinner");
const $btnFiltrar= document.getElementById("btnFiltrar");
const $btnCancelar = document.getElementById("btnCancelar");
const $chkFuerza= document.getElementById("chkFuerza");

const $chkEditorial= document.getElementById("chkEditorial");
const $chkArma= document.getElementById("chkArma");



const $armas = ["Armadura", "Espada" , "Martillo" , "Escudo" , "Arma de Fuego", "Felchas"]
localStorage.setItem("armas", JSON.stringify(["Armadura", "Espada", "Martillo", "Escudo", "Arma de Fuego", "Felchas"]));

$spinner.style.display = 'none';
const icono = "<i class='fa-solid fa-floppy-disk fa-xl'></i> Enviar";
$btnDelete.style.visibility='hidden';
$btnCancelar.style.visibility='hidden';

const $anuncios = JSON.parse(localStorage.getItem("anuncios")) || [];
const $formulario= document.forms[0];

actualizarTabla($anuncios);
cargarArmas();


window.addEventListener("click" , (e)=>{

    if(e.target.matches("td")){

        $btnEnviar.innerHTML = "Modificar";
 
       //console.log(e.target.parentElement.dataset.id);
        let id= e.target.parentElement.dataset.id;
        cargarFormulario($anuncios.find((anuncio) =>anuncio.id == id));
        $btnDelete.style.visibility='visible';
        $btnCancelar.style.visibility='visible';

        $tituloAlta.textContent= "Eliminar/Modificar un Anuncio"
    }else if(e.target.matches("#btnDelete")){
        console.log("ENTRE ACA");
        handlerDelete($formulario.txtId.value);
        $formulario.reset();
    }
    

});

function cargarArmas(){

    const $selectArmas = document.getElementById("selectArmas");
    const $armas = JSON.parse(localStorage.getItem("armas")) || [];
    const $fragment = document.createDocumentFragment();

    $armas.forEach((elemento) =>{

        const $opcion = document.createElement("option");
        $opcion.value = elemento;
        $opcion.innerHTML=elemento;

        $fragment.appendChild($opcion);


    })

    $selectArmas.appendChild($fragment);


    

}
function actualizarTabla(data){

    while($divTabla.hasChildNodes()){
        $divTabla.removeChild($divTabla.firstElementChild);


    }
    //const data = JSON.parse(localStorage.getItem("anuncios")) ;
    
    if(data != null){
          $divTabla.appendChild(crearTabla(data));
    }
}



$formulario.addEventListener("submit", (e) =>{
    e.preventDefault();
    
    const {txtId, txtNombre, txtAlias, rngFuerza, rdoEditorial, selectArmas}  = $formulario; //esto es destructuring
          
    const formAnuncio= new Superheroe(txtId.value, txtNombre.value, rngFuerza.value, txtAlias.value,  rdoEditorial.value, selectArmas.value);
    console.log(txtId.value);

    console.log("Enviando...");
    if(formAnuncio.id== ''){
        formAnuncio.id = Date.now();
        handlerCreate(formAnuncio);
    }else{
        handlerUpdate(formAnuncio);
    }

    $formulario.reset();



    /*
    if(formAnuncio.nombre){
        if(formAnuncio.alias){
            if(validarPrecio(formAnuncio.fuerza)){
                if(formAnuncio.editorial){
                    if( formAnuncio.armas){
                       
                            console.log("Enviando...");
                            if(formAnuncio.id== ''){
                                formAnuncio.id = Date.now();
                                handlerCreate(formAnuncio);
                            }else{
                                handlerUpdate(formAnuncio);
                            }

                            $formulario.reset();

                
                        
                    }else{
                        alert("Armas invalida");
                    }
                }else{
                    alert("Raza invalida");
                }
            }else{
                alert("Precio invalido");
            }
        }else{
            alert("Descripcion invalida");
        }
        
        
    }else{
        alert("Titulo invalido");
    }
*/
});

const handlerCreate = ((nuevoAnuncio) =>{
    $anuncios.push(nuevoAnuncio);
    actualizarStorage($anuncios);
    actualizarTabla($anuncios);
});

const handlerUpdate = ((anuncioEditado) =>{
     let indice= $anuncios.findIndex((a)=>{
        return a.id == anuncioEditado.id;
    });

    $anuncios.splice(indice, 1);
    $anuncios.push(anuncioEditado);

    $btnDelete.style.visibility='hidden';

    actualizarStorage($anuncios);
    actualizarTabla($anuncios);
    $btnEnviar.innerHTML = icono;
    $txtId.value='';

    //$formulario.reset();
});

const handlerDelete = (id) =>{
    

    let indice= $anuncios.findIndex((a)=>{
       return a.id == id;
   });
 
   $anuncios.splice(indice,1);

   
   actualizarStorage($anuncios);
   actualizarTabla($anuncios);
   $btnDelete.style.visibility='hidden';
   $btnEnviar.innerHTML = icono;
   $txtId.value='';

};


const actualizarStorage = ((data) =>{
    localStorage.setItem("anuncios", JSON.stringify(data));
});

function cargarFormulario(a){
    let index=0;

    const {txtId, txtNombre, txtAlias, rngFuerza, rdoEditorial, selectArmas}  = $formulario; //esto es destructuring

    const $viejaArma= a.arma;
    
    txtNombre.value=a.nombre;
    txtAlias.value=a.alias;
    rngFuerza.value=a.fuerza;
    rdoEditorial.value=a.editorial;

    selectArmas.value= $viejaArma;

    txtId.value=a.id;
}


$btnPrecio.addEventListener('click', () =>{

    const $tablaOrdenada= $anuncios.sort((a,b) => {
        return a.fuerza-b.fuerza;
    });

    actualizarTabla($tablaOrdenada);
});

$btnAlfabet.addEventListener('click', () =>{

    const $tablaOrdenada= $anuncios.sort((a,b) => {
        return(b.nombre>a.nombre) ? -1 :1;
    });

    actualizarTabla($tablaOrdenada);
});

$btnCancelar.addEventListener('click', () =>{

    $formulario.reset();
    $txtId.value='';
});

$btnFiltrar.addEventListener('click', () =>{
    
    let opcion;
    var $tablaFiltrada;
    if($chkEditorial.checked && !$chkFuerza.checked && !$chkArma.checked){
        opcion = 1;
    }else if($chkEditorial.checked && $chkFuerza.checked && !$chkArma.checked){
        opcion=2;
    }else if($chkEditorial.checked && $chkFuerza.checked && $chkArma.checked){
        opcion = 3;
    }else if(!$chkEditorial.checked && !$chkFuerza.checked && !$chkArma.checked){
        opcion = 4;
    }else if(!$chkEditorial.checked && $chkFuerza.checked && !$chkArma.checked){
        opcion = 5;
    }else if(!$chkEditorial.checked && !$chkFuerza.checked && $chkArma.checked){
        opcion = 6;
    }else if($chkEditorial.checked && !$chkFuerza.checked && $chkArma.checked){
        opcion = 7;
    }
    else if(!$chkEditorial.checked && $chkFuerza.checked && $chkArma.checked){
        opcion = 8;
    }

    switch(opcion){
        case 1:
            $tablaFiltrada= $anuncios.map( a => ({ nombre:a.nombre, alias:a.alias, editorial:a.editorial}));
            break;
        case 2:
            $tablaFiltrada= $anuncios.map( a => ({ nombre:a.nombre, alias:a.alias, editorial:a.editorial, fuerza:a.fuerza}));
            break;
        case 3:
            $tablaFiltrada= $anuncios.map( a => ({ nombre:a.nombre, alias:a.alias, editorial:a.editorial, fuerza:a.fuerza, arma:a.arma}));
            break;
        case 4:
            $tablaFiltrada= $anuncios.map( a => ({ nombre:a.nombre, alias:a.alias}));
            break;
        case 5:
                $tablaFiltrada= $anuncios.map( a => ({ nombre:a.nombre, alias:a.alias, fuerza:a.fuerza}));
                break;
        case 6:
                $tablaFiltrada= $anuncios.map( a => ({ nombre:a.nombre, alias:a.alias, arma:a.arma}));
                break;
        case 7:
                $tablaFiltrada= $anuncios.map( a => ({ nombre:a.nombre, alias:a.alias,editorial:a.editorial, arma:a.arma}));
                break;
        case 8:
                $tablaFiltrada= $anuncios.map( a => ({ nombre:a.nombre, alias:a.alias,fuerza:a.fuerza, arma:a.arma}));
                break;

    }
  
  

    
    $chkArma.checked=false;
    $chkFuerza.checked=false;
    $chkEditorial.checked=false;
    actualizarTabla($tablaFiltrada);

    
});


document.querySelectorAll('.e-botones').forEach(button => {
    button.addEventListener('click', function(){

        $spinner.style.display = 'block';
        setTimeout(function() {
            $spinner.style.display = 'none';
        }, 2000);
    });
});
