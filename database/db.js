const { render, resolveInclude } = require('ejs');
const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Airport-assignment',
    password: 'password',
    port: 5432,
});

module.exports = {
    query: (text, params) => {
        const start = Date.now();
        return pool.query(text, params)
            .then(res => {
                const duration = Date.now() - start;
                //console.log('executed query', {text, params, duration, rows: res.rows});
                res.rows.forEach(element => {
                    console.log(element);
                });
                return res.rows;
            });
    }
}
