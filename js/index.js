/* Al Iniciar la página */ 

/* Mostrar la información de los Barrios en Círculos en la Página */

const barriosGrid = document.getElementById("barriosGrid");

const mostrarBarrios = (data) => {    
    let delay = 100;
    
    data.forEach(barrio => {
        /* calculo el valor promedio para mostrarlo */
        barrio.promedio = valorPromedioBarrio(barrio.metroMinimo, barrio.metroMaximo) 
        
        const div = document.createElement('div');
        div.classList.add('grid-item', 'circle');
        div.innerHTML += `<h5 data-aos="fade-left" data-aos-delay="${delay}" data-aos-duration="200">${barrio.nombre}<br> <span> u$s ${barrio.promedio}</span> <br> <button class="button-circle" id="${barrio.id}" value="${barrio.id}">Ver más</button>  </h5>`

        barriosGrid.appendChild(div)
        delay +=50
    });
}

/* Retorna el valor promedio */

const valorPromedioBarrio = (mMinimo,mMaximo) => {
    const valorMetroPromedio = parseInt((mMinimo + mMaximo) / 2)
    return valorMetroPromedio
}


/* Completar Select Barrios */

const selectBarrios = (data) => {
    const selectBarrios = document.getElementById("selectBarrios");
    const optionCero = document.createElement('option');
    optionCero.text = "NOMBRE DEL BARRIO:"
    optionCero.value = 0
    selectBarrios.appendChild(optionCero)
    
    data.forEach(barrio => {
        const option = document.createElement('option');
        option.text = barrio.nombre
        option.setAttribute("value", barrio.id);
        selectBarrios.appendChild(option)

    });
}

/* Completar Select Ambientes */

const ambientesPre = [{ id: 1, metros: 30 },
    {  id: 2, metros: 45 },
    {  id: 3, metros: 60 },
    {  id: 4, metros: 80 },
    {  id: 5, metros: 100 },
    {  id: 6, metros: 130 }
  ];

  const selectAmbientes = (ambientes) => {
    const selectAmbientes = document.getElementById("ambientes");
    const optionFirst = document.createElement('option');
    optionFirst.text = "CANTIDAD AMBIENTES:"
    optionFirst.value = 0
    selectAmbientes.appendChild(optionFirst)
    
    ambientesPre.forEach(ambi => {
        const optionAmb = document.createElement('option');
        optionAmb.text = ambi.id + ' amb ' + ambi.metros + ' m2'
        optionAmb.setAttribute("value", ambi.id);
        selectAmbientes.appendChild(optionAmb)

    });
} 


/* Al Iniciar la página */ 

const getBarrios = async () => {

    try {
        const response = await fetch('data/barrios.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

const loadContent = async () => {
    const datos = await getBarrios();

    /* Rellena Select Barrio cuando carga la página */

    document.addEventListener('DOMContentLoaded', selectBarrios(datos));

    /* Rellena Select ambientes cuando carga la página */

    document.addEventListener('DOMContentLoaded', selectAmbientes(ambientesPre));

}

loadContent()

/* Muestra los barrios cuando carga la página */

document.addEventListener('DOMContentLoaded', mostrarBarrios(barrios));