/*const express = require('express');
const app = express();

app.listen(3000);

app.all('/', (req, res) => { // app.get ...
    res.json( { ok: true} );
});*/

/*
const express = require('express');
const app = express();

const options = { // по дефолту всё false
    caseSensitive: true,
    strict: true,
};

const router = express.Router(options);

app.listen(3000);

router.get('/employees/:id', (req, res) => {
    res.json( { id: req.params.id } );
});

app.use('/v2/', router);*/

/*
const express = require('express');
const app = express();

const options = { // по дефолту всё false
    caseSensitive: true,
    strict: true,
};

const router = express.Router(options);

app.listen(3000);

router.param('id', (req, res, next, id) => {
    console.log(id); // вызовется один раз
    next();
});

router.get('/employees/:id', (req, res, next) => {
    console.log(req.params.id);
    next();
});

router.get('/employees/:id', (req, res) => {
    console.log(req.params.id);
    res.json({status: 'ok'});
});

app.use('/', router);*/

/*
// методы подряд после router.route
router.route('/employees/:id')
    .get((req, res) => {
            console.log(req.params.id);
            res.json({ id: req.params.id })
        }
    );*/
