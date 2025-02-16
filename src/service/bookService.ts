import { Book } from "../models/books";
import * as repo from "../repository/bookRepositoryDb";

export function getBookByTitle(title: string): Promise<Book[]> {
  return repo.getBookByTitle(title);
}

export function getAllBooks(): Promise<Book[]> {
  return repo.getAllBooks();
}

export function getBookById(id: number): Promise<Book | undefined> {
  return repo.getBookById(id);
}

export function addBook(newBook: Book): Promise<Book> {
  return repo.addBook(newBook);
}

export function updateBook(
  id: number,
  updatedBook: Partial<Book>
): Promise<void> {
  return repo.updateBook(id, updatedBook);
}
