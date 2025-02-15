import express, { Request, Response } from "express";
import {
  Book,
  addBook,
  getAllBooks,
  getBookById,
  getBookByTitle,
} from "./service/bookService";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
app.get("/books", (req: Request, res: Response) => {
  if (req.query.title) {
    const title = req.query.title as string;
    const filteredBooks = getBookByTitle(title);
    res.json(filteredBooks);
  } else {
    res.json(getAllBooks());
  }
});
app.get("/books/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const book = getBookById(id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).send("Book not found");
  }
});
app.post("/books", (req: Request, res: Response) => {
  const newBook: Book = req.body;
  addBook(newBook);
  res.json(newBook);
});
app.put("/books/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const book = getBookById(id);
  if (book) {
    Object.assign(book, req.body);
    res.json(book);
  } else {
    res.status(404).send("Book not found");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
