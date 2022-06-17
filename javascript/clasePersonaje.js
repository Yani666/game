class Personaje {
    constructor(x, y, ctx, img) {
        this.x = x
        this.y = y
        this.vida = 20
        this.velocidad = 1
        this.ctx = ctx
        this.img = img;
        this.dibujarse()
    }

    recibirDano(dano) {
        this.vida -= dano
    }

    moverAlFrente() {
        this.x += 2
    }

    moverAtras() {
        this.x -= 2
    }

    saltar() {
        this.y -= 85
    }

    bajar() {
        this.y += 85
    }

    disparar(x, y, img) {
        const bala = new Bala(x, y, img, ctx)
        return bala
    }

    estaVivo() {
        if (this.vida > 0) {
            return true
        }
        return false
    }

    dibujarse() {
        //this.ctx.fillRect(this.x, this.y, 30, 30)
        this.ctx.drawImage(this.img, this.x, this.y, 60, 60)
    }
}