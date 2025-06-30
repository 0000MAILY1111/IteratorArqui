class BookIterator {
    constructor(collection) {
        this.index = 0;
        this.collection = collection;
    }
    next() {
        if (this.hasNext()) {
            const item = this.collection.getItems()[this.index];
            this.index++;
            return item;
        }
        return null;
    }
    hasNext() {
        return this.index < this.collection.getItems().length;
    }
    reset() {
        this.index = 0;
    }
}
class Book {
    constructor(title, author, year) {
        this.title = title;
        this.author = author;
        this.year = year;
    }
    toString() {
        return `"${this.title}" por ${this.author} (${this.year})`;
    }
}
class BookCollection {
    constructor() {
        this.books = [];
    }
    addItem(book) {
        this.books.push(book);
        console.log(`📖 Libro agregado: ${book.toString()}`);
    }
    getItems() {
        return this.books;
    }
    createIterator() {
        return new BookIterator(this);
    }
    createAuthorIterator(authorName) {
        return new AuthorFilterIterator(this, authorName);
    }
}
class AuthorFilterIterator {
    constructor(collection, authorName) {
        this.index = 0;
        this.collection = collection;
        this.authorName = authorName;
        this.filteredBooks = collection.getItems().filter(book => book.author.toLowerCase().includes(authorName.toLowerCase()));
    }
    next() {
        if (this.hasNext()) {
            const item = this.filteredBooks[this.index];
            this.index++;
            return item;
        }
        return null;
    }
    hasNext() {
        return this.index < this.filteredBooks.length;
    }
    reset() {
        this.index = 0;
    }
}
export class IteratorDemo {
    static run() {
        console.log("🔄 === DEMO: Iterator Pattern === 🔄\n");
        const library = new BookCollection();
        // Agregar libros
        library.addItem(new Book("El Quijote", "Cervantes", 1605));
        library.addItem(new Book("Cien años de soledad", "García Márquez", 1967));
        library.addItem(new Book("1984", "George Orwell", 1949));
        library.addItem(new Book("El amor en los tiempos del cólera", "García Márquez", 1985));
        library.addItem(new Book("Rebelión en la granja", "George Orwell", 1945));
        console.log("\n📚 === Iterando todos los libros === 📚");
        const iterator = library.createIterator();
        while (iterator.hasNext()) {
            const book = iterator.next();
            if (book) {
                console.log(`  📖 ${book.toString()}`);
            }
        }
        console.log("\n🔍 === Iterando libros de García Márquez === 🔍");
        const authorIterator = library.createAuthorIterator("García Márquez");
        while (authorIterator.hasNext()) {
            const book = authorIterator.next();
            if (book) {
                console.log(`  ✨ ${book.toString()}`);
            }
        }
        console.log("\n🔄 === Reiniciando y usando el iterator otra vez === 🔄");
        iterator.reset();
        let count = 0;
        while (iterator.hasNext() && count < 3) {
            const book = iterator.next();
            if (book) {
                console.log(`  ${count + 1}. ${book.toString()}`);
                count++;
            }
        }
        console.log("\n✅ === Demo completada === ✅");
    }
}
//# sourceMappingURL=Book.js.map