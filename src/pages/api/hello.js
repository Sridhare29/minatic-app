// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction  

// import multer from "multer";



// export default function handler(req, res) {
//     console.log(req.body)
//     console.log(req.body.title);
//     console.log(req.body.file);
//     console.log(req.body.type);
//     console.log(req.body.email);
//     console.log("Hello World")
//     // res.status(200).json({ name: 'John Doe' }) 
//     return res.status(200).json({ success: true });
// }
import nextConnect from 'next-connect';
import multer from 'multer';

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

const hello = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

hello.use(upload.array('file'));

hello.post((req, res) => {
  //  console.log(req.body.title)
  //  console.log(req.files) // file data sent! :)
  //  res.status(200).json({ data: 'success' });

  // pass audio to assemblyAi
  // get confirmation that it is done!
  
});

export default hello;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};