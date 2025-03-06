import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import resultadoRoutes from './src/routes/resultado.routes.js';

const PORT = 3000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(resultadoRoutes);

app.server = app.listen(PORT, () => console.log('Execute server in: http://localhost:' + PORT));
