/* Parte 2: Clase Biblioteca

Esta clase debe representar a la colección de libros y permitir gestionarlos.
Esta clase debe tener:

    Propiedades:
        nombre: nombre de la biblioteca
        libros: un array para guardar los libros (instancias de Libro)

    Métodos:
        agregarLibro(libro): añade un libro a la colección
        buscarPorISBN(isbn): busca un libro específico en la colección
        prestarLibro(isbn): presta un libro según su ISBN
        devolverLibro(isbn): devuelve un libro según su ISBN
        mostrarLibros(): muestra todos los libros con su estado

Ejemplo de uso:

const biblio = new Biblioteca("Biblioteca Central");
const libro1 = new Libro("1984", "George Orwell", "12345");

biblio.agregarLibro(libro1);
biblio.prestarLibro("12345");
biblio.mostrarLibros(); // muestra el libro como "Prestado"

Puntos clave

    Cómo usar clases y métodos en JavaScript
    Cómo aplicar el encapsulamiento con _propiedadesPrivadas
    Cómo dividir el sistema en partes reutilizables (separar Libro de Biblioteca)
    Cómo manejar una colección de objetos (array de libros)
    Cómo modelar problemas reales usando objetos

Requisitos técnicos
Usar ES6 (class, constructor, this)
Usar encapsulamiento por convención (con _propiedad)
No se permite modificar directamente el estado de un libro fuera de su clase
Por ejemplo: libro._prestado = true; → ❌ No permitido. */

//cogemos elementos html
const nombreBiblio = document.querySelector("#nombre-biblioteca");
const formLibro = document.querySelector("#form-libro");
const inputTitulo = document.querySelector("#input-titulo");
const inputAutor = document.querySelector("#input-autor");
const inputIsbn = document.querySelector("#input-isbn");
const contenedorLibros = document.querySelector("#lista-libros");

//definimos la clase biblioteca (POO)
class Biblioteca {
    constructor(nombre) {
        this.nombre = nombre;
        this.libros = []; // Array para guardar instancias de Libro
    }
    
    agregarLibro(libro) { // añadiendo libro a la colección
        this.libros.push(libro);
    }

     buscarPorISBN(isbn) { // buscar libro específico por su ISBN
        return this.libros.find((libro) => libro.isbn === isbn);
    }
    
    
     prestarLibro(isbn) { // presta un libro usando su método público (sin tocar _prestado)
        const libroEncontrado = this.buscarPorISBN(isbn);
        if (libroEncontrado) {
            libroEncontrado.prestar();
        }
    }
    
    devolverLibro(isbn) { // devuelve un libro usando su método público

        const libroEncontrado = this.buscarPorISBN(isbn);
        if (libroEncontrado) {
            libroEncontrado.devolver();
        }
    }
   
        mostrarLibros() { // muestra todos los libros con su estado en consola
        console.log("--- Catálogo de " + this.nombre + " ---");
        this.libros.forEach((libro) => {
            console.log(libro.titulo + " (" + libro.autor + ") [ISBN: " + libro.isbn + "] -> " + libro.getEstado());
        });
    }
}

//datos iniciales, seguimos el ejemplo del enunciado
const biblio = new Biblioteca("Biblioteca Central");
const libro1 = new Libro("1984", "George Orwell", "12345");
const libro2 = new Libro("Cien años de soledad", "Gabriel García Márquez", "11111");

biblio.agregarLibro(libro1);
biblio.agregarLibro(libro2);
biblio.prestarLibro("12345");
biblio.mostrarLibros(); // Muestra "1984" como "Prestado" en consola

//crear evento del formulario para añadir libros
formLibro.addEventListener("submit", function (evento) {
    evento.preventDefault(); // evita que la página se recargue

    const titulo = inputTitulo.value.trim();
    const autor = inputAutor.value.trim();
    const isbn = inputIsbn.value.trim();

    
    if (biblio.buscarPorISBN(isbn)) { // comprobamos que no exista ya un libro con ese ISBN
        alert("Ya existe un libro registrado con ese ISBN.");
        return;
    }

    const nuevoLibro = new Libro(titulo, autor, isbn);// creamos la instancia de Libro y la agregamos a la Biblioteca
    biblio.agregarLibro(nuevoLibro);

    formLibro.reset(); // limpiamos el formulario
    pintarCatalogo();  // actualizamos la pantalla
});

// función para pintar libros
function pintarCatalogo() {
    nombreBiblio.textContent = biblio.nombre;
    contenedorLibros.innerHTML = ""; // Limpiamos el contenedor antes de volver a pintar

    biblio.libros.forEach((libro) => {
        // 1.creamos la tarjeta principal
        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta-libro";

        // 2.creamos la cabecera (ISBN + Estado)
        const cabecera = document.createElement("div");
        cabecera.className = "tarjeta-cabecera";

        const spanIsbn = document.createElement("span");
        spanIsbn.className = "isbn";
        spanIsbn.textContent = "ISBN: " + libro.isbn;

        const estadoActual = libro.getEstado();
        const spanEstado = document.createElement("span");
        spanEstado.textContent = estadoActual;

        if (estadoActual === "Disponible") {
            spanEstado.className = "estado disponible";
        } else {
            spanEstado.className = "estado prestado";
        }

        // insertamos ambos elementos de una sola vez con .append()
        cabecera.append(spanIsbn, spanEstado);

        // 3.creamos el título y el autor
        const titulo = document.createElement("h3");
        titulo.textContent = libro.titulo;

        const autor = document.createElement("p");
        autor.className = "autor";
        autor.textContent = "Autor: " + libro.autor;

        // 4.creamos los botones de Prestar y Devolver
        const divControles = document.createElement("div");
        divControles.className = "controles";

        const btnPrestar = document.createElement("button");
        btnPrestar.textContent = "Prestar";
        btnPrestar.className = "btn btn-primario";

        const btnDevolver = document.createElement("button");
        btnDevolver.textContent = "Devolver";
        btnDevolver.className = "btn btn-secundario";

        if (estadoActual === "Disponible") {
            btnPrestar.disabled = false;
            btnDevolver.disabled = true;
        } else {
            btnPrestar.disabled = true;
            btnDevolver.disabled = false;
        }

        //activamos los clics llamando a los métodos de Biblioteca
        btnPrestar.addEventListener("click", function () {
            biblio.prestarLibro(libro.isbn);
            pintarCatalogo();
        });

        btnDevolver.addEventListener("click", function () {
            biblio.devolverLibro(libro.isbn);
            pintarCatalogo();
        });

        // insertamos ambos botones juntos con .append()
        divControles.append(btnPrestar, btnDevolver);

        // 5.ensamblamos toda la tarjeta y la añadimos al contenedor principal
        tarjeta.append(cabecera, titulo, autor, divControles);
        contenedorLibros.append(tarjeta);
    });
}

//ejecución inicial
pintarCatalogo();
