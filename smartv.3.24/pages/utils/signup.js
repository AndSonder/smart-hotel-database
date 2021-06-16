const express = require('express');
const request = require('request');
const http = require("http");
const bodyParser = require('body-parser');
const url = require("url");
const formidable = require('formidable');
const path = require("path");
const fs = require("fs");
const app = express();
const mysql = require('mysql');
const multer = require('multer');
var connection = mysql.createConnection({
    multipleStatements: true
});


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '332638qaz',
    database: 'SmartHotel'
});
connection.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const appid = "wx718982cd8b3edaa7"; //开发者的appid
const appsecret = "b1cb5c7c65ae67ac55981a0fe13561a1"; //开发者的appsecret 登入小程序公共平台内查看

app.use('/login', (req, res) => {
    var code = req.query.code; //拿到传过来的code
    //调用 auth.code2Session接口，换取用户唯一标识 OpenID 和 会话密钥 session_key
    var url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appsecret}&js_code=${code}&grant_type=authorization_code`;
    request.get({
        'url': url
    }, (error, response, body) => {
        let abody = JSON.parse(body);
        console.log(body);
        res.json(abody);
    });
});

app.post('/users', function (req, res) {

    var wecharID_1 = req.body.wecharID;
    var roomID_1 = req.body.roomID;
    var startTime_1 = req.body.startTime;
    var endTime_1 = req.body.endTime;
    //var selSql = "select * from users where startTime <= '"+startTime_1+"' and endTime >= '"+endTime_1+"' and roomID = '"+roomID_1+"'" ;
    var selSql = "select * from users where roomID = '" + roomID_1 + "'";
    connection.query(selSql, function (err, data) {
        if (err) {
            console.log('[SELECT users_1 ERROR] - ', err.message);
            return;
        } else {}
        if (data == "") {
            var addSql = 'INSERT INTO users(wecharID,roomID,startTime,endTime,superUser) VALUES(?,?,?,?,?)';
            var addSqlParams = [wecharID_1, roomID_1, startTime_1, endTime_1, '0'];
            //var modSql = "update users set wecharID='"+wecharID_1+"',roomID='"+roomID_1+"',startTime='"+startTime_1+"',endTime='"+endTime_1+"' where roomID ='"+roomID_1+"'"
            connection.query(addSql, addSqlParams, function (err, data) {
                if (err) {
                    console.log('[INSERT ERROR] - ', err.message);
                    return;
                } else {
                    console.log("add first users ok");
                }
            });
        } else {
            var newselSql = "select * from users where (startTime > '" + startTime_1 + "' and startTime > '" + endTime_1 + "') or (endTime < '" + startTime_1 + "' and endTime < '" + endTime_1 + "') and roomID = '" + roomID_1 + "'";
            connection.query(newselSql, function (err, data) {
                if (err) {
                    console.log('[SELECT users_2 ERROR] - ', err.message);
                    return;
                } else {
                    console.log(data);
                }
                if (data != "") {
                    var newaddSql = 'INSERT INTO users(wecharID,roomID,startTime,endTime,superUser) VALUES(?,?,?,?,?)';
                    var newaddSqlParams = [wecharID_1, roomID_1, startTime_1, endTime_1, '0'];
                    connection.query(newaddSql, newaddSqlParams, function (err, data) {
                        if (err) {
                            console.log('[INSERT ERROR] - ', err.message);
                            return;
                        } else {
                            console.log("newadd  users ok");
                        }
                    });
                }
            });
        }
    });
});

//验证用户身份
app.get('/verification_1', function (req, res) {
    var wecharID_1 = req.query.wecharID;
    var selSql = "select * from users where wecharID = '" + wecharID_1 + "'";
    connection.query(selSql, function (err, data) {
        if (err) {
            console.log('[verification_1 ERROR] - ',err.message);
        } else {}
        if (data != "") {
            res.send({
                data: data
            });
        }
    });
});

app.get('/verification_2', function (req, res) {
    var wecharID_1 = req.query.wecharID;
    var delSql = "DELETE FROM users where wecharID = '" + wecharID_1 + "'";
    connection.query(delSql, function (err, data) {
        if (err) {
            console.log('[verification_2 ERROR] - ',err.message);
        } else {}
        if (data != "") {
            console.log(data);
            res.send({
                data: data
            });
        }
    });
});

//加载房间基本信息
app.get('/roominfo', function (req, res) {
    var sql = "select * from roominfo where disabled = '1' or disabled = '0'";
    connection.query(sql, function (err, data) {
        if (err) {
            console.log('[roominfo ERROR] - ',err.message);
        } else {}
        if (data != "") {
        	console.log("roominfo");
            console.log(data);
            res.send({
                data: data
            });
        }
    });
});

//查询房间已被预订的时间段
app.get('/bandTime', function (req, res) {
    var roomID_1 = req.query.roomID;
    var sql = "select * from users where roomID = '" + roomID_1 + "'";
    connection.query(sql, function (err, data) {
        if (err) {
            console.log('[bandTime ERROR] - ',err.message);
        } else {}
        if (data != '') {
            console.log(data);
            res.send({
                data: data
            })
        }
    })
})

app.get('/identity', function (req, res) {
    var openID_1 = req.query.openID;
    var selSql = "select * from  users where wecharID = '" + openID_1 + "'";
    connection.query(selSql, function (err, data) {
        if (err) {
            console.log('[identity ERROR] - ',err.message);
        } else {
            res.send({
                data: data
            });
        }
    });
})

app.get('/users', function (req, res) {
    var time_1 = req.query.time;
    var roomID_1 = req.query.roomID;
    console.log("users_time:",time_1)
    console.log(roomID_1)
    var sql = "select * from  users where startTime <= '" + time_1 + "' and endTime >= '" + time_1 + "' and roomID = '" + roomID_1 + "'";
    connection.query(sql, function (err, data) {
        if (err) {
            console.log('[users ERROR] - ',err.message);
        } else {
            res.send({
                data: data
            });
        }
    });
})


app.get('/hiddenusers', function (req, res) {
    var time_1 = req.query.time;
    var roomID_1 = req.query.roomID;
    var sql = "select * from  users where startTime <= '" + time_1 + "' and endTime >= '" + time_1 + "' and roomID = '" + roomID_1 + "'";
    connection.query(sql, function (err, data) {
        if (err) {
            console.log('[hiddenusers ERROR] - ',err.message);
        } else {
            console.log(data)
        }
        if (data != "") {
            res.send({
                data: data
            });
        }
    });
})

app.post('/rooms', function (req, res) {
    var roomID_1 = req.body.roomID;
    var peopleNum_1 = req.body.peopleNum;
    var roomTemperature_1 = req.body.roomTemperature;
    var roomHumidity_1 = req.body.roomHumidity;
    var airTemperature_1 = req.body.airTemperature;
    var airStatus_1 = req.body.airStatus;
    var airPattern_1 = req.body.airPattern;
    var wecharID_1 = req.body.wecharID;
    console.log(roomTemperature_1)
    console.log(roomHumidity_1)
    var selSql = "SELECT * FROM rooms where id = '" + roomID_1 + "'";
    connection.query(selSql, function (err, data) {
        if (err) {
            console.log('[postrooms ERROR] - ', err.message);
            return;
        } else {
            console.log(data);
            console.log("rooms_post_ok");

        }
        if (data != "") {
            var modSql = "update rooms set peopleNum='" + peopleNum_1 + "',roomTemperature='" + roomTemperature_1 + "',roomHumidity='" + roomHumidity_1 + "',airTemperature='" + airTemperature_1 + "',airStatus='" + airStatus_1 + "',airPattern='" + airPattern_1 + "',wecharID='" + wecharID_1 + "' where roomID = '" + roomID_1 + "'"
            connection.query(modSql, function (err, data) {
                if (err) {
                    console.log('[UPDATE ERROR] - ', err.message);
                    return;
                } else {
                    res.send({
                        data: data
                    })
                }
            })
        }
    })
})

app.get('/rooms', function (req, res) {
    var wecharID_1 = req.query.wecharID;
    var sql = "select * from rooms where wecharID = '" + wecharID_1 + "'";
    connection.query(sql, function (err, data) {
        if (err) {
            console.log('[getrooms ERROR] - ', err.message);
        } else {
            console.log('getrooms');
            console.log(data)
        }
        if (data != "") {
            console.log("rooms_GET_ok");
            res.send({
                data: data
            });
        }
    });
})

app.post("/img", (req, res) => {
    var form = new formidable.IncomingForm(); //既处理表单，又处理文件上传
    //设置文件上传文件夹/路径，__dirname是一个常量，为当前路径
    let uploadDir = path.join("../img/");
    form.uploadDir = uploadDir; // 设置文件的临时存储存储路径，如果不设置的话默认设置到 os.tmpdir()
    form.encoding = 'utf-8'; // 将请求信息编码设置为utf-8
    form.keepExtensions = true; // nodejs会默认将文件信息保存在一个没有后缀的文件中,设置为true将保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024; //文件大小
    form.parse(req, (err, fields, files) => {
        var roomID = fields.roomID;
        let oldPath = files.file.path; //这里的路径是图片的本地路径
        let newPath = '/home/ubuntu/img/' + roomID + '.jpg';
        fs.rename(oldPath, newPath, function (err) {
            if (!err) {
                console.log(newPath);
            }
        })
        res.send({
            code: 200,
            msg: '/img/' + newPath
        });
    })
})

app.post('/pay', function (req, res) {
    var openid_1 = req.body.openid;
    var money_1 = req.body.money;
    var selSql = "SELECT * FROM rooms where openid = '" + openid_1 + "'";
    connection.query(selSql, function (err, data) {
        if (err) {
            console.log('[pay ERROR] - ', err.message);
            return;
        } else {
            console.log("pay_post_ok");
            console.log(money_1);
        }
        if (data != "[]") {
            var modSql = "update users set money='" + money_1 + "'"
            connection.query(modSql, function (err, data) {
                if (err) {
                    console.log('[pay_money ERROR] - ', err.message);
                    return;
                }
            });
        }
    });

})

app.post('/enterUsers', function (req, res) {
    var wecharID_1 = req.body.wecharID;
    var roomID_1 = req.body.roomID;
    var startTime_1 = req.body.startTime;
    var endTime_1 = req.body.endTime;
    var addSql = 'INSERT INTO users(wecharID,roomID,startTime,endTime,superUser) VALUES(?,?,?,?,?)';
    var addSqlParams = [wecharID_1, roomID_1, startTime_1, endTime_1, '0'];
    connection.query(addSql, addSqlParams, function (err, data) {
        if (err) {
            console.log('[enterUsers ERROR] - ', err.message);
            return;
        } else {
            console.log("enterUsers_ok")
        }
    });
})

app.post('/enter', function (req, res) {
    var openid_1 = req.body.openid;
    var roomID_1 = req.body.roomID;
    var time_1 = req.body.time;
    var addSql = 'INSERT INTO enter(openid,roomID,time) VALUES(?,?,?)';
    var addSqlParams = [openid_1, roomID_1, time_1];
    connection.query(addSql, addSqlParams, function (err, data) {
        if (err) {
            console.log('[enter ERROR] - ', err.message);
            return;
        }
    });
})

var server = app.listen(6666, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})