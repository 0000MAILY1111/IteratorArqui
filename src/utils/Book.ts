
interface Iterator<T> {
    next(): T | null;
    hasNext(): boolean;
    reset(): void;
}

interface IterableCollection<T> {
    createIterator(): Iterator<T>;
    getItems(): T[];
    addItem(item: T): void;
}

class BookIterator implements Iterator<Book> {
    private collection: BookCollection;
    private index: number = 0;

    constructor(collection: BookCollection) {
        this.collection = collection;
    }

    next(): Book | null {
        if (this.hasNext()) {
            const item = this.collection.getItems()[this.index];
            this.index++;
            return item;
        }
        return null;
    }

    hasNext(): boolean {
        return this.index < this.collection.getItems().length;
    }

    reset(): void {
        this.index = 0;
    }
}


class Book {
    constructor(
        public title: string,
        public author: string,
        public year: number
    ) {}

    toString(): string {
        return `"${this.title}" por ${this.author} (${this.year})`;
    }
}

class BookCollection implements IterableCollection<Book> {
    private books: Book[] = [];

    addItem(book: Book): void {
        this.books.push(book);
        console.log(`📖 Libro agregado: ${book.toString()}`);
    }

    getItems(): Book[] {
        return this.books;
    }

    createIterator(): Iterator<Book> {
        return new BookIterator(this);
    }

    createAuthorIterator(authorName: string): Iterator<Book> {
        return new AuthorFilterIterator(this, authorName);
    }
}

class AuthorFilterIterator implements Iterator<Book> {
    private collection: BookCollection;
    private authorName: string;
    private filteredBooks: Book[];
    private index: number = 0;

    constructor(collection: BookCollection, authorName: string) {
        this.collection = collection;
        this.authorName = authorName;
        this.filteredBooks = collection.getItems().filter(
            book => book.author.toLowerCase().includes(authorName.toLowerCase())
        );
    }

    next(): Book | null {
        if (this.hasNext()) {
            const item = this.filteredBooks[this.index];
            this.index++;
            return item;
        }
        return null;
    }

    hasNext(): boolean {
        return this.index < this.filteredBooks.length;
    }

    reset(): void {
        this.index = 0;
    }
}

export class IteratorDemo {
    static run(): void {
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