import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import compression from 'compression';
import helmet from 'helmet';

// Resolve directory roots for ES module syntax compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// ==========================================
// MIDDLEWARE STACK
// ==========================================

// HTTP header security shield configuration
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.tailwindcss.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdn.jsdelivr.net"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdn.jsdelivr.net"],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'"]
    }
  }
}));

// Apply GZIP compression algorithm over outgoing assets
app.use(compression());

// Parse incoming payloads natively
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve all portfolio asset files statically out of the current root directory
app.use(express.static(__dirname));

// ==========================================
// REST API BACKEND STUB CONTROLLERS
// ==========================================

/**
 * @route   GET /api/projects
 * @desc    Fetch portfolio metadata collection
 * @access  Public
 */
app.get('/api/projects', (req, res) => {
  // Stub datastore array mirror matching your app.js layout logic
  res.status(200).json([
    { id: 0, title: "E-Commerce Architecture Platform", active: true },
    { id: 1, title: "Sushi Artisan Restaurant Engine", active: true },
    { id: 2, title: "Dual Suite: Job Finder & Expense Hub", active: true }
  ]);
});

/**
 * @route   POST /api/contact
 * @desc    Catch customer contact or dynamic booking form data streams
 * @access  Public
 */
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: "Required contact attributes missing." });
  }

  // Placeholder hooks to insert your standard MongoDB/Mongoose collection schema insertions:
  // await ContactModel.create({ name, email, message });

  console.log(`[Inquiry Log Received]: From ${email}`);
  res.status(201).json({ success: true, msg: "Message pipeline completed successfully." });
});

// ==========================================
// CLIENT ROUTING & ERROR MATRIX
// ==========================================

// Fallback route mapping clean browser address changes down to entry file
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Centralized Asynchronous Error Handler Middleware Block
app.use((err, req, res, next) => {
  console.error("Unhandled Exception Exception Trace Stack:", err.stack);
  res.status(500).json({
    error: true,
    message: process.env.NODE_ENV === 'production' 
      ? 'An internal execution breakdown occurred.' 
      : err.message
  });
});

// ==========================================
// BOOT INITIALIZATION
// ==========================================
app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`  Akhil Rana Portfolio Cluster Online`);
  console.log(`  Local Development Access URI: http://localhost:${PORT}`);
  console.log(`  Runtime Environment Mode: ${process.env.NODE_ENV || 'development'}`);
  console.log(`======================================================\n`);
});