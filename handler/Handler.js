var async		= require('async'),
    fs			= require('fs'),
    request		= require('request'),

    app			= require('./../app'),
    mySqlConn	= app.mySqlConn,
    hostname	= require('os').hostname();


/**
 * 로그인
 *
 * @param body {String}
 * @param callback {Function(Error, Object, Number, String, String)} 에러, 유저 정보
 **/
function login(body, callback) {
    'use strict';


    mySqlConn.getConnection(function(err, connection) {
        if (err) {
            // if (connection && connection.release) {
            // 	connection.release();
            // }
            connection.release();
            return callback(err);
        }



        async.waterfall([


            /**
             * 유저 조회
             *
             * @param cb {Function(Error, Object)}
             **/
            function(cb) {
                connection.query("SELECT userId, name, birth FROM member  WHERE userId = ? AND pw = ?", [body.userId, body.pw], function(err, rows) {
                    if (err) {
                        console.log(this.sql);
                        return cb(err);
                    }
                    if (!rows.length) {
                        console.log(rows);
                        return cb({status: 400, message: 'user not found'});
                    }


                    cb(null, rows[0]);

                });
            }

        ], function(err, result) {
            connection.release();
            if (err) {
                return callback(err);
            }


            callback(null, result);
        });
    });
}//end of login




/**
 *
 * @param body {Object}
 * @param ip {String}
 * @param callback {Function(Error, Object)}
 **/
function createUser(body, callback) {
    'use strict';

     var  userId = body.userId,
        pw = body.pw,
        name = body.name,
         birth = body.birth;

    mySqlConn.getConnection(function(err, connection) {
        if (err) {
            // if (connection && connection.release) {
            // 	connection.release();
            // }
            connection.release();
            return callback(err);
        }


        async.waterfall([
            /**
             * 중복 검사
             *
             * @param cb {Function(Error)}
             **/
            function(cb) {
                connection.query("SELECT COUNT(*) AS cnt FROM member WHERE userId = ?", [userId], function(err, rows) {
                    if (err) {
                        console.log(this.sql);
                        return cb(err);
                    }
                    console.log(this.sql);
                    if (rows[0].cnt) {
                        return cb({status: 400, message: 'already exist'});
                    }

                    cb();
                });
            },

            /**
             * 데이터 베이스에 넣기
             *
             * @param salt {String}
             * @param hash {String}
             * @param cb {Function(Error, Number, String)}
             **/
            function(cb) {


                connection.query("INSERT INTO member (userId, name, birth, pw) VALUES(?, ?, ?, ?)", [userId, name, birth, pw], function(err, result) {
                    if (err) {
                        console.log(this.sql);
                        return cb(err);
                    }
                    return cb(null);

                });
            }

        ], function(err) {
            connection.release();
            if (err) {
                 callback(err);
            }

            callback(null);
        });
    });
}//end of createUser




/**
 *
 * @param body {Object}
 * @param ip {String}
 * @param callback {Function(Error, Object)}
 **/
function createTest(body, callback) {
    'use strict';


    mySqlConn.getConnection(function(err, connection) {
        if (err) {
            // if (connection && connection.release) {
            // 	connection.release();
            // }
            connection.release();
            return callback(err);
        }


        async.waterfall([

            /**
             * 데이터 베이스에 넣기
             *
             * @param salt {String}
             * @param hash {String}
             * @param cb {Function(Error, Number, String)}
             **/
            function(cb) {


                connection.query("INSERT INTO test (title, content, example, correct) VALUES(?, ?, ?, ?)", [body.title,body.content,JSON.stringify(body.example),body.correct], function(err, result) {
                    if (err) {
                        console.log(this.sql);
                        return cb(err);
                    }
                    return cb(null);

                });
            }

        ], function(err) {
            connection.release();
            if (err) {
                callback(err);
            }

            callback(null);
        });
    });
}//end of createTest



/**
 *
 * @param body {Object}
 * @param ip {String}
 * @param callback {Function(Error, Object)}
 **/
function todayTest( callback) {
    'use strict';


    mySqlConn.getConnection(function(err, connection) {
        if (err) {
            // if (connection && connection.release) {
            // 	connection.release();
            // }
            connection.release();
            return callback(err);
        }


        async.waterfall([


            function(cb) {


                connection.query("select * from test order by rand() limit 20 ", function(err, result) {
                    if (err) {
                        console.log(this.sql);
                        return cb(err);
                    }
                    return cb(null, result);

                });
            }

        ], function(err,result) {
            connection.release();
            if (err) {
                callback(err);
            }

            callback(null,result);
        });
    });
}//end of todayTest


/**
 *
 * @param body {Object}
 * @param ip {String}
 * @param callback {Function(Error, Object)}
 **/
function insertTestResult(body,userId, callback) {
    'use strict';


    var data = [];

    for(var i = 0; i < body.test.length; i++){
        data.push([body.test[i]._id, userId, JSON.stringify(body.test[i].selected)]);
    }

    mySqlConn.getConnection(function(err, connection) {
        if (err) {
            // if (connection && connection.release) {
            // 	connection.release();
            // }
            connection.release();
            return callback(err);
        }


        async.waterfall([

            /**
             * 데이터 베이스에 넣기
             *
             * @param salt {String}
             * @param hash {String}
             * @param cb {Function(Error, Number, String)}
             **/
            function(cb) {


                connection.query("INSERT INTO test_result (testId, userId, correct) VALUES ?", [data], function(err, result) {
                    if (err) {
                        console.log(this.sql);
                        return cb(err);
                    }
                    return cb(null);

                });
            }

        ], function(err) {
            connection.release();
            if (err) {
                callback(err);
            }

            callback(null);
        });
    });
}//end of insertTestResult



/**
 *
 * @param body {Object}
 * @param ip {String}
 * @param callback {Function(Error, Object)}
 **/
function getTestResult(userId, callback) {
    'use strict';


    mySqlConn.getConnection(function(err, connection) {
        if (err) {
            // if (connection && connection.release) {
            // 	connection.release();
            // }
            connection.release();
            return callback(err);
        }


        async.waterfall([


            function(cb) {


                connection.query("select testId,correct from test_result   where userId = ? AND  date = (select date from test_result where userId = ? order by _id desc limit 1 )",[userId,userId], function(err, result) {
                    if (err) {
                        console.log(this.sql);
                        return cb(err);
                    }

                    return cb(null, result);

                });
            }

        ], function(err,result) {
            connection.release();
            if (err) {
                callback(err);
            }

            callback(null,result);
        });
    });
}//end of getTestResult


/**
 *
 * @param body {Object}
 * @param ip {String}
 * @param callback {Function(Error, Object)}
 **/
function getTest(testId,userId, callback) {
    'use strict';



    mySqlConn.getConnection(function(err, connection) {
        if (err) {
            // if (connection && connection.release) {
            // 	connection.release();
            // }
            connection.release();
            return callback(err);
        }


        async.waterfall([


            function(cb) {


                connection.query("select * from test  where _id in (?)",[testId], function(err, result) {
                    if (err) {
                        console.log(this.sql);
                        return cb(err);
                    }
                    return cb(null, result);

                });
            }

        ], function(err,result) {
            connection.release();
            if (err) {
                callback(err);
            }

            callback(null,result);
        });
    });
}//end of getTest



/**
 *
 * @param body {Object}
 * @param ip {String}
 * @param callback {Function(Error, Object)}
 **/
function getUserList(callback) {
    'use strict';



    mySqlConn.getConnection(function(err, connection) {
        if (err) {
            // if (connection && connection.release) {
            // 	connection.release();
            // }
            connection.release();
            return callback(err);
        }


        async.waterfall([


            function(cb) {


                connection.query("select * from member  where userId != 'admin' ",[], function(err, result) {
                    if (err) {
                        console.log(this.sql);
                        return cb(err);
                    }
                    return cb(null, result);

                });
            }

        ], function(err,result) {
            connection.release();
            if (err) {
                callback(err);
            }

            callback(null,result);
        });
    });
}//end of getUserList


/**
 *
 * @param body {Object}
 * @param ip {String}
 * @param callback {Function(Error, Object)}
 **/
function getBoardList(userId, callback) {
    'use strict';



    mySqlConn.getConnection(function(err, connection) {
        if (err) {
            // if (connection && connection.release) {
            // 	connection.release();
            // }
            connection.release();
            return callback(err);
        }


        async.waterfall([


            function(cb) {


                connection.query("select * from board  where userId = ?  ",[userId], function(err, result) {
                    if (err) {
                        console.log(this.sql);
                        return cb(err);
                    }
                    return cb(null, result);

                });
            }

        ], function(err,result) {
            connection.release();
            if (err) {
                callback(err);
            }

            callback(null,result);
        });
    });
}//end of getBoardList


/**
 *
 * @param body {Object}
 * @param ip {String}
 * @param callback {Function(Error, Object)}
 **/
function getBoardListAdmin(userId, callback) {
    'use strict';



    mySqlConn.getConnection(function(err, connection) {
        if (err) {
            // if (connection && connection.release) {
            // 	connection.release();
            // }
            connection.release();
            return callback(err);
        }


        async.waterfall([


            function(cb) {


                connection.query("select * from board   ",[], function(err, result) {
                    if (err) {
                        console.log(this.sql);
                        return cb(err);
                    }
                    return cb(null, result);

                });
            }

        ], function(err,result) {
            connection.release();
            if (err) {
                callback(err);
            }

            callback(null,result);
        });
    });
}//end of getBoardList

/**
 *
 * @param body {Object}
 * @param ip {String}
 * @param callback {Function(Error, Object)}
 **/
function getBoardDetail(boardId, callback) {
    'use strict';

    mySqlConn.getConnection(function(err, connection) {
        if (err) {
            // if (connection && connection.release) {
            // 	connection.release();
            // }
            connection.release();
            return callback(err);
        }


        async.waterfall([


            function(cb) {


                connection.query("select * from board  where _id = ?  ",[boardId], function(err, result) {
                    if (err) {
                        console.log(this.sql);
                        return cb(err);
                    }

                    return cb(null, result);

                });
            },

            function(board, cb) {


                connection.query("select * from answer  where boardId = ?  ",[boardId], function(err, result) {
                    if (err) {
                        console.log(this.sql);
                        return cb(err);
                    }
                    return cb(null, board, result);

                });
            }

        ], function(err,board, answer) {
            connection.release();
            if (err) {
                callback(err);
            }

            callback(null,board, answer);
        });
    });
}//end of getBoardDetail



/**
 *
 * @param body {Object}
 * @param ip {String}
 * @param callback {Function(Error, Object)}
 **/
function insertBoard(body,userId, callback) {
    'use strict';


    mySqlConn.getConnection(function(err, connection) {
        if (err) {
            // if (connection && connection.release) {
            // 	connection.release();
            // }
            connection.release();
            return callback(err);
        }


        async.waterfall([

            /**
             * 데이터 베이스에 넣기
             *
             * @param salt {String}
             * @param hash {String}
             * @param cb {Function(Error, Number, String)}
             **/
            function(cb) {


                connection.query("INSERT INTO board (title, content, userId) VALUES (?, ?, ?) ", [body.title, body.content, userId], function(err, result) {
                    if (err) {
                        console.log(this.sql);
                        return cb(err);
                    }
                    return cb(null);

                });
            }

        ], function(err) {
            connection.release();
            if (err) {
                callback(err);
            }

            callback(null);
        });
    });
}//end of insertBoard



/**
 *
 * @param body {Object}
 * @param ip {String}
 * @param callback {Function(Error, Object)}
 **/
function insertAnswer(body,userId, callback) {
    'use strict';
    mySqlConn.getConnection(function(err, connection) {
        if (err) {
            // if (connection && connection.release) {
            // 	connection.release();
            // }
            connection.release();
            return callback(err);
        }


        async.waterfall([

            /**
             * 데이터 베이스에 넣기
             *
             * @param salt {String}
             * @param hash {String}
             * @param cb {Function(Error, Number, String)}
             **/
            function(cb) {


                connection.query("INSERT INTO answer (boardId, content, userId) VALUES (?, ?, ?)", [body.boardId, body.content, userId], function(err, result) {
                    if (err) {
                        console.log(this.sql);
                        return cb(err);
                    }
                    return cb(null);

                });
            }

        ], function(err) {
            connection.release();
            if (err) {
                callback(err);
            }

            callback(null);
        });
    });


}//end of insertAnswer


/**
 *
 * @param body {Object}
 * @param ip {String}
 * @param callback {Function(Error, Object)}
 **/
function deleteBoard(body,userId, callback) {
    'use strict';
    mySqlConn.getConnection(function(err, connection) {
        if (err) {
            // if (connection && connection.release) {
            // 	connection.release();
            // }
            connection.release();
            return callback(err);
        }


        async.waterfall([

            /**
             * 데이터 베이스 삭제
             *
             * @param salt {String}
             * @param hash {String}
             * @param cb {Function(Error, Number, String)}
             **/
            function(cb) {


                connection.query("DELETE FROM board WHERE _id = ? ", [body.boardId], function(err, result) {
                    if (err) {
                        console.log(this.sql);
                        return cb(err);
                    }
                    return cb(null);

                });
            }

        ], function(err) {
            connection.release();
            if (err) {
                callback(err);
            }

            callback(null);
        });
    });


}//end of deleteBoard

module.exports = {
    createUser			: createUser,
    createTest			: createTest,
    login				: login,
    todayTest           : todayTest,
    insertTestResult    : insertTestResult,
    getTestResult         : getTestResult,
    getTest             : getTest,
    getUserList         : getUserList,
    getBoardList         : getBoardList,
    getBoardDetail         : getBoardDetail,
    insertBoard    : insertBoard,
    insertAnswer    : insertAnswer,
    getBoardListAdmin : getBoardListAdmin,
    deleteBoard         : deleteBoard

};

