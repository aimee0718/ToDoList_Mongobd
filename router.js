var express = require('express')
var List = require('./list')
var router = express.Router()

router.get('/index', function (req, res) {
    List.find(function (err, lists) {
        if (err) {
            return res.status(500).send('Server error.')
        }

        var unfinished_lists = []
        var finished_lists = []

        for (var key in lists) {
            var data = lists[key]
            if (data.status == false) {
                unfinished_lists.push(data)
            } else {
                finished_lists.push(data)
            }
        }
        res.render('index.html', {
            finished_lists: finished_lists,
            unfinished_lists: unfinished_lists
        })
    })

})

router.post('/index/add', function (req, res) {
    var list = req.body
    list.status = false
    new List(list).save(function (err, lists) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.redirect('/index')
    })
})

router.get('/index/remove', function (req, res) {
    List.findByIdAndRemove(req.query.id, function (err, lists) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.redirect('/index')
    })
})

router.get('/index/edit', function (req, res) {
    List.findById(req.query.id, function (err, list) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.send(list)
    })
})

router.post('/index/edit', function (req, res) {
    console.log('status: ');
    console.log(req.body.status);
    List.findByIdAndUpdate(req.body.id, req.body, function (err, list) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.redirect('/index')
    })
})

module.exports = router