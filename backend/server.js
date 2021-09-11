// 필요한 모듈 
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

// express 서버 생성
const app = express();

//json 형태의 body를 parsing

app.use(bodyParser.json());


// //테이블 생성하기
// db.pool.query(`create table lists (
//     id INTEGER AUTO_INCREMENT, 
//     value TEXT,
//     PRIMARY KEY (id)
// )`, (err, results, fields) => {
//     console.log('results', results);
// });

//DB lists 테이블의 모든 데이터를 프론트 서버로 보내주기
app.get('/api/values', function (req, res) {
    //데이터베이스에서 모든 데이터 조회
    db.pool.query('select * from lists;',
        (err, results, fields) => {
            if (err)
                return res.status(500).send(err)
            else
                return res.json(results)
        });
});




//클라이언트에서 입력한 값을 데이터베이스 lists 테이블에 저장하기
app.post('/api/value', function (req, res, next) {
    db.pool.query(`insert into lists (value) values("${req.body.value}")`,
        (err, results, fields) => {
            if (err)
                return res.status(500).send(err)
            else
                return res.json({ success: true, value: req.body.value });
        });
});

app.listen(5000, () => {
    console.log('어플리케이션이 5000번 포트에서 시작되었습니다.');
});

