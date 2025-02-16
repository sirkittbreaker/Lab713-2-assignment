import { Book } from "../models/Books";
import * as repo from "../repository/bookRepository";

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
