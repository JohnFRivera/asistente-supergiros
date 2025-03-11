import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import resultadoRoutes from './src/routes/resultado.routes.js';
import process from 'child_process';

const PORT = 3000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(resultadoRoutes);

app.server = app.listen(PORT, () => {
	console.log('\nAPLICACIÓN INICIADA');
	console.log('Servidor establecido en: http://0.0.0.0:' + PORT);
	console.log('\n\x1b[31mPara cerrar la aplicación preciona (Ctrl + C), digita (S) y dale a (Enter).\x1b[0m');
	process.exec('start http://localhost:' + PORT);
});
