import express from "express";
import connectDB from "./config/db.js";
import contactRoutes from './routes/contactRoutes.js';  
const app = express();
const PORT = 3000;

connectDB();
app.use(express.json())
app.use('/api/contacts',contactRoutes)
app.get('/', (req, res) => {
  res.json({ 
    message: 'Contact Manager API',
    status: 'Running',
    endpoints: {
      getAllContacts: 'GET /api/contacts',
      getContact: 'GET /api/contacts/:id',
      createContact: 'POST /api/contacts',
      updateContact: 'PUT /api/contacts/:id',
      deleteContact: 'DELETE /api/contacts/:id'
    }
  });
});
// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});