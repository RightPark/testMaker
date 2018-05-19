var express = require('express');
var router = express.Router(),
handler			= require('./../handler/Handler');
/* GET home page. */
router.get('/', function(req, res, next) {
    var userId = req.session.userId || null;
  res.render('index', { userId: userId });
});

router.get('/test', function (req, res) {
    'use strict';
  if(!req.session.userId){
    res.redirect("/");
  }

  res.render('test', {});

});

router.post('/test', function(req, res) {
    'use strict';


    handler.createTest(req.body, function(err) {
        if (err) {

            if (err.status) {
                res.status(err.status);
                return res.json({error: err.message});
            }
            console.error(err);
            console.trace(err);
            res.status(500);
            return res.json({error: ' fail'});
        }



        res.json(true);
    });
});

router.get('/todayTest', function(req, res) {
    'use strict';


    handler.todayTest( function(err,result) {
        if (err) {

            if (err.status) {
                res.status(err.status);
                return res.json({error: err.message});
            }
            console.error(err);
            console.trace(err);
            res.status(500);
            return res.json({error: ' fail'});
        }



        res.json({status: true, result: result});
    });
});


router.post('/todayTest', function(req, res) {
    'use strict';

    var userId = req.session.userId;
    handler.insertTestResult( req.body,userId, function( err) {
        if (err) {

            if (err.status) {
                res.status(err.status);
                return res.json({error: err.message});
            }
            console.error(err);
            console.trace(err);
            res.status(500);
            return res.json({error: ' fail'});
        }



        res.json({status: true});
    });
});

router.get('/testResult', function (req, res) {
    'use strict';
    if(!req.session.userId){
        res.redirect("/");
    }

    res.render('testResult',  {userId:req.query.userId});

});



router.get('/getTestResult', function(req, res) {
    'use strict';

    var userId = req.session.userId;
    handler.getTestResult(userId, function(err,result) {
        if (err) {

            if (err.status) {
                res.status(err.status);
                return res.json({error: err.message});
            }
            console.error(err);
            console.trace(err);
            res.status(500);
            return res.json({error: ' fail'});
        }



        res.json({status: true, result: result});
    });
});

router.get('/getTest', function(req, res) {
    'use strict';

    var userId = req.session.userId;


    handler.getTest(req.query.testId,userId, function(err,result) {
        if (err) {

            if (err.status) {
                res.status(err.status);
                return res.json({error: err.message});
            }
            console.error(err);
            console.trace(err);
            res.status(500);
            return res.json({error: ' fail'});
        }



        res.json({status: true, result: result});
    });
});



router.get('/board', function(req, res) {
    'use strict';

    if(!req.session.userId){
       res.redirect("/");
    }

    var userId = req.session.userId;
    handler.getBoardList(userId, function(err,boardList) {
        if (err) {

            if (err.status) {
                res.status(err.status);
                return res.json({error: err.message});
            }
            console.error(err);
            console.trace(err);
            res.status(500);
            return res.json({error: ' fail'});
        }



        res.render('board', {boardList: boardList});
    });
});


router.get('/boardWrite', function(req, res) {
    'use strict';

    if(!req.session.userId){
           res.redirect("/");
    }

    res.render('boardWrite');
});


router.get('/boardDetail', function(req, res) {
    'use strict';

    if(!req.session.userId){
           res.redirect("/");
    }


    var boardId = req.query.boardId;
    handler.getBoardDetail(boardId, function(err,board, answer) {
        if (err) {

            if (err.status) {
                res.status(err.status);
                return res.json({error: err.message});
            }
            console.error(err);
            console.trace(err);
            res.status(500);
            return res.json({error: ' fail'});
        }



        res.render('boardDetail', {board: board, answer: answer});
    });
});

router.post('/insertBoard', function(req, res) {
    'use strict';

    var userId = req.session.userId;
    handler.insertBoard( req.body,userId, function( err) {
        if (err) {

            if (err.status) {
                res.status(err.status);
                return res.json({error: err.message});
            }
            console.error(err);
            console.trace(err);
            res.status(500);
            return res.json({error: ' fail'});
        }



        res.json({status: true});
    });
});

router.post('/insertAnswer', function(req, res) {
    'use strict';

    var userId = req.session.userId;
    handler.insertAnswer( req.body,userId, function( err) {
        if (err) {

            if (err.status) {
                res.status(err.status);
                return res.json({error: err.message});
            }
            console.error(err);
            console.trace(err);
            res.status(500);
            return res.json({error: ' fail'});
        }



        res.json({status: true});
    });
});

router.delete('/board', function(req, res) {
    'use strict';


    var userId = req.session.userId;
    handler.deleteBoard( req.query,userId, function( err) {
        if (err) {

            if (err.status) {
                res.status(err.status);
                return res.json({error: err.message});
            }
            console.error(err);
            console.trace(err);
            res.status(500);
            return res.json({error: ' fail'});
        }



        res.json({status: true});
    });
});


module.exports = router;
