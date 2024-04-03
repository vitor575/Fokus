//button//
const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const botoes = document.querySelectorAll('.app__card-button');
const pauseBtn = document.querySelector('#start-pause img')
//button//

//image//
const banner = document.querySelector('.app__image'); 
//image//

//titulo//
const titulo = document.querySelector('.app__title')
//titulo//

//musica//
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('sons/luna-rise-part-one.mp3');
//musica//

//temporizador//
const tempoNaTela = document.querySelector('#timer')

const startPauseBt = document.querySelector('#start-pause')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
let tempoDecorridoEmSegundos = 1500    
let intervaloId = null

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0) {
        zerar()
        finalNotification.play()
        return
    };  
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar,)

function iniciarOuPausar () {
    if(intervaloId){  
        pauseNotification.play()
        zerar()
        return
    }
    startNotification.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    pauseBtn.setAttribute('src', 'imagens/pause.png')
}

function zerar() {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    pauseBtn.setAttribute('src', 'imagens/play_arrow.png')
    intervaloId = null
}
//temporizador//

//notificações//
const startNotification = new Audio('sons/play.wav');
const pauseNotification = new Audio('sons/pause.mp3');
const finalNotification = new Audio ('sons/beep.mp3')
//notificações//

//tocar musica//
musica.loop = true
musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    }else {
        musica.pause()
    }
})
//tocar musica//

//troca de cores//
focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
});

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
});

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
});

function alterarContexto (contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = ` Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar a superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break
        default:
            break;
    }
}
//troca de cores//

function mostrarTempo () {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()