import { Router, Request, Response } from "express";
import {
  addBook,
  getAllBooks,
  getBookById,
  getBookByTitle,
  updateBook,
} from "../service/bookService";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  if (req.query.title) {
    const title = req.query.title as string;
    const filteredBooks = await getBookByTitle(title);
    res.json(filteredBooks);
  } else {
    res.json(await getAllBooks());
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const book = await getBookById(id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).send("Book not found");
  }
});

router.post("/", async (req: Request, res: Response) => {
  const newBook = req.body;
  await addBook(newBook);
  res.json(newBook);
});

router.put("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const book = await getBookById(id);
  if (book) {
    const updatedBook = req.body;
    await updateBook(id, updatedBook);
    res.json(updatedBook);
  } else {
    res.status(404).send("Book not found");
  }
});

export default router;
