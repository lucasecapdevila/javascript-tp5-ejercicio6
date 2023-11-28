//  Variables
const contenedor = document.getElementById('contenedorInputs'),
      diasUser = document.getElementById('inputDias'),
      horasUser = document.getElementById('inputHoras'),
      minutosUser = document.getElementById('inputMinutos'),
      segundosUser = document.getElementById('inputSegundos'),
      tiempoRestante = document.getElementById('tiempoRestante'),
      btnInicio = document.getElementById('btnInicio'),
      btnPausa = document.getElementById('btnPausa'),
      btnReinicio = document.getElementById('btnReinicio')

let idInterval = null,
    fechaFutura = null,
    diferenciaDeTiempo = 0



//  Funciones
const cargarSonido = (sonido) => {
  const audio = document.createElement('audio')
  audio.src = sonido
  audio.loop = true
  audio.setAttribute('preload', 'auto')
  audio.setAttribute('controls', 'none')
  document.body.appendChild(audio)
  audio.style.display = 'none' 
  return audio
}
const audio = cargarSonido('media/alarma.wav')

const ocultarElemento = (el) => {
  el.classList.add('d-none')
}

const mostrarElemento = (el) => {
  el.classList.remove('d-none')
}

const iniciarTemporizador = (dias, horas, minutos, segundos) => {
  ocultarElemento(contenedor)
  mostrarElemento(btnPausa)
  ocultarElemento(btnInicio)
  ocultarElemento(btnReinicio)

  if(fechaFutura){
    fechaFutura = new Date(new Date().getTime() + diferenciaDeTiempo)
    diferenciaDeTiempo = 0
  } else{//               segundos +   seg en 1min  +  seg en 1hora  + seg en 1 día (multiplico por mil para pasar todos los s a ms)
    const milisegundos = (segundos + (minutos * 60) + (horas * 3600) + dias * 86400) * 1000
    fechaFutura = new Date(new Date().getTime() + milisegundos)
  }
  
  clearInterval(idInterval)
  idInterval = setInterval(() => {
    const tiempoQueFalta = fechaFutura.getTime() - new Date().getTime()
    if(tiempoQueFalta <= 0){
      clearInterval(idInterval)
      audio.play()
      ocultarElemento(btnPausa)
      mostrarElemento(btnReinicio)
    } else{
      tiempoRestante.textContent = convertirMilisegundos(tiempoQueFalta)
    }
  }, 50)
}

const pausarTemporizador = () => {
  ocultarElemento(btnPausa)
  mostrarElemento(btnInicio)
  mostrarElemento(btnReinicio)
  diferenciaDeTiempo = fechaFutura.getTime() - new Date().getTime()
  clearInterval(idInterval)
}

const reiniciarTemporizador = () => {
  Swal.fire({
    title: "¿Quieres detener el temporizador?",
    text: "Una vez que lo hagas, no podrás continuar con el tiempo actual",
    icon: "warning",
    showCancelButton: false,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, quiero detenerlo"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Temporizador detenido",
        text: "Se reinició el temporizador",
        icon: "success"
      });
    }
  });
  clearInterval(idInterval)
  fechaFutura = null
  diferenciaDeTiempo = 0
  audio.currentTime = 0
  audio.pause()
  tiempoRestante.textContent = '00:00.0'
  inicioApp()
}

const agregarCero = (valor) => {
  if(valor < 10){
    return '0' + valor
  } else{
    return '' + valor
  }
}

const convertirMilisegundos = (milisegundos) => {
  const dias = parseInt(Math.floor(milisegundos / (1000 * 60 * 60 * 24)))
  horas = parseInt(Math.floor(milisegundos / (1000 * 60 * 60)) % 24)
  minutos = parseInt(Math.floor(milisegundos / 1000 / 60) % 60)
  segundos = parseInt(Math.floor(milisegundos / 1000) % 60)
  milisegundos -= minutos * 60 * 1000
  return `${agregarCero(dias)}días - ${agregarCero(horas)}hs - ${agregarCero(minutos)}min - ${agregarCero(segundos)}seg`
}

const inicioApp = () => {
  diasUser.value = '0'
  horasUser.value = '0'
  minutosUser.value = '0'
  segundosUser.value = '0'
  mostrarElemento(contenedor)
  mostrarElemento(btnInicio)
  ocultarElemento(btnPausa)
  ocultarElemento(btnReinicio)
}

btnInicio.addEventListener('click', () => {
  const dias = parseInt(diasUser.value)
  const horas = parseInt(horasUser.value)
  const minutos = parseInt(minutosUser.value)
  const segundos = parseInt(segundosUser.value)
  if(isNaN(dias) || isNaN(horas) || isNaN(minutos) || isNaN(segundos) || (segundos <= 0 && minutos <= 0 && horas <= 0 && dias <= 0)){
    Swal.fire({
      title: "No se pudo iniciar el temporizador",
      text: "Debes colocar un tiempo para que el temporizador funcione.",
      icon: "error"
    });
    return

  } 
  iniciarTemporizador(dias, horas, minutos, segundos)
})

inicioApp()
btnPausa.addEventListener('click', pausarTemporizador)
btnReinicio.addEventListener('click', reiniciarTemporizador)