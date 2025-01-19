const dotenv = require("dotenv");
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pdf = require('pdf-parse');
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();
const cors = require('cors');

const app = express();
const PORT = 5000;
const genAI = new GoogleGenerativeAI("AIzaSyBpUN2lbREgDcTs7MGo7QnSXikSbN8vU3M");
CORS_ORIGIN="http://localhost:5173"
app.use(cors({ origin: CORS_ORIGIN }));
const crypto = require('crypto');

const hashString = (input) => {
    return crypto.createHash('md5').update(input).digest('hex').charCodeAt(0);
};
async function generateRoast(resumeData) {
  try {
    
    const prompt=resumeData+"This so-called resume is a dumpster fire of mediocrity. Drag it through the mud, expose its flaws, and give the person a brutal reality check. If this mess isn't even a resume, mock them and demand a proper one. Keep it under 100 words and throw in some savage emojis and address it to the person"

   
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // console.log("Roast:", text);

    return text; // Return the generated roast text
  } catch (error) {
    console.error("Error generating roast:", error);
    return "Your resume is so bad it should come with an apology letter. Rethink your life choices and start over. 🚮📑" // Propagate the error to handle it further
  }
}
async function generateRoastCover(coverData) {
    try {
      
      const prompt=coverData+"This so-called cover letter is a dumpster fire of mediocrity. Drag it through the mud, expose its flaws, and give the person a brutal reality check. If this mess isn't even a cover letter, mock them and demand a proper one. Keep it under 100 words and throw in some savage emojis and address it to the person."
  
      
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
  
      return text; 
    } catch (error) {
      console.error("Error generating roast:", error);
      return "This cover letter is an insult to literacy. Try again, and this time, pretend you care. 🚨📝"
    }
  }

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDFs.'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});


app.use(express.json());


app.post('/api/upload', upload.array('Files'), async (req, res) => {
  try {
    const files = req.files;
    const nameEmp=req.body.nameEmp;
    
    if (!files || files.length === 0) {
      return res.status(400).send({ message: 'No files uploaded' });
    }

    
    const pdfDataPromises = files.filter(file => file.mimetype === 'application/pdf').map(async (file) => {
      const dataBuffer = fs.readFileSync(file.path);
      const data = await pdf(dataBuffer);
      return {
        fileName: file.originalname,
        numPages: data.numpages,
        numRender: data.numrender,
        info: data.info,
        metadata: data.metadata,
        text: data.text,
      };
    });

    const pdfDataArray = await Promise.all(pdfDataPromises);

    
    const resumeData = pdfDataArray.map(pdfData => pdfData.text).join("\n\n");
    let roastText=""
    
    if(nameEmp==="Resume")
    roastText = await generateRoast(resumeData);
else
roastText = await generateRoastCover(resumeData);

    // Respond with success message and generated roast
    res.status(200).send({
      message: 'Files uploaded and processed successfully',
      files,
      roast: roastText
    });
  } catch (error) {
    console.error("Error uploading or processing files:", error);
    res.status(500).send({ message: 'Error uploading or processing files', error: error.message });
  }
});

app.get("/", (req, res) => res.send("Express on Vercel"));

// Start the server
app.listen(PORT, () => {
  console.log("Server is running");
});