/* Abrir Modal con los datos de cada barrio */

const modalContenedor = document.querySelector('.modal-contenedor')
const cerrarModal = document.getElementById('btn-cerrar-barrio')
const nombreBarrio = document.getElementById('nombreBarrio')
const maxMetro = document.getElementById('metroMaximo')
const minMetro = document.getElementById('metroMinimo')
const promMetro = document.getElementById('metroPromedio')

cerrarModal.addEventListener('click', () => {
    modalContenedor.classList.toggle('modal-active')
});

barriosGrid.addEventListener('click', (e) =>  {
    if(e.target.classList.contains('button-circle')) {

        const mostrarBarrio = barrios.find(barrio => barrio.id == e.target.id)

        if(mostrarBarrio) {
            /* destructuracion */
            const { nombre, metroMaximo, metroMinimo, promedio } = mostrarBarrio
            nombreBarrio.innerText = nombre
            maxMetro.innerText = metroMaximo
            minMetro.innerText = metroMinimo
            promMetro.innerText = promedio
            
            modalContenedor.classList.toggle('modal-active')
        }
    }
})

/* ORDENAR POR VALOR MAS CARO O BARATO */

const mayorValor = document.getElementById('mayorValor')
const menorValor = document.getElementById('menorValor')

const ordenarPromedioMasCaros = () => {
  
    const barriosMasCaros = barrios.sort((a,b) => b.promedio - a.promedio)
    
    barriosGrid.innerHTML = ''
    barriosMasCaros.forEach(barrioCaro => {
        const div = document.createElement('div');
        div.classList.add('grid-item', 'circle');
        div.innerHTML = `<h5  style="line-height: 1.3;" >${barrioCaro.nombre}<br> <span> u$s ${barrioCaro.promedio}</span> <br> <button class="button-circle mt-4" id="${barrioCaro.id}" value="${barrioCaro.id}">Ver más</button>  </h5>`

        barriosGrid.appendChild(div)
       
    })
    
}

const ordenarPromedioMasBaratos = () => {
   
    const barriosMasBaratos = barrios.sort((a,b) => a.promedio - b.promedio)
  
    barriosGrid.innerHTML = ''
    barriosMasBaratos.forEach(barrioBarato => {
        const div = document.createElement('div');
        div.classList.add('grid-item', 'circle');
        div.innerHTML = `<h5>${barrioBarato.nombre}<br> <span> u$s ${barrioBarato.promedio}</span> <br> <button class="button-circle" id="${barrioBarato.id}" value="${barrioBarato.id}">Ver más</button>  </h5>`

        barriosGrid.appendChild(div)
       
    })
    
}

mayorValor.addEventListener('click', () => {
    ordenarPromedioMasCaros()
})

menorValor.addEventListener('click', () => {
    ordenarPromedioMasBaratos()
})




