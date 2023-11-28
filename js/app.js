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