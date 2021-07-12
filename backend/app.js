const express = require('express');
const app = express();
const connectDB = require('./db');
const PORT = process.env.PORT || 5000;
const authRouter = require('./routes/authRoute');
const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const multer = require('multer');
require('dotenv').config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './images'),
  filename: (req, file, cb) => cb(null, req.body.name),
});
const upload = multer({ storage: storage });

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/categories', categoryRouter);
app.post('/api/uploads', upload.single('file'), (req, res) =>
  res.status(200).json({ msg: 'File Uploaded' })
);

const startConnection = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log('server connected'));
  } catch (err) {
    console.log(err);
  }
};

startConnection();
