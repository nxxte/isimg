const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const { uploadToB2, deleteFromB2 } = require('../b2_client');

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const PROMPT = process.env.PROMPT;
const PROMPT_2 = process.env.PROMPT_2;
const PROMPT_LSIM2_1 = process.env.PROMPT_LSIM2_1;
const PROMPT_LSIM2_2 = process.env.PROMPT_LSIM2_2;
const BACK = process.env.BACK;


module.exports = () => {

    router.post('/data', upload.array('files'), async (req, res) => {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "No files uploaded" });
        }

        let uploads = [];
        try {
            console.log("uploading");
            uploads = await Promise.all(
                req.files.map(file => uploadToB2(file.buffer, file.originalname, file.mimetype))
            );
            const urls = uploads.map(u => u.url);

            const data = await GetData(urls, 1);
            res.status(200).send({ ai: data });

        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: "Internal server error" });
        } finally {
            await cleanupUploads(uploads);
        }
    });

    router.post('/data/sem', upload.array('files'), async (req, res) => {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "No files uploaded" });
        }

        let uploads = [];
        try {
            uploads = await Promise.all(
                req.files.map(file => uploadToB2(file.buffer, file.originalname, file.mimetype))
            );
            const urls = uploads.map(u => u.url);

            const data = await GetData(urls, 2);
            res.status(200).send({ ai: data });

        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: "Internal server error" });
        } finally {
            await cleanupUploads(uploads);
        }
    });

    // lsim 2 screenshot sem1
    router.post('/data/lsim2', upload.array('files'), async (req, res) => {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "No files uploaded" });
        }

        let uploads = [];
        try {
            uploads = await Promise.all(
                req.files.map(file => uploadToB2(file.buffer, file.originalname, file.mimetype))
            );
            const urls = uploads.map(u => u.url);

            const data = await GetData(urls, 3);
            res.status(200).send({ ai: data });

        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: "Internal server error" });
        } finally {
            await cleanupUploads(uploads);
        }
    });

    // lsim 2 screenshot sem2
    router.post('/data/lsim2/sem', upload.array('files'), async (req, res) => {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "No files uploaded" });
        }

        let uploads = [];
        try {
            uploads = await Promise.all(
                req.files.map(file => uploadToB2(file.buffer, file.originalname, file.mimetype))
            );
            const urls = uploads.map(u => u.url);

            const data = await GetData(urls, 4);
            res.status(200).send({ ai: data });

        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: "Internal server error" });
        } finally {
            await cleanupUploads(uploads);
        }
    });

    // lsim 1
    router.post('/data/pdf', upload.single('file'), async (req, res) => {

        if (!req.file) {
            return res.status(400).send("No file uploaded");
        }

        const sem = req.query.sem;
        let uploadResult = null;

        try {
            uploadResult = await uploadToB2(req.file.buffer, req.file.originalname, req.file.mimetype);

            const response = await fetch(`https://isimg-python.vercel.app/extract?url=${encodeURIComponent(uploadResult.url)}&sem=${sem}`);
            // const response = await fetch(`http://127.0.0.1:2000/extract?url=${encodeURIComponent(uploadResult.url)}&sem=${sem}`);
            const data = await response.json();
            res.status(200).send({pdf : JSON.stringify(data)});

        } catch (error) {
            console.error('Error during file upload:', error);
            res.status(500).send("Error during file upload");
        } finally {
            await cleanupUploads(uploadResult ? [uploadResult] : []);
        }
    });

    //lsim 2
    router.post("/data/pdf/lsim2", upload.single('file'), async (req, res) =>{

        if (!req.file) {
            return res.status(400).send("No file uploaded");
        }


        const sem = req.query.sem;
        console.log(sem)
        let uploadResult = null;

        try {
            uploadResult = await uploadToB2(req.file.buffer, req.file.originalname, req.file.mimetype);

            const response = await fetch(`https://isimg-python.vercel.app/extract/lsim2?url=${encodeURIComponent(uploadResult.url)}&sem=${sem}`);
            //const response = await fetch(`http://127.0.0.1:2000/extract/lsim2?url=${encodeURIComponent(uploadResult.url)}&sem=${sem}`);
            const data = await response.json();
            res.status(200).send({pdf : JSON.stringify(data)});

        } catch (error) {
            console.error('Error during file upload:', error);
            res.status(500).send("Error during file upload");
        } finally {
            await cleanupUploads(uploadResult ? [uploadResult] : []);
        }
    });

    //any
    router.post("/data/pdf/any", upload.single('file'), async (req, res) => {

        if (!req.file) {
            return res.status(400).send("No file uploaded");
        }

        let uploadResult = null;

        try {
            uploadResult = await uploadToB2(req.file.buffer, req.file.originalname, req.file.mimetype);

            const data = await GetPdfDataAny(uploadResult.url);

            if (!res.headersSent) {
                res.status(200).json({ pdf: data });
            }

        } catch (error) {
            console.error('Error during file upload:', error);
            if (!res.headersSent) {
                res.status(500).send("Error during file upload");
            }
        } finally {
            await cleanupUploads(uploadResult ? [uploadResult] : []);
        }
    });

    return router;
}

async function cleanupUploads(uploads) {
    await Promise.all(uploads.map(u =>
        deleteFromB2(u.fileId, u.key).catch(err =>
            console.error(`Failed to delete B2 file ${u.key}:`, err)
        )
    ));
}

async function GetData(urls, sem) {
    try {
        const promptMap = { 1: PROMPT, 2: PROMPT_2, 3: PROMPT_LSIM2_1, 4: PROMPT_LSIM2_2 };
        const systemInstruction = promptMap[sem] || PROMPT;

        const model = genAI.getGenerativeModel({
            model: process.env.GOOGLE_MODEL,
            systemInstruction
        });

        const imageParts = await Promise.all(urls.map(async (url) => {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            const base64 = Buffer.from(arrayBuffer).toString('base64');
            const mimeType = response.headers.get('content-type') || 'image/jpeg';
            return { inlineData: { data: base64, mimeType } };
        }));

        const result = await model.generateContent([
            { text: 'extract data' },
            ...imageParts
        ]);

        const aiResponse = result.response.text();
        const finalResponse = aiResponse.replace(/```json|```/g, '');
        console.log(finalResponse);
        return finalResponse;

    } catch (error) {
        console.error('Error in GetData:', error);
        throw error;
    }
}


async function GetPdfDataAny(pdfUrl) {
    const systemInstruction = `You are a precise data extraction assistant. Extract academic subject information from the provided PDF text and return it in a clean JSON format.

IMPORTANT RULES:
1. Extract subjects organized by semester (sem1, sem2)
2. For each subject, extract:
   - Subject name (Matière)
   - Coefficient (Coeff)
   - Credits
   - Exam types and scores (épreuves)
   - notes: list of exam components, each containing:
            -"type" → the label (e.g., DS, DS2, TP, Ex, Oral, etc) - extract dynamically
            -"cs" → the number found in parentheses beside the type (as float)
            -"note" → the numeric score beside it (as float)
3. If a note/score does not exist, use 0 (e.g., "ds": 0)
4. If sem2 does not exist in the document, return an empty array for sem2: []
5. Extract Filière (field of study) and Niveau (level/year)
6. Return ONLY valid JSON - no markdown, no code blocks, no backticks, no \\n characters
7. Be accurate with the semester assignment - verify which semester each subject belongs to
8. Do not assume fixed values for "cs" — always extract the actual number from the text (e.g. Ex (0.5) → "cs": 0.5).
9. If the same exam type appears more than once for a subject (e.g., two DS entries), label them sequentially as "DS" and "DS2", "TP" and "TP2", etc.
10. Ignore unit titles:
    - Lines or boxes like "Mathématiques 1 – Crédits = 5" or "Systèmes Embarqués – Crédits = 8" represent unit headers (unité d'enseignement), not subjects.
    - Do not include them in the JSON output.

Expected JSON structure:
{
  "filiere": "...",
  "niveau": "...",
  "sem1": [
    {
      "matiere": "Subject Name",
      "coeff": 0,
      "credits": 0,
      "notes": [
        { "type": "ds", "cs": 0.15, "note": 3.5 },
        { "type": "tp", "cs": 0.15, "note": 14 },
        { "type": "ex", "cs": 0.7, "note": 1 }
      ]
    }
  ],
  "sem2": []
}`;

    const model = genAI.getGenerativeModel({
        model: process.env.GOOGLE_MODEL,
        systemInstruction
    });

    const response = await fetch(pdfUrl);
    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const mimeType = response.headers.get('content-type') || 'application/pdf';

    const result = await model.generateContent([
        { text: 'Extract the subjects based on their semester from this PDF' },
        { inlineData: { data: base64, mimeType } }
    ]);

    const aiResponse = result.response.text();
    const finalResponse = aiResponse.replace(/```json|```/g, '');
    console.log(finalResponse);
    return finalResponse;
}
