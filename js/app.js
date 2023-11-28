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

const iniciarTemporizador = (minutos, segundos) => {
  ocultarElemento(contenedor)
  mostrarElemento(btnPausa)
  ocultarElemento(btnInicio)
  ocultarElemento(btnReinicio)

  if(fechaFutura){
    fechaFutura = new Date(new Date().getTime() + diferenciaDeTiempo)
    diferenciaDeTiempo = 0
  } else{
    const milisegundos = (segundos + (minutos * 60)) * 1000
    fechaFutura = new Date(new Date().getTime() + milisegundos)
    console.log(minutos);
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
  const minutos = parseInt(milisegundos / 1000 / 60)
  milisegundos -= minutos * 60 * 1000
  segundos = (milisegundos / 1000)
  return `${agregarCero(minutos)}:${agregarCero(segundos.toFixed(1))}`
}

const inicioApp = () => {
  minutosUser.value = '0'
  segundosUser.value = '0'
  mostrarElemento(contenedor)
  mostrarElemento(btnInicio)
  ocultarElemento(btnPausa)
  ocultarElemento(btnReinicio)
}

btnInicio.addEventListener('click', () => {
  const minutos = parseInt(minutosUser.value)
  const segundos = parseInt(segundosUser.value)
  if(isNaN(minutos) || isNaN(segundos) || (segundos <= 0 && minutos <= 0)){
    console.log('Error');
    return
  } 
  iniciarTemporizador(minutos, segundos)
})

inicioApp()
btnPausa.addEventListener('click', pausarTemporizador)
btnReinicio.addEventListener('click', reiniciarTemporizador)