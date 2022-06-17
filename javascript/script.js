const canvas = document.getElementById("escenario")
const ctx = canvas.getContext("2d")


const fondo = new Image()
fondo.src = "https://orig15.deviantart.net/8bed/f/2015/058/a/8/smb1_background_by_steamerthesteamtrain-d8jq7ea.png"

const personajeMario = new Image()
personajeMario.src = "../img/mario.webp"

const personajeMarioIzq = new Image()
personajeMarioIzq.src = "../img/marioIzq.png"

const personajeSalta = new Image()
personajeSalta.src = "../img/marioL.png"

const personajeTartaruga = new Image()
personajeTartaruga.src = "../img/tartaruga.webp"

const personajeGoomba = new Image()
personajeGoomba.src = "../img/goomba.png"

const balaImagen = new Image()
balaImagen.src = "../img/balota.png"

const mario = new Mario(10, 450, ctx, personajeMario)

const enemigos = []
const balas = []

let idFrame;

const backgroundImage = {
    img: fondo,
    x: 0,
    speed: -1,

    move() {
        this.x += this.speed;
        this.x %= canvas.width;
    },

    draw: function () {
        ctx.drawImage(this.img, this.x, 0, 900, 600);
        if (this.speed < 0) {
            ctx.drawImage(this.img, this.x + canvas.width, 0, 900, 600);
        } else {
            ctx.drawImage(this.img, this.x - this.img.width, 0, 900, 600);
        }
    },
};

function empezarJuego() {
    /**Obtenemos los elementos */
    const btnStart = document.getElementById("start")

    /**Modificamos los elementos */
    btnStart.classList.add("noShow")
    canvas.classList.remove("noShow")

    configurarAmbiente()

    actualizarEscenario()

    setInterval(() => {
        crearEnemigos()
    }, 500)
}



function actualizarEscenario() {
    console.log("Actualizando")
    ctx.clearRect(0, 0, 900, 600)
    backgroundImage.draw()
    mario.dibujarse()

    backgroundImage.move()

    enemigos.forEach((enemigo, index) => {
        enemigo.x -= 2
        enemigo.dibujarse()
        if (enemigo.x === mario.x + 50 && enemigo.y === mario.y) {
            mario.recibirDano(20)
            enemigos.splice(index, 1)
        }
    })

    balas.forEach((bala, indexBala) => {
        bala.x += 2
        bala.dibujarse()

        enemigos.forEach((enemigo, indexEnemigo) => {
            if (enemigo.x === bala.x || enemigo.x === bala.x + 1 || enemigo.x === bala.x - 1) {
                enemigos.splice(indexEnemigo, 1)
                balas.splice(indexBala, 1)
                mario.kills++
            }
        })
    })

    mostrarDatos(mario.vida, mario.x, mario.y, mario.kills)
    idFrame = requestAnimationFrame(actualizarEscenario)

    if (!mario.estaVivo()) {
        alert("C murio")
        cancelAnimationFrame(idFrame)
    }

}

function mostrarDatos(vida, x, y, k) {
    ctx.font = "40px Arial"
    ctx.fillText(vida, 450, 40)
    ctx.font = "18px Arial"
    ctx.fillText(`X: ${x},Y: ${y} Kills: ${k}`, 700, 40)
}


function crearEnemigos() {
    const aleatorio = Math.floor(Math.random() * 40)
    const numeros = [1, 32, 5, 38, 29]
    if (numeros.includes(aleatorio)) {
        console.log("Agrega un enemigo")
        let tipoEnemigo = personajeTartaruga
        if (aleatorio % 2 === 0) {
            tipoEnemigo = personajeGoomba
        }
        const enemigo = new Enemigo(860, 450, ctx, tipoEnemigo)
        enemigos.push(enemigo)
    }
}

function configurarAmbiente() {

    document.addEventListener("keydown", (event) => {
        //console.log(event)
        switch (event.key) {
            case "ArrowLeft":
                mario.moverAtras()
                mario.img = personajeMarioIzq
                break;
            case "ArrowRight":
                mario.moverAlFrente()
                mario.img = personajeMario
                break;
            case "ArrowUp":
                mario.saltar()
                mario.img = personajeSalta
                break;
            case "ArrowDown":
                mario.bajar()
                break;
            case " ":
                if (balas.length < 10) {
                    const nuevaBala = mario.disparar(mario.x + 50, mario.y + 35, balaImagen)
                    balas.push(nuevaBala)
                }
                break;
        }
    })

}