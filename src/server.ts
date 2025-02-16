import express, { Request, Response } from "express";
import {
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
app.get("/books", async (req: Request, res: Response) => {
  if (req.query.title) {
    const title = req.query.title as string;
    const filteredBooks = await getBookByTitle(title);
    res.json(filteredBooks);
  } else {
    res.json(await getAllBooks());
  }
});
app.get("/books/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const book = await getBookById(id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).send("Book not found");
  }
});
app.post("/books", async (req: Request, res: Response) => {
  const newBook = req.body;
  await addBook(newBook);
  res.json(newBook);
});
app.put("/books/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const book = await getBookById(id);
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
