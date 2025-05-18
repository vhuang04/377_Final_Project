const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// post: save a playlist
app.post('/api/save-playlist', async (req, res) => {
  const { genre, playlist } = req.body;

  if (!genre || !Array.isArray(playlist)) {
    return res.status(400).json({ error: 'missing genre or playlist data' });
  }

  const { error } = await supabase
    .from('saved_playlists')
    .insert([{ genre, playlist, created_at: new Date() }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({ message: 'playlist saved successfully' });
});



// get: retrieve saved playlists
app.get('/api/playlists', async (req, res) => {
  const { data, error } = await supabase
    .from('saved_playlists')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
});

// start the server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
