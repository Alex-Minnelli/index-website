//POST - Insert
//GET - Select
//PUT - Update
//DELETE - Delete

import express from 'express';
import mysql from 'mysql';
import dotenv from 'dotenv';
import cors from 'cors';

const envFound = dotenv.config();
if (!envFound) throw Error('Failed to load invironment variables');

const PORT = process.env.DB_PORT || 5000;

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA
})

const app = express();
app.use(cors());
app.use(express.json());

const query = (qryStr, values) => {
    return new Promise((resolve, reject) => {
        db.query(qryStr, values, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

/* app.post('/add/2tc/og', async (req, res) => {
    res.status(200).send(await query("INSERT INTO 2tc VALUES(?,?,?,?,?,?,?,?,?,?,?)",
        [req.body.number, req.body.tower1, 
        req.body.tower2, req.body.upgrades, 
        req.body.map, req.body.version, 
        req.body.date, req.body.person, 
        req.body.link, req.body.current, 
        req.body.og])
    )
})

app.post('/add/2tc/alt', async (req, res) => {
    res.status(200).send(await query("INSERT INTO 2tc VALUES(?,?,?,?,?,?,?,?,?,?,?)",
        [req.body.number, req.body.map, req.body.person, req.body.link, req.body.og])
    )
}) */



app.get('/2tc/og', async (req, res, next) => {
    try{res.status(200).send(await query('SELECT * FROM 2tc_og'))
    }catch(err) {next(err);}
})

app.get('/2tc/og/abbrev', async (req, res, next) => {
    try{res.status(200).send(await query('SELECT Number, `Tower 1`,`Tower 2`, Upgrades, abbrev as Map, Version, Date, Person, Link  from 2tc_og as o JOIN maps as m on o.map = m.map'))
    }catch(err) {next(err);}
})

app.get('/2tc/alt', async (req, res, next) => {
    try{res.status(200).send(await query('SELECT * FROM 2tc_alt'))
    }catch(err) {next(err);}
})


app.get('/2mpc/og', async (req, res, next) => {
    try{res.status(200).send(await query('SELECT * FROM 2mpc_og'))
    }catch(err) {next(err);}
})

app.get('/2mpc/alt', async (req, res, next) => {
    try{res.status(200).send(await query('SELECT * FROM 2mpc_alt'))
    }catch(err) {next(err);}
})

app.get('/2mpc/og/abbrev', async (req, res, next) => {
    try{res.status(200).send(await query('SELECT Number, Tower, Upgrades, abbrev as Map, Version, Date, Person, Link  from 2mpc_og as o JOIN maps as m on o.map = m.map'))
    }catch(err) {next(err);}
})


app.get('/fttc/og', async (req, res, next) => {
    try{res.status(200).send(await query('SELECT * FROM fttc_og'))
    }catch(err) {next(err);}
})

app.get('/fttc/alt', async (req, res, next) => {
    try{res.status(200).send(await query('SELECT * FROM fttc_alt'))
    }catch(err) {next(err);}
})


app.get('/lcc', async (req, res, next) => {
    try{res.status(200).send(await query('SELECT * FROM lcc'))
    }catch(err) {next(err);}
})


app.get('/lcd', async (req, res, next) => {
    try{res.status(200).send(await query('SELECT * FROM lcd'))
    }catch(err) {next(err);}
})


app.get('/2tcc/og', async (req, res, next) => {
    try{res.status(200).send(await query('SELECT * FROM 2tcc_og'))
    }catch(err) {next(err);}
})

app.get('/2tcc/alt', async (req, res, next) => {
    try{res.status(200).send(await query('SELECT * FROM 2tcc_alt'))
    }catch(err) {next(err);}
})


app.get('/maps', async (req, res, next) => {
    try{res.status(200).send(await query('SELECT * FROM maps'))
    }catch(err) {next(err);}
})

app.get('/average/lcc', async(req, res, next) => {
    try{res.status(200).send(await query('SELECT difficulty, floor(AVG(lcc.cost)) as `Average Cost` from lcc join maps on lcc.map = maps.map GROUP BY difficulty'))
    }catch(err) {next(err);}
})

app.get('/average/lcd', async(req, res, next) => {
    try{res.status(200).send(await query('SELECT difficulty, floor(AVG(lcd.cost)) as `Average Cost` from lcd join maps on lcd.map = maps.map GROUP BY difficulty'))
    }catch(err) {next(err);}
})


app.get('/2tc/stats/Appearences/og', async(req, res, next) => {
    try{res.status(200).send(await query('SELECT person as Person,count(*) as `Total Count` FROM 2tc_OG GROUP BY person ORDER BY `Total Count` DESC'))
    }catch(err) {next(err);}
})

app.get('/2tc/stats/Appearences/total', async(req, res, next) => {
    try{res.status(200).send(await query(`SELECT person as Person, count(*) as \`Total Count\` FROM (SELECT o.person FROM 2tc_og as o UNION ALL SELECT a.person FROM 2tc_alt as a) as c GROUP BY Person ORDER BY \`Total Count\` DESC`))
    }catch(err) {next(err);}
})

app.get('/2tc/stats/versions', async(req,res, next) => {
    try{res.status(200).send(await query('SELECT floor(Version) as Version,count(*) as `Total Count` FROM 2tc_OG GROUP BY floor(Version)'))
    }catch(err) {next(err);}
})

app.get('/2tc/stats/maps', async(req,res, next) => {
    try{res.status(200).send(await query('SELECT Map,count(*) as `Total Count` FROM (SELECT o.map FROM 2tc_og as o UNION ALL SELECT m.Map FROM 2tc_alt as t join maps as m on t.Map = m.Abbrev) as c GROUP BY Map ORDER BY `Total Count` DESC'))
    }catch(err) {next(err);}
})

app.get('/2tc/stats/towers/og', async(req,res, next) => {
    try{res.status(200).send(await query('SELECT Tower,count(*) as `Total Count` FROM (SELECT `Tower 1` as Tower FROM 2tc_og UNION ALL SELECT `Tower 2` as Tower FROM 2tc_og) as x GROUP BY Tower ORDER BY `Total Count` DESC'))
    }catch(err) {next(err);}
})

app.get('/2tc/stats/towers/total', async(req,res, next) => {
    try{res.status(200).send(await query('SELECT Tower,count(*) as `Total Count` FROM (SELECT `Tower 1` as Tower FROM 2tc_og UNION ALL SELECT `Tower 2` as Tower FROM 2tc_og UNION ALL SELECT `Tower 1` FROM 2tc_alt as a JOIN 2tc_og as o on a.NUmber = o.Number UNION ALL SELECT `Tower 2` FROM 2tc_alt as a JOIN 2tc_og as o on a.NUmber = o.Number) as x GROUP BY Tower ORDER BY `Total Count` DESC'))
    }catch(err) {next(err);}
})



/* app.delete('/delete/2tc/:number/:map', async (req, res, next) => {
    try{res.status(200).send(await query('DELETE FROM 2tc WHERE Number = ? AND Map = ?', [req.params.number, req.params.map]))
    }catch(err) {next(err);}
}) */

//Error Handling Middleware
app.use(handleError)

function handleError(err, req, res, next){
    if(err){
        console.error(err)
        res.status(500).send(`Server Error: ${err}`)
    } else next();
}

app.listen(PORT, () => { console.log('Server listening at port 5000...') })