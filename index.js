import express from 'express';
import { readFileSync } from 'fs';
import { createServer } from 'https';
import path from 'path';
import { fileURLToPath } from 'url';
import resultadoRoutes from './src/routes/resultado.routes.js';
import process from 'child_process';

const PORT = 3000;
const app = express();
const options = {
	key: readFileSync('C:/Program Files/OpenSSL-Win64/bin/private.key'),
	cert: readFileSync('C:/Program Files/OpenSSL-Win64/bin/certificate.crt'),
}
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(resultadoRoutes);

createServer(options, app).listen(PORT, '0.0.0.0', () => {
	console.log('\nAPLICACIÓN INICIADA');
	console.log('Servidor establecido en: https://localhost:' + PORT);
	console.log('\n\x1b[31mPara cerrar la aplicación preciona (Ctrl + C), digita (S) y dale a (Enter).\x1b[0m');
	process.exec('start https://localhost:' + PORT);
});
