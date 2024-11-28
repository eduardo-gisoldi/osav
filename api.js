const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Configuração do app e middlewares
const app = express();
app.use(express.urlencoded({ extended: true })); // Para dados enviados em x-www-form-urlencoded
app.use(express.json()); // Para JSON (caso seja usado futuramente)

app.use(cors());

// Conexão com o MongoDB
mongoose.connect('mongodb+srv://luisgisoldi:1301@cluster0.uhihh.mongodb.net/osav?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Definição do modelo para os dados do formulário
const FormularioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  modelodesite: { type: String, required: true },
  area_atuacao: { type: String, required: true },
  telefone: { type: String, required: true },
  prazodeentrega: { type: String },
  mensagem: { type: String, required: true },
});

const Formulario = mongoose.model('Formulario', FormularioSchema);

// Rota para receber os dados do formulário
app.post('/enviar-contato', async (req, res) => {
  console.log(req.body); // Verifique se os dados estão chegando corretamente
  try {
    const dados = req.body;
    const novoFormulario = new Formulario(dados);
    await novoFormulario.save();
    res.status(201).json({ message: 'Dados enviados com sucesso!' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao salvar os dados', details: error.message });
  }
});

// Inicialização do servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
