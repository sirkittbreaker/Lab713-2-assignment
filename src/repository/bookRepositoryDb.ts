import type { Book } from "../models/books";
import connection from "../db";

export async function getBookByTitle(title: string): Promise<Book[]> {
  const [rows] = await connection.query(
    `SELECT * FROM books WHERE title LIKE ?`,
    [`${title}%`]
  );
  return rows as Book[];
}

export async function getAllBooks(): Promise<Book[]> {
  const [rows] = await connection.query(`SELECT * FROM books`);
  return rows as Book[];
}

export async function getBookById(id: number): Promise<Book | undefined> {
  const [rows] = await connection.query(`SELECT * FROM books WHERE id = ?`, [
    id,
  ]);
  const books = rows as Book[];
  return books.length > 0 ? books[0] : undefined;
}

export async function addBook(newBook: Book): Promise<Book> {
  const { title, author, description, groups } = newBook;
  const groupsString = groups.join(", ");
  const [result] = await connection.query(
    "INSERT INTO books (title, author, description, `groups`) VALUES (?, ?, ?, ?)",
    [title, author, description, groupsString]
  );
  newBook.id = (result as any).insertId;
  return newBook;
}

export async function updateBook(
  id: number,
  updatedBook: Partial<Book>
): Promise<void> {
  const { title, author, description, groups } = updatedBook;
  const groupsString = groups.join(", ");
  await connection.query(
    "UPDATE books SET title = ?, author = ?, description = ?, `groups` = ? WHERE id = ?",
    [title, author, description, groupsString, id]
  );
}
