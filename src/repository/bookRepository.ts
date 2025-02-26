import type { Book } from "../models/books";

const books: Book[] = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description:
      "A novel about the serious issues of rape and racial inequality.",
    groups: ["Classic", "Fiction"],
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    description:
      "A dystopian novel set in a totalitarian society ruled by Big Brother.",
    groups: ["Dystopian", "Science Fiction"],
  },
  {
    id: 3,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "A novel about the American dream and the roaring twenties.",
    groups: ["Classic", "Fiction"],
  },
  {
    id: 4,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    description: "A story about teenage angst and alienation.",
    groups: ["Classic", "Fiction"],
  },
  {
    id: 5,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description:
      "A romantic novel that also critiques the British landed gentry.",
    groups: ["Classic", "Romance"],
  },
  {
    id: 6,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    description: "A fantasy novel about the journey of Bilbo Baggins.",
    groups: ["Fantasy", "Adventure"],
  },
  {
    id: 7,
    title: "Moby-Dick",
    author: "Herman Melville",
    description: "A novel about the voyage of the whaling ship Pequod.",
    groups: ["Classic", "Adventure"],
  },
  {
    id: 8,
    title: "War and Peace",
    author: "Leo Tolstoy",
    description: "A novel that chronicles the French invasion of Russia.",
    groups: ["Classic", "Historical"],
  },
  {
    id: 9,
    title: "The Odyssey",
    author: "Homer",
    description: "An epic poem about the journey of Odysseus.",
    groups: ["Classic", "Epic"],
  },
  {
    id: 10,
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    description:
      "A novel about the mental anguish of a young man who commits a crime.",
    groups: ["Classic", "Psychological"],
  },
];

export function getBookByTitle(title: string): Promise<Book[]> {
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().startsWith(title.toLowerCase())
  );
  return Promise.resolve(filteredBooks);
}

export function getAllBooks(): Promise<Book[]> {
  return Promise.resolve(books);
}

export function getBookById(id: number): Promise<Book | undefined> {
  return Promise.resolve(books.find((book) => book.id === id));
}

export function addBook(newBook: Book): Promise<Book> {
  newBook.id = books.length + 1;
  books.push(newBook);
  return Promise.resolve(newBook);
}
