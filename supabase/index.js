const express = require('express');
const supabaseClient = require('@supabase/supabase-js');
const bodyParser = require('body-parser')

const app = express()
const port = 3000;

app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))
const supabaseUrl = 'https://wgnzokbdjpsqicnckvzr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indnbnpva2JkanBzcWljbmNrdnpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0OTkyMjYsImV4cCI6MjA2MzA3NTIyNn0.weityzwK0h3Rxa-6mMe11o9bERwm0mbpjYOnDxH155I'
const supabase = supabaseClient.createClient(supabaseUrl,supabaseKey)

app.get('/customers',async (req,res)=> {
    console.log('attempting to GET all customer')
    const { data, error } = await supabase.from('customer').select();
    
    if(error){
        console.log(`error: ${error}`)
        res.statusCode = 500
        res.send(error)
    }

    res.send(data)
})



app.post('/customer', async (req, res) => {
    console.log('adding');
    console.log('Request body:', req.body);

    const firstName = req.body.Song;
    const lastName = req.body.Artist;

    console.log('Song:', firstName);
    console.log('Artist:', lastName);

    const { data, error } = await supabase
        .from('customer')
        .insert({ Song: firstName, Artist: lastName })
        .select()

    if(error){
        console.log(`error: ${error}`)
        res.statusCode = 500
        res.send(error)
    }

    res.send({ message: 'Received!', data: req.body });
});

app.listen(port, ()=> {
    console.log('app is alive on port', port)
});
