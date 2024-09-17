// // // npm i pdf-merger-js
// // console.log("hello adnan")
// // // const express = require('express')
// // import express from 'express';
// // const app = express();
// // const path = require('path')
// // // const app = express()
// // const multer = require('multer')
// // const { mergePdfs } = require('./merge')
// // const upload = multer({ dest: 'uploads/' })

// // app.use('/static', express.static("public"))
// // const port = 3000

// // app.get('/', (req, res) => {
// //   //   res.send('Hello World!')
// //   res.sendFile(path.join(__dirname, "template/index.html"))
// // })

// // app.post('/merge', upload.array('pdfs', 2), async (req, res, next) => {
// //   console.log(req.files)
// //   await mergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
// //   // res.send({data : req.files})

// //   res.redirect("http : //localhost:3000/static/merge.pdf")

// // })

// // app.listen(port, () => {
// //   console.log(`Example app listening on port https://localhost:${port}`)
// // })






// // server.js

// import express from 'express';
// import path from 'path';
// import multer from 'multer';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// import PDFMerger from 'pdf-merger-js';

// // Setup for ES module path resolution
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const app = express();
// const upload = multer({ dest: 'uploads/' });

// app.use('/static', express.static(path.join(__dirname, 'public')));
// const port = 3000;

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'template/index.html'));
// });

// app.post('/merge', upload.array('pdfs', 2), async (req, res, next) => {
//   console.log(req.files);

//   const pdfMerger = new PDFMerger();
//   await pdfMerger.add(path.join(__dirname, req.files[0].path));
//   d= await pdfMerger.add(path.join(__dirname, req.files[1].path));
//   await pdfMerger.save(path.join(__dirname, `public/${d}.pdf`));
  
//   res.redirect(`/static/${d}.pdf`);
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port http://localhost:${port}`);
// });













import express from 'express';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { mergePdfs } from './merge.js'; // Make sure to use `.js` extension

// Setup for ES module path resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use('/static', express.static(path.join(__dirname, 'public')));
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'template/index.html'));
});

app.post('/merge', upload.array('pdfs', 2), async (req, res, next) => {
  try {
    console.log(req.files);

    // Use mergePdfs function from merge.js
    const pdfId = await mergePdfs(
      path.join(__dirname, req.files[0].path),
      path.join(__dirname, req.files[1].path)
    );

    // Redirect to the merged PDF
    res.redirect(`/static/${pdfId}.pdf`);
  } catch (error) {
    next(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
