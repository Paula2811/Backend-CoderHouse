//Clase Usuario
class Usuario {
    constructor(nombre,apellido){
        this.nombre= nombre;
        this.apellido= apellido;
        this.libros= []
        this.mascotas= [];
    }
    getFullname(){
        console.log(`El nombre completo es: ${this.nombre} ${this.apellido}`)
    }
    addMascota(mascotas){
        this.mascotas.push(mascotas)
    }
    countMascotas(){
        console.log(this.mascotas.length)
    }
    addBook(nombre, autor){
        this.libros.push({nombre: nombre,autor:autor})
    }
    getBookNames(){
        let mapLibros = this.libros.map((libros)=> libros.nombre)
        console.log(mapLibros)
    }
}

const usuario1 = new Usuario ("Paula","Yunes")
usuario1.getFullname()
usuario1.addMascota("Umi")
usuario1.countMascotas()
usuario1.addBook("El libro de la selva","Rudyard Kipling")
usuario1.addBook("mi libro luna de pluton","Dross")
usuario1.getBookNames()