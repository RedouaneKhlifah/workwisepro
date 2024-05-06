import multer from 'multer';


// Set up Multer storage
const storage = multer.memoryStorage(); // Store files in memory for processing

// Create Multer instance
const MulterUpload = multer({ storage: storage });

export default MulterUpload