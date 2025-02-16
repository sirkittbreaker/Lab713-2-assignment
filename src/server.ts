import express, { Request, Response } from "express";
import {
  addBook,
  getAllBooks,
  getBookById,
  getBookByTitle,
  updateBook,
} from "./service/bookService";
import multer from "multer";
import { uploadFile } from "./service/uploadFileService";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

const upload = multer({ storage: multer.memoryStorage() });

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
    const updatedBook = req.body;
    await updateBook(id, updatedBook);
    res.json(updatedBook);
  } else {
    res.status(404).send("Book not found");
  }
});
app.post("/upload", upload.single("file"), async (req: any, res: any) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send("No file uploaded");
    }
    const bucket = process.env.SUPABASE_BUCKET_NAME!;
    const filePath = process.env.UPLOAD_DIR!;
    if (!bucket || !filePath) {
      return res.status(500).send("Bucket name or file path not configured.");
    }
    const outputUrl = await uploadFile(bucket, filePath, file);
    res.status(200).send(outputUrl);
  } catch (error) {
    res.status(500).send("Error uploading file");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
