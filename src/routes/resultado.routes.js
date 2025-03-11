import { Router } from "express";

const router = Router();

router.get('/api/resultado', async (req, res) => {
    try {
        let response = await fetch('https://portal.supergirosnortedelvalle.com/api/resultados');
        let data = await response.json();
        let results = [];
        if (!response.ok) {
            res.status(400).send({
                title: 'Error al consumir api de resultados',
                error: data
            });
        }
        if (data.resultados.length > 0) {
            results = data.resultados.map(l => {
                return {
                    name: l.lottery.display_name.toLowerCase().trim().split(' ').join('-').normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                    number: l.number,
                };
            });
        }
        res.status(200).send({ results });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            title: 'Error al consultar los resultados',
            error
        });
    }
});

export default router;
