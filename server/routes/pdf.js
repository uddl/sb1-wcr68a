import express from 'express';
import multer from 'multer';
import path from 'path';
import PDF from '../models/PDF.js';
import User from '../models/User.js';
import { authenticateToken, authorizePublisher } from '../middleware/auth.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/upload', authenticateToken, authorizePublisher, upload.single('pdf'), async (req, res) => {
  try {
    const { title } = req.body;
    const newPDF = new PDF({
      title,
      file: req.file.path,
      uploadedBy: req.user.userId,
    });
    await newPDF.save();
    res.status(201).json({ message: 'PDF uploaded successfully', pdf: newPDF });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading PDF', error: error.message });
  }
});

router.get('/list', authenticateToken, async (req, res) => {
  try {
    let pdfs;
    if (req.user.role === 'publisher') {
      pdfs = await PDF.find({ uploadedBy: req.user.userId });
    } else {
      const user = await User.findById(req.user.userId).populate('assignedPDFs');
      pdfs = user.assignedPDFs;
    }
    res.json(pdfs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching PDFs', error: error.message });
  }
});

router.post('/assign', authenticateToken, authorizePublisher, async (req, res) => {
  try {
    const { pdfId, userId } = req.body;
    const pdf = await PDF.findById(pdfId);
    const user = await User.findById(userId);
    
    if (!pdf || !user) {
      return res.status(404).json({ message: 'PDF or User not found' });
    }

    pdf.assignedTo.push(userId);
    user.assignedPDFs.push(pdfId);

    await pdf.save();
    await user.save();

    res.json({ message: 'PDF assigned successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error assigning PDF', error: error.message });
  }
});

export default router;