
import { Superheroe } from "./Superheroe.js";
import { crearTabla } from "./tabla.js";
import { validarCadenaCantCaracteres} from "./validaciones.js";

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
const $btnDc = document.getElementById("btnFiltrarDc");
const $btnMarvel = document.getElementById("btnFiltrarMarvel");
const $promedioFuerza = document.getElementById("promFuerza");
const $formulario= document.forms[0];
//$divTabla.style.visibility='hidden';

const $armas = ["Armadura", "Espada" , "Martillo" , "Escudo" , "Arma de Fuego", "Felchas"]
localStorage.setItem("armas", JSON.stringify(["Armadura", "Espada", "Martillo", "Escudo", "Arma de Fuego", "Flechas"]));
const $anuncios = JSON.parse(localStorage.getItem("anuncios")) || [];
cargarArmas();
//actualizarTabla($anuncios);

$spinner.style.visibility = 'visible';
$btnDelete.style.visibility='hidden';
$btnCancelar.style.visibility='hidden';

const icono = "<i class='fa-solid fa-floppy-disk fa-xl'></i> Enviar";

if($anuncios.length>0){
    
    setTimeout(()=>{
        actualizarTabla($anuncios);
        $spinner.style.visibility= 'hidden';

    }, 2000);

   
}else
{
    setTimeout(() => {
        $spinner.style.visibility= 'hidden';
        $divTabla.insertAdjacentHTML("afterbegin", `<p>Aun no hay anuncios de Superheroes para mostrar</p>`);
    }, 2000);
}


window.addEventListener("click" , (e)=>{

    if(e.target.matches("td")){

        $btnEnviar.innerHTML = "Modificar";
        //console.log(e.target.parentElement.dataset.id);
        let id= e.target.parentElement.dataset.id;
        cargarFormulario($anuncios.find((anuncio) =>anuncio.id == id));
        $btnDelete.style.visibility='visible';
        $btnCancelar.style.visibility='visible';

        $tituloAlta.textContent= "Eliminar/Modificar un Superheroe"
    }else if(e.target.matches("#btnDelete")){
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

    if(data != null){
          $divTabla.appendChild(crearTabla(data));
    }
}

$formulario.addEventListener("submit", (e) =>{
    e.preventDefault();
    
    const {txtId, txtNombre, txtAlias, rngFuerza, rdoEditorial, selectArmas}  = $formulario; //esto es destructuring
          
    const formAnuncio= new Superheroe(txtId.value, txtNombre.value, rngFuerza.value, txtAlias.value,  rdoEditorial.value, selectArmas.value);

    if(validarCadenaCantCaracteres(formAnuncio.nombre)){
        if(validarCadenaCantCaracteres(formAnuncio.alias)){
            console.log("Enviando...");
            if(formAnuncio.id== ''){
                formAnuncio.id = Date.now();
                handlerCreate(formAnuncio);
            }else{
                handlerUpdate(formAnuncio);
            }

            $formulario.reset();
            
        }else{
            alert("Alias invalido");
        }
    }else{
        alert("Nombre invalido");
    }

});

const handlerCreate = ((nuevoAnuncio) =>{
    $anuncios.push(nuevoAnuncio);
    actualizarStorage($anuncios);
    actualizarTabla($anuncios);
    $tituloAlta.textContent= "Crud Heroes - Alta Superheroe"


});

const handlerUpdate = ((anuncioEditado) =>{
     let indice= $anuncios.findIndex((a)=>{
        return a.id == anuncioEditado.id;
    });

    $anuncios.splice(indice, 1);
    $anuncios.push(anuncioEditado);

    $btnDelete.style.visibility='hidden';
    $btnCancelar.style.visibility='hidden';


    actualizarStorage($anuncios);
    actualizarTabla($anuncios);
    $btnEnviar.innerHTML = icono;
    $txtId.value='';
    $tituloAlta.textContent= "Crud Heroes - Alta Superheroe"


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
   $btnCancelar.style.visibility='hidden';
   $btnEnviar.innerHTML = icono;
   $txtId.value='';

};


const actualizarStorage = ((data) =>{
    localStorage.setItem("anuncios", JSON.stringify(data));
});

function cargarFormulario(a){
    let index=0;

    const {txtId, txtNombre, txtAlias, rngFuerza, rdoEditorial, selectArmas}  = $formulario; //esto es destructuring
    
    txtNombre.value=a.nombre;
    txtAlias.value=a.alias;
    rngFuerza.value=a.fuerza;
    rdoEditorial.value=a.editorial;
    selectArmas.value= a.arma;
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
    $btnCancelar.style.visibility= 'hidden';
    $btnDelete.style.visibility= 'hidden';
    $btnEnviar.innerHTML=  "<i class='fa-solid fa-floppy-disk fa-xl'></i> Enviar";
    $tituloAlta.textContent= "Crud Heroes - Alta Superheroe"


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
    button.addEventListener('click', ()=>{
        $spinner.style.visibility='visible';
        $divTabla.style.visibility='hidden';

        if($anuncios.length>0){
    
            setTimeout(()=>{
                $divTabla.style.visibility='visible';
                $spinner.style.visibility= 'hidden';
        
            }, 2000);
        
           
        }else
        {
            setTimeout(() => {
                $divTabla.style.visibility='visible';

                $spinner.style.visibility= 'hidden';
                //$divTabla.insertAdjacentHTML("afterbegin", `<p>Aun no hay anuncios de Superheroes para mostrar</p>`);
            }, 2000);
        }
    });
});

$btnDc.addEventListener('click', ()=>{

   const  $tablaFiltrada= $anuncios.filter( a => a.editorial=="DC"? true: false)
    actualizarTabla($tablaFiltrada);
    
});

$btnMarvel.addEventListener('click', ()=>{

    const  $tablaFiltrada= $anuncios.filter( a => a.editorial=="Marvel"? true: false)

    actualizarTabla($tablaFiltrada);
 
 });

 $promedioFuerza.addEventListener('click', ()=>{

    let total= $anuncios.reduce((accumulated, currentValue) => Number(accumulated += currentValue.fuerza),0);
        
        console.log ("total fuerzas:" + total);
        //$pPromedio.innerHTML= promedio;

    
 
 });
