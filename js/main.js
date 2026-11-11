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
