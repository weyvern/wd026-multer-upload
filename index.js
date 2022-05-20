import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const port = process.env.PORT || 5000;
const upload = multer({ dest: 'uploads/' });
const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static('uploads'));

app.get('/', (req, res) => res.sendFile('./views/index.html', { root: __dirname }));

app.post('/upload-profile-pic', upload.single('profile_pic'), (req, res) => {
  if (!req.file) return res.send('PLEASE UPLOAD SOMETHING');
  res.send(
    `<h2>Here is the picture:</h2><img src="${req.file.filename}" alt="something" width='300px'/>`
  );
});

app.listen(port, () => console.log(`Server running on port ${port}`));
