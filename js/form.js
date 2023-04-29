/* Capturar Información del FORMULARIO */

let comparables = []

const formulario = document.getElementById("formulario");

const inputNombre = document.getElementById('nombre')
const selectBarrio = document.getElementById('selectBarrios')
const seleccionaAmbientes = document.getElementById('ambientes')
const inputMetros = document.getElementById('metros')

const errorNombre = document.getElementById('errorNombre')
const errorBarrio = document.getElementById('errorBarrio')
const errorAmbientes = document.getElementById('errorAmbientes')
const errorMetros = document.getElementById('errorMetros')

class Comparable {
    constructor(barrioElegido,  metrosElegidos, ambientesElegidos, minimo,maximo,promedio,bIdMetros) {
        this.barrioElegido = barrioElegido
        this.metrosElegidos = parseInt(metrosElegidos)
        this.ambientesElegidos = parseInt(ambientesElegidos)
        this.minimo = minimo
        this.maximo = maximo
        this.promedio = promedio
        this.bIdMetros = bIdMetros
        
    }
}

/* Borrar Indicación de Error En Formulario si ingresa nuevos datos */
inputNombre.onchange = () => { errorNombre.innerText = '' }
selectBarrio.onchange = () => { errorBarrio.innerText = '' }
seleccionaAmbientes.onchange = () => { errorAmbientes.innerText = '' }
inputMetros.onchange = () => { errorMetros.innerText = '' }

/* Submit Form */
formulario.addEventListener("submit", validarFormulario)

function validarFormulario(e) {
    e.preventDefault()

    const nombreValue = inputNombre.value
    
    if(nombreValue.length == 0) {
        errorNombre.innerText = 'Necesitamos un nombre'
        return
    }

    const barrioValue = selectBarrio.options[selectBarrio.selectedIndex].value;

    if(barrioValue == 0)  {
        errorBarrio.innerText = 'Necesitamos un barrio'
        return
    } 

    const ambientesValue = seleccionaAmbientes.options[seleccionaAmbientes.selectedIndex].value;

    if(ambientesValue == 0){
        errorAmbientes.innerText = 'Necesitamos la cantidad de ambientes'
        return
    }

    const barrioElegido = barrios.find(barrio => barrio.id == barrioValue)

    let metrosValue = inputMetros.value

    if (metrosValue == '') {
        const ambienteMetros = ambientesPre.find(amb => amb.id == ambientesValue)
        metrosValue = ambienteMetros.metros
        
    }
    
    const cBarrio = barrioElegido.nombre
    const cMetros = parseInt(metrosValue)
    const cAmbientes = parseInt(ambientesValue)
    const cMinimo = parseInt(metrosValue * barrioElegido.metroMinimo)
    const cMaximo = parseInt(metrosValue * barrioElegido.metroMaximo)
    const cPromedio = parseInt(metrosValue * barrioElegido.promedio)
    const cIdBarrio = barrioElegido.id 

    listaComparable(cBarrio,cMetros, cAmbientes,cMinimo,cMaximo,cPromedio,cIdBarrio)

    guardarNombreStorage(nombreValue)

    } 

/*  Guardar nuevo comparable */

    function listaComparable(barrioEle, metrosEle, ambEle,minEle,maxEle,promEle,idBaEle) {
        const nuevoComparable = new Comparable(barrioEle, metrosEle, ambEle,minEle,maxEle,promEle,idBaEle);

        comparables.push(nuevoComparable);
        formulario.reset()
        obtenerNombreStorage()
        inputNombre.value = nombre
        mostrarComparables(comparables)
        guardarComparableStorage(comparables)

    }
/*  Eliminar comparable */

    const eliminarComparable = (barrioId, metros) => {
        const comparableIndex = comparables.findIndex(comparable => comparable.bIdMetros == barrioId && comparable.metrosElegidos == metros)
        comparables.splice(comparableIndex, 1)
        mostrarComparables(comparables)
        guardarComparableStorage(comparables)
       
      }

/*  Mostrar Lista de comparables */

    const tabla = document.getElementById('comparablesTable')

    const mostrarComparables = (comparables) => {
          
        tabla.innerHTML = ''
       
        comparables.forEach(comparable => {
            const trTable = document.createElement('tr')
            trTable.innerHTML =  `     
                <td><span id="barrioNombre">${comparable.barrioElegido}</span></td>
                <td><span id="barrioMetros">${comparable.metrosElegidos}</span> m2</td>
                <td><span id="barrioAmbientes">${comparable.ambientesElegidos}</span> Amb.</td>
                <td>u$s <span id="barrioMinimo">${comparable.minimo}</span></td>
                <td>u$s <span id="barrioMaximo">${comparable.maximo}</span></td>
                <td>u$s <span id="barrioPromedio">${comparable.promedio}</span></td>
                <td><button class="info boton-small"  id="${comparable.barrioElegido}" value="${comparable.promedio}">Info</button></td>
                <td><button class="border-none" id="${comparable.bIdMetros}" value="${comparable.metrosElegidos}">Borrar</button></td>`

                tabla.appendChild(trTable)
                                        
    })

   }


const guardarComparableStorage = (comparables) => {
    localStorage.setItem('comparables', JSON.stringify(comparables))
  }
  
const obtenerComparableStorage = () => {
    const comparableStorage = JSON.parse(localStorage.getItem('comparables'))
    return comparableStorage
}

const guardarNombreStorage = (nombre) => {
    localStorage.setItem('nombre', nombre)
  }

function obtenerNombreStorage() {
    const nombreStorage = localStorage.getItem('nombre');
    return nombreStorage
}

if (localStorage.getItem('nombre')) {
    nombre = obtenerNombreStorage()
    inputNombre.value = nombre
    const nombreUsuario = document.getElementById("nombreUsuario")
    nombreUsuario.innerText = nombre  
}

if(localStorage.getItem('comparables')) {
    comparables = obtenerComparableStorage()
    mostrarComparables(comparables)
  }
  
 /*  Eliminar de la Tabla de Comparables buscando los parámetros Barrio Id y cantidad de metros */

tabla.addEventListener('click', (e) => {

    if(e.target.classList.contains('border-none')) {
       
        const trashBarrioId = e.target.id
        const trashMetros = e.target.value
        eliminarComparable(trashBarrioId,trashMetros)
       
    }

    if(e.target.classList.contains('info')) {
       
        const barrioName = e.target.id
        const barrioPromedio = e.target.value

        const getValorDolar = async () => {
            try {
                const response = await fetch('https://criptoya.com/api/dolar');
                const data = await response.json();
                return data;
            } catch (error) {
                console.error(error);
            }
        }

        const newLocal = 500;
        const loadValorDolar = async () => {
        const dolar = await getValorDolar();

            Swal.fire({
                title: `Elegiste un departamento en  ${barrioName}`,
                text: `El valor promedio en Dólares es u\$s ${barrioPromedio} Y HOY necesitas \$ ${barrioPromedio * dolar.blue} Pesos Argentinos para comprarlo`,
                width: newLocal,
                confirmButtonColor: '#99be20',
                padding: '5em',
                background: '#eee'
              })
          };

          loadValorDolar()
              
    }

})


 const getCriptoYa = async () => {
    try {
        const response = await fetch('https://criptoya.com/api/dolar');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}


const loadCriptoYa = async () => {
    const dolar = await getCriptoYa();

    const btnToast = document.getElementById('boton-dolar')

    btnToast.addEventListener('click', () => {
   
      Toastify({
       text: 'DOLAR BLUE: $ '+ dolar.blue,
       duration: 3000,
       gravity: 'top',
       position: 'right',
       style: {
          background: 'linear-gradient(to right, red, blue)'
        }
     }).showToast()
    })
  };

  loadCriptoYa()


