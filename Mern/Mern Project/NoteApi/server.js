import fs from "fs/promises"
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, "data.json");

const readnote = async () => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  }
  catch (error) {
    return { notes: [] };
  }
}
const writenote = async (data) => {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2))
}

//Express app

import express from 'express';
const app = express()
const port = 3000
app.use(express.json())

// get notes
app.get('/notes', async (req, res) => {
  try {
    const data = await readnote()
    res.status(200).json({
      success: true,
      count: data.notes.length,
      data: data.notes
    });
  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error reading notes'
    });
  }

})

//post notes
app.post('/notes', async (req, res) => {
  try {

    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both title and content'
      })
    };
    const newnote = {
      id: Date.now(),
      title,
      content,
      createdAt: new Date().toISOString()
    };
    const data = await readnote();
    data.notes.push(newnote)
    await writenote(data)
    res.status(200).json({
      success: true,
      data: newnote
    });

  }
  catch (error) {
    console.error("Full error:", error); // ADD THIS LINE
    res.status(500).json({
      success: false,
      message: 'Error creating note',
      error: error.message // ADD THIS LINE (for debugging only)
    });
  }

})

// get user by id
app.get('/notes/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await readnote();
    const note = data.notes.find(note => note.id === Number(id))

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "note not found"
      });
    }
    res.status(200).json({
      success: true,
      data: note
    });
  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error reading notes'
    });
  }

})

// Put request

app.put('/notes/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { title, content } = req.body
    if (!title && !content) {
      return res.status(400).json({
        success: false,
        message: 'Please provide at least title or content to update'
      })
    };
    const data = await readnote();
    const index = data.notes.findIndex(note => note.id === Number(id))

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }
    if (title) {
      data.notes[index].title = title;
    }
    if (content) {
      data.notes[index].content = content;
    }
    await writenote(data);

    res.status(200).json({
      success: true,
      data: data.notes[index]
    });

  }
  catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: 'Error updating note'
    });
  }

})

//Delete 

app.delete('/notes/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await readnote();
    const index = data.notes.findIndex(note => note.id === Number(id))
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }
    data.notes.splice(index, 1);

    res.status(200).json({
      success: true,
      message: 'Note deleted successfully',
      data: data.notes[index]
    });
  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting notes'
    });
  }

})


app.listen(3000, () => {
  console.log("hey i am listening")
})