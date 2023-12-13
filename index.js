const express = require('express');
const app = express();
const cors = require('cors')
const port = 3000;

// Utilisation de CORS, je dois me renseigner dessus
app.use(cors());
app.use(express.json());

app.get('/word', (req, res) => {
    let hiddenList = ['azalakpahon', 'anticonstitutionnellement', 'mariage', 'crush', 'aimer', 'famille', 'amis', 'coin', 'longuement'];
    let random = Math.floor(Math.random() * hiddenList.length);
    let word = hiddenList[random];
    res.json({data: word});
}); 

app.listen(port, () => {
    console.log(`Serveur lancé sur le port ${port}...`);
});