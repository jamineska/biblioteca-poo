// creando clase libro
class Libro {
    constructor(titulo, autor, isbn) {
        this.titulo = titulo;
        this.autor = autor;
        this.isbn = isbn;
        this._prestado = false; // Propiedad privada por convención
    }

    prestar() {
        this._prestado = true;
    }

    devolver() {
        this._prestado = false;
    }

    getEstado() {
        if (this._prestado === true) {
            return "Prestado";
        } else {
            return "Disponible";
        }
    }
}