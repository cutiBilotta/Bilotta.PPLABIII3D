
export const crearTabla = (elemento)=>{

    if(!Array.isArray(elemento))return null;

        const tabla= document.createElement("table");

        const thead= document.createElement("thead");
        tabla.appendChild(crearCabecera(elemento[0]));

        const tbody= document.createElement("tbody");
        tabla.appendChild(crearCuerpo(elemento));


        //const header = document.createElement("tr");
        return tabla;



}

 const crearCabecera = (elemento) => {

        const tHead = document.createElement("thead");
        const headRow = document.createElement("tr");
        
        for(const key in elemento){
            if(key == "id"){
                continue;
            }
            const th = document.createElement("th");
            th.textContent = key;
            headRow.appendChild(th);
        }
        
        tHead.appendChild(headRow);
        
        return tHead;
};

const crearCuerpo = (elemento) =>{
    if(!Array.isArray(elemento)) return null;
    
    const tBody = document.createElement("tbody");
    
    elemento.forEach((element) => {
        const tr = document.createElement("tr");
        for(const key in element){
            if(key == "id"){
                tr.dataset.id = element[key];
            }else{
                const td= document.createElement("td");
                td.textContent = element[key];
                tr.appendChild(td);
            }
            
        }
    
    
    tBody.appendChild(tr);
    });
    return tBody;
};


