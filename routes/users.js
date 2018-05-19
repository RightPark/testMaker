var express = require('express'),
 router = express.Router(),
    handler			= require('./../handler/Handler');



router.get('/join', function (req, res) {
    'use strict';

    res.render('join', {});

});


router.get('/login', function (req, res) {
    'use strict';


    res.render('login', {});

});



router.post('/login', function(req, res) {
    'use strict';


    handler.login(req.body, function(err, user) {
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


         console.log(user);
        req.session.userId = user.userId;
        req.session.birth = user.birth;
        req.session.name = user.name;


        req.session.save(function(err) {
            if (err) {
                console.error(err);
                console.trace(err);
                res.status(500);
                return res.json({error: 'login error'});
            }



            res.json({status: true, user: user});
        });
    });
});

router.post('/join', function(req, res) {
    'use strict';


    handler.createUser(req.body, function(err) {
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

module.exports = router;
