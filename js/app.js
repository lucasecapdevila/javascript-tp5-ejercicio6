//  Variables
const contenedor = document.getElementById('contenedorInputs'),
      dias = document.getElementById('inputDias'),
      horas = document.getElementById('inputHoras'),
      minutos = document.getElementById('inputMinutos'),
      segundos = document.getElementById('inputSegundos'),
      tiempoRestante = document.getElementById('tiempoRestante'),
      btnInicio = document.getElementById('btnInicio'),
      btnPausa = document.getElementById('btnPausa'),
      btnReinicio = document.getElementById('btnReinicio')

let idInterval = null,
    fechaFutura = null,
    diferenciaDeTiempo = 0



//  Funciones globales
const mostrarElemento = (el) => {
  el.classList.remove('d-none')
}

const ocultarElemento = (el) => {
  el.classList.add('d-none')
}

const cargarSonido = (sonido) => {
  const audio = document.createElement('audio')
  audio.src = sonido
  audio.loop = true
  audio.setAttribute('preload', 'auto')
  audio.setAttribute('controls', 'none')
  document.body.appendChild(audio)
  ocultarElemento(audio)
  return audio
}

const audio = cargarSonido('media/alarma.wav')



//  Funciones del temporizador
const convertirMilisegundos = (milisegundos) => {
  const minutos = parseInt(milisegundos / 1000 / 60)
  milisegundos -= minutos * 60 * 1000
  segundos = (milisegundos / 1000)
  return `${minutos}:${segundos}`
}

const iniciar = (minutos, segundos) => {
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
  }

  clearInterval(idInterval)
  idInterval = setInterval(() => {
    const tiempoRestante = fechaFutura.getTime() - new Date().getTime()
    if(tiempoRestante <= 0){
      clearInterval(idInterval)
      audio.play()
      ocultarElemento(btnPausa)
      mostrarElemento(btnReinicio)
    } else{
      tiempoRestante.innerText = convertirMilisegundos(tiempoRestante)
    }
  })
}