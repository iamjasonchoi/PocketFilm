/**
 * @Author: Grayson
 * @Date: 2019/3/9
 */

var dbName = 'pocket'

var express = require('express');
var router = express.Router();
//  MongoDb 客户端
var mongoClient = require('mongodb').MongoClient;
//  MongoDB 连接地址
// var dbURL = 'mongodb://admin:weipeng185261@localhost:27017';
var dbURL = 'mongodb://admin:weipeng185261@47.240.95.27:27017';
//  MongoDb 的 ObjectId
var objectId = require('mongodb').ObjectId;
//  使用 Jquery
var jsdom = require('jsdom');
var {JSDOM} = jsdom;
var {document} = (new JSDOM('<!doctype html><html><body></body></html>')).window;
global.document = document;
const window = document.defaultView;
var $ = require('jquery')(window);

var urlParser = require('js-video-url-parser')

//  影视
var Movie = require('../models/movie');
//  影视类型
var MovieType = require('../models/movie_type');

//  响应数据
var responseData;

//  默认头像列表
var avatarList = [
    'http://api.grayson.top/public/avatars/1.png',
    'http://api.grayson.top/public/avatars/2.jpeg',
    'http://api.grayson.top/public/avatars/3.png',
    'http://api.grayson.top/public/avatars/4.jpeg'
]

//  入口
router.use(function (req, res, next) {
    next();
    responseData = {
        code: 0,
        message: 1,
    }
});

function strlen(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        //单字节加1
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            len++;
        }
        else {
            len += 2;
        }
    }
    return len;
}

/**
 *格式化时间
 * var str = getFormatDate();
 console.log(str);
 */

function getFormatDate() {
    var nowDate = new Date();
    var year = nowDate.getFullYear();
    var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
    var date = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
    var hour = nowDate.getHours() < 10 ? "0" + nowDate.getHours() : nowDate.getHours();
    var minute = nowDate.getMinutes() < 10 ? "0" + nowDate.getMinutes() : nowDate.getMinutes();
    var second = nowDate.getSeconds() < 10 ? "0" + nowDate.getSeconds() : nowDate.getSeconds();
    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}

/**
 *格式化时间
 * var str = getFormatDate();
 console.log(str);
 */

function getFormatDate2() {
    var nowDate = new Date();
    var year = nowDate.getFullYear();
    var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
    var date = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
    var hour = nowDate.getHours() < 10 ? "0" + nowDate.getHours() : nowDate.getHours();
    var minute = nowDate.getMinutes() < 10 ? "0" + nowDate.getMinutes() : nowDate.getMinutes();
    var second = nowDate.getSeconds() < 10 ? "0" + nowDate.getSeconds() : nowDate.getSeconds();
    return year + "年" + month + "月" + date + "日" + " " + hour + ":" + minute + ":" + second;
}

/**
 *格式化时间
 * var str = getFormatDate();
 console.log(str);
 */

function getFormatDate3() {
    var nowDate = new Date();
    var year = nowDate.getFullYear();
    var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
    var date = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
    return year + "-" + month + "-" + date;
}

/**
 * 生成指定范围的随机数
 * @param Min   最小值
 * @param Max   最大值
 * @returns {*} 指定范围的随机数
 * @constructor
 */

function getRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}

/**
 * 获取相册列表
 */
router.get('/album/get', function (req, res, next) {
    var name = req.query.album_name == null || req.query.album_name == "" ? 'null' : req.query.name
    var is_private = req.query.is_private == null || req.query.is_private == "" ? 'null' : req.query.is_private
    if (name == 'null') {
        if (is_private == 'null') {
            //  所有分类
            mongoClient.connect(dbURL, function (err, db) {
                var movie = db.db(dbName).collection('album_type');
                movie.find(
                    {},
                    {
                        sort: {update_time: -1},
                        collation: {locale: "zh"}
                    }).toArray(function (err, data) {
                    if (data) {
                        responseData.code = 0;
                        responseData.message = '相册类型信息获取成功';
                        responseData.data = data;
                        responseData.count = data.length;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '相册类型信息获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        } else {
            //  所有分类
            mongoClient.connect(dbURL, function (err, db) {
                var movie = db.db(dbName).collection('album_type');
                movie.find(
                    {
                        is_private: is_private
                    },
                    {
                        sort: {update_time: -1},
                        collation: {locale: "zh"}
                    }).toArray(function (err, data) {
                    if (data) {
                        responseData.code = 0;
                        responseData.message = '相册类型信息获取成功';
                        responseData.data = data;
                        responseData.count = data.length;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '相册类型信息获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        }
    } else {
        if (is_private == 'null') {
            //  所有分类
            mongoClient.connect(dbURL, function (err, db) {
                var movie = db.db(dbName).collection('album_type');
                movie.find(
                    {
                        name: name
                    },
                    {
                        sort: {update_time: -1},
                        collation: {locale: "zh"}
                    }).toArray(function (err, data) {
                    if (data) {
                        responseData.code = 0;
                        responseData.message = '相册类型信息获取成功';
                        responseData.data = data;
                        responseData.count = data.length;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '相册类型信息获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        } else {
            //  所有分类
            mongoClient.connect(dbURL, function (err, db) {
                var movie = db.db(dbName).collection('album_type');
                movie.find(
                    {
                        name: name,
                        is_private: is_private
                    },
                    {
                        sort: {update_time: -1},
                        collation: {locale: "zh"}
                    }).toArray(function (err, data) {
                    if (data) {
                        responseData.code = 0;
                        responseData.message = '相册类型信息获取成功';
                        responseData.data = data;
                        responseData.count = data.length;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '相册类型信息获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        }
    }
})

/**
 * 获取相册列表
 */
router.get('/photo/get', function (req, res, next) {
    var album_name = req.query.album_name == null || req.query.album_name == "" ? 'null' : req.query.album_name
    var upload_time = req.query.upload_time == null || req.query.upload_time == "" ? 'null' : req.query.upload_time
    if (album_name == 'null') {
        if (upload_time == 'null') {
            mongoClient.connect(dbURL, function (err, db) {
                var movie = db.db(dbName).collection('album');
                movie.find(
                    {},
                    {
                        sort: {upload_time: -1},
                        collation: {locale: "zh"}
                    }).toArray(function (err, data) {
                    if (data) {
                        responseData.code = 0;
                        responseData.message = '相册类型信息获取成功';
                        responseData.data = data;
                        responseData.count = data.length;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '相册类型信息获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        } else {
            mongoClient.connect(dbURL, function (err, db) {
                var movie = db.db(dbName).collection('album');
                movie.find(
                    {
                        upload_time:
                            {
                                $regex: upload_time
                            }
                    },
                    {
                        sort: {upload_time: -1},
                        collation: {locale: "zh"}
                    }).toArray(function (err, data) {
                    if (data) {
                        responseData.code = 0;
                        responseData.message = '相册类型信息获取成功';
                        responseData.data = data;
                        responseData.count = data.length;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '相册类型信息获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        }
    } else {
        //  获取相册信息
        mongoClient.connect(dbURL, function (err, db) {
            var movie = db.db(dbName).collection('album_type');
            movie.find(
                {
                    name: album_name
                },
                {
                    sort: {upload_time: -1},
                    collation: {locale: "zh"}
                }).toArray(function (err, data) {
                if (data) {
                    responseData.message = '相册类型信息获取成功';
                    responseData.album = data[0];
                    if (upload_time == 'null') {
                        mongoClient.connect(dbURL, function (err, db) {
                            var movie = db.db(dbName).collection('album');
                            movie.find(
                                {
                                    album_name: album_name
                                },
                                {
                                    sort: {upload_time: -1},
                                    collation: {locale: "zh"}
                                }).toArray(function (err, data) {
                                if (data) {
                                    responseData.code = 0;
                                    responseData.message = '相册类型信息获取成功';
                                    responseData.data = data;
                                    responseData.count = data.length;
                                    res.json(responseData);
                                } else {
                                    responseData.code = 1;
                                    responseData.message = '相册类型信息获取失败';
                                    res.json(responseData);
                                }
                                // 释放资源
                                db.close();
                            })
                        })
                    } else {
                        mongoClient.connect(dbURL, function (err, db) {
                            var movie = db.db(dbName).collection('album');
                            movie.find(
                                {
                                    upload_time:
                                        {
                                            $regex: upload_time
                                        },
                                    album_name: album_name
                                },
                                {
                                    sort: {upload_time: -1},
                                    collation: {locale: "zh"}
                                }).toArray(function (err, data) {
                                if (data) {
                                    responseData.code = 0;
                                    responseData.message = '相册类型信息获取成功';
                                    responseData.data = data;
                                    responseData.count = data.length;
                                    res.json(responseData);
                                } else {
                                    responseData.code = 1;
                                    responseData.message = '相册类型信息获取失败';
                                    res.json(responseData);
                                }
                                // 释放资源
                                db.close();
                            })
                        })
                    }
                } else {
                    responseData.code = 2;
                    responseData.message = '相册类型信息获取失败';
                    res.json(responseData);
                }
                // 释放资源
                db.close();
            })
        })
    }
})

/**
 * 获取资源数量
 */

router.get('/count/get', function (req, res, next) {
    var source_type = req.query.source_type == null || req.query.source_type == 'null' ? 'movie' : req.query.source_type
    if (source_type == 'movie') {
        // 影视类型 0：电影 1：电视剧 2：综艺 3：动漫
        var typeList = ['电影', '电视剧', '综艺', '动漫', '少儿']
        var type = req.query.type
        // 每页大小
        var page_size = req.query.page_size == null || req.query.page_size == 'null' ? 20 : +req.query.page_size
        // 当前页数
        var page_index = req.query.page_index == null || req.query.page_index == 'null' ? 1 : +req.query.page_index
        //  分类
        var type2 = req.query.type2 == null || req.query.type2 == 'null' ? '全部' : req.query.type2
        //  地区
        var region = req.query.region == null || req.query.region == 'null' ? '全部' : req.query.region
        //  年代
        var release_date = req.query.release_date == null || req.query.release_date == 'null' || req.query.release_date == '全部' ? '全部' : req.query.release_date
        //  关键词
        var key_word = req.query.key_word == '' || req.query.key_word == null || req.query.key_word == 'null' ? 'null' : req.query.key_word
        if (key_word == null || key_word == 'null') {
            if (req.query.sort_type == 0 || req.query.sort_type == 1) {
                // 根据更新时间进行排序
                if (type2 == '全部' && region == '全部' && release_date == '全部') {
                    //  所有分类
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {type: typeList[type]}).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data.length;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
                if (type2 == '全部' && region == '全部' && release_date != '全部') {
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {
                                type: typeList[type],
                                release_date: release_date,
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data.length;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
                if (type2 == '全部' && region != '全部' && release_date == '全部') {
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {
                                type: typeList[type],
                                region: region
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data.length;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
                if (type2 == '全部' && region != '全部' && release_date != '全部') {
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {
                                type: typeList[type],
                                region: region,
                                release_date: release_date
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data.length;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
                if (type2 != '全部' && region == '全部' && release_date == '全部') {
                    //  所有分类
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {
                                type: typeList[type],
                                type2: type2
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data.length;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
                if (type2 != '全部' && region == '全部' && release_date != '全部') {
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {
                                type: typeList[type],
                                type2: type2,
                                release_date: release_date,
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data.length;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
                if (type2 != '全部' && region != '全部' && release_date == '全部') {
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {
                                type: typeList[type],
                                type2: type2,
                                region: region
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data.length;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
                if (type2 != '全部' && region != '全部' && release_date != '全部') {
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {
                                type: typeList[type],
                                type2: type2,
                                region: region,
                                release_date: release_date
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data.length;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
            } else {
                // 根据评分进行排序
                if (type2 == '全部' && region == '全部' && release_date == '全部') {
                    //  所有分类
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {type: typeList[type]}).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data.length;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
                if (type2 == '全部' && region == '全部' && release_date != '全部') {
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {
                                type: typeList[type],
                                release_date: release_date,
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data.length;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
                if (type2 == '全部' && region != '全部' && release_date == '全部') {
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {
                                type: typeList[type],
                                region: region
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data.length;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
                if (type2 == '全部' && region != '全部' && release_date != '全部') {
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {
                                type: typeList[type],
                                region: region,
                                release_date: release_date
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data.length;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
                if (type2 != '全部' && region == '全部' && release_date == '全部') {
                    //  所有分类
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {
                                type: typeList[type],
                                type2: type2
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data.length;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
                if (type2 != '全部' && region == '全部' && release_date != '全部') {
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {
                                type: typeList[type],
                                type2: type2,
                                release_date: release_date,
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data.length;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
                if (type2 != '全部' && region != '全部' && release_date == '全部') {
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {
                                type: typeList[type],
                                type2: type2,
                                region: region
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data.length;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
                if (type2 != '全部' && region != '全部' && release_date != '全部') {
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {
                                type: typeList[type],
                                type2: type2,
                                region: region,
                                release_date: release_date
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data.length;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
            }
        } else {
            //  所有分类
            mongoClient.connect(dbURL, function (err, db) {
                var movie = db.db(dbName).collection('movie');
                movie.find(
                    {
                        $or: [{
                            name: {
                                $regex: key_word,
                                $options: "six"
                            }
                        }, {actors: {$elemMatch: {$regex: key_word, $options: "six"}}}]
                    }).toArray(function (err, data) {
                    if (data) {
                        responseData.code = 0;
                        responseData.message = '影视信息获取成功';
                        responseData.data = data.length;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '影视信息获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        }
    } else if (source_type == 'tv') {
        var type = req.query.type
        var selected_type = req.query.selected_type
        if (selected_type != null && selected_type != 'null' && selected_type != '全部') type = selected_type
        // 每页大小
        var page_size = req.query.page_size == null || req.query.page_size == 'null' ? 20 : +req.query.page_size
        // 当前页数
        var page_index = req.query.page_index == null || req.query.page_index == 'null' ? 1 : +req.query.page_index
        var key_word = req.query.key_word
        //  港澳台
        var hongkongMacaoTaiwanNameList = [
            '香港台',
            '澳门台',
            '台湾台'
        ]
        //  地方台
        var localStationNameList = [
            '广东台',
            '福建台',
            '天津台',
            '湖南台',
            '辽宁台',
            '河南台',
            '江西台',
            '内蒙古台',
            '新疆台',
            '上海台',
            '安徽台',
            '浙江台',
            '贵州台',
            '湖北台',
            '山西台',
            '山东台',
            '广西台',
            '北京台',
            '陕西台',
            '四川台',
            '吉林台',
            '重庆台',
            '河北台',
            '甘肃台',
            '江苏台',
            '海南台',
            '黑龙江台',
            '云南台',
            '宁夏台',
            '青海台'
        ]
        //  海外台
        var overseasStationNameList = [
            '韩国台',
            '英国台',
            '海外台',
            '美国台',
            '新加坡台',
            '印度台',
            '马来西亚台',
            '加拿大台',
            '法国台'
        ]
        if (key_word == null || key_word == 'null') {
            if (type == '全部') {
                //    全部
                mongoClient.connect(dbURL, function (err, db) {
                    var movie = db.db(dbName).collection('tv');
                    movie.find(
                        {}
                    ).toArray(function (err, data) {
                        if (data) {
                            responseData.code = 0;
                            responseData.message = '电视信息获取成功';
                            responseData.data = data.length;
                            res.json(responseData);
                        } else {
                            responseData.code = 1;
                            responseData.message = '电视信息获取失败';
                            res.json(responseData);
                        }
                        // 释放资源
                        db.close();
                    })
                })
            } else if (type == '港澳台') {
                //  港澳台
                mongoClient.connect(dbURL, function (err, db) {
                    var movie = db.db(dbName).collection('tv');
                    movie.find(
                        {type: {$in: hongkongMacaoTaiwanNameList}}).toArray(function (err, data) {
                        if (data) {
                            responseData.code = 0;
                            responseData.message = '电视信息获取成功';
                            responseData.data = data.length;
                            res.json(responseData);
                        } else {
                            responseData.code = 1;
                            responseData.message = '电视信息获取失败';
                            res.json(responseData);
                        }
                        // 释放资源
                        db.close();
                    })
                })
            } else if (type == '地方台') {
                //  地方台
                mongoClient.connect(dbURL, function (err, db) {
                    var movie = db.db(dbName).collection('tv');
                    movie.find(
                        {type: {$in: localStationNameList}}).toArray(function (err, data) {
                        if (data) {
                            responseData.code = 0;
                            responseData.message = '电视信息获取成功';
                            responseData.data = data.length;
                            res.json(responseData);
                        } else {
                            responseData.code = 1;
                            responseData.message = '电视信息获取失败';
                            res.json(responseData);
                        }
                        // 释放资源
                        db.close();
                    })
                })
            } else if (type == '海外台') {
                //  海外台
                mongoClient.connect(dbURL, function (err, db) {
                    var movie = db.db(dbName).collection('tv');
                    movie.find(
                        {type: {$in: overseasStationNameList}}).toArray(function (err, data) {
                        if (data) {
                            responseData.code = 0;
                            responseData.message = '电视信息获取成功';
                            responseData.data = data.length;
                            res.json(responseData);
                        } else {
                            responseData.code = 1;
                            responseData.message = '电视信息获取失败';
                            res.json(responseData);
                        }
                        // 释放资源
                        db.close();
                    })
                })
            } else {
                //  央视台、卫视台、轮播台、具体省份地方台
                mongoClient.connect(dbURL, function (err, db) {
                    var movie = db.db(dbName).collection('tv');
                    movie.find(
                        {type: type}).toArray(function (err, data) {
                        if (data) {
                            responseData.code = 0;
                            responseData.message = '电视信息获取成功';
                            responseData.data = data.length;
                            res.json(responseData);
                        } else {
                            responseData.code = 1;
                            responseData.message = '电视信息获取失败';
                            res.json(responseData);
                        }
                        // 释放资源
                        db.close();
                    })
                })
            }
        } else {
            if (type == '全部') {
                //    全部
                mongoClient.connect(dbURL, function (err, db) {
                    var movie = db.db(dbName).collection('tv');
                    movie.find(
                        {
                            name: {
                                $regex: key_word,
                                $options: "six"
                            }
                        }).toArray(function (err, data) {
                        if (data) {
                            responseData.code = 0;
                            responseData.message = '电视信息获取成功';
                            responseData.data = data.length;
                            res.json(responseData);
                        } else {
                            responseData.code = 1;
                            responseData.message = '电视信息获取失败';
                            res.json(responseData);
                        }
                        // 释放资源
                        db.close();
                    })
                })
            } else if (type == '港澳台') {
                //  港澳台
                mongoClient.connect(dbURL, function (err, db) {
                    var movie = db.db(dbName).collection('tv');
                    movie.find(
                        {
                            $and: [
                                {type: {$in: hongkongMacaoTaiwanNameList}},
                                {
                                    name: {
                                        $regex: key_word,
                                        $options: "six"
                                    }
                                }
                            ]
                        }).toArray(function (err, data) {
                        if (data) {
                            responseData.code = 0;
                            responseData.message = '电视信息获取成功';
                            responseData.data = data.length;
                            res.json(responseData);
                        } else {
                            responseData.code = 1;
                            responseData.message = '电视信息获取失败';
                            res.json(responseData);
                        }
                        // 释放资源
                        db.close();
                    })
                })
            } else if (type == '地方台') {
                //  地方台
                mongoClient.connect(dbURL, function (err, db) {
                    var movie = db.db(dbName).collection('tv');
                    movie.find(
                        {
                            $and: [
                                {type: {$in: localStationNameList}},
                                {
                                    name: {
                                        $regex: key_word,
                                        $options: "six"
                                    }
                                }
                            ]
                        }).toArray(function (err, data) {
                        if (data) {
                            responseData.code = 0;
                            responseData.message = '电视信息获取成功';
                            responseData.data = data.length;
                            res.json(responseData);
                        } else {
                            responseData.code = 1;
                            responseData.message = '电视信息获取失败';
                            res.json(responseData);
                        }
                        // 释放资源
                        db.close();
                    })
                })
            } else if (type == '海外台') {
                //  海外台
                mongoClient.connect(dbURL, function (err, db) {
                    var movie = db.db(dbName).collection('tv');
                    movie.find(
                        {
                            $and: [
                                {type: {$in: overseasStationNameList}},
                                {
                                    name: {
                                        $regex: key_word,
                                        $options: "six"
                                    }
                                }
                            ]
                        }).toArray(function (err, data) {
                        if (data) {
                            responseData.code = 0;
                            responseData.message = '电视信息获取成功';
                            responseData.data = data.length;
                            res.json(responseData);
                        } else {
                            responseData.code = 1;
                            responseData.message = '电视信息获取失败';
                            res.json(responseData);
                        }
                        // 释放资源
                        db.close();
                    })
                })
            } else {
                //  央视台、卫视台、轮播台、具体省份地方台
                mongoClient.connect(dbURL, function (err, db) {
                    var movie = db.db(dbName).collection('tv');
                    movie.find(
                        {
                            $and: [
                                {type: type},
                                {
                                    name: {
                                        $regex: key_word,
                                        $options: "six"
                                    }
                                }
                            ]
                        }).toArray(function (err, data) {
                        if (data) {
                            responseData.code = 0;
                            responseData.message = '电视信息获取成功';
                            responseData.data = data.length;
                            res.json(responseData);
                        } else {
                            responseData.code = 1;
                            responseData.message = '电视信息获取失败';
                            res.json(responseData);
                        }
                        // 释放资源
                        db.close();
                    })
                })
            }
        }
    } else if (source_type == 'drama') {
        var type = req.query.type
        // 每页大小
        var page_size = req.query.page_size == null || req.query.page_size == 'null' ? 20 : +req.query.page_size
        // 当前页数
        var page_index = req.query.page_index == null || req.query.page_index == 'null' ? 1 : +req.query.page_index
        var key_word = req.query.key_word
        if (key_word == null || key_word == 'null') {
            if (type == '全部') {
                //    全部
                mongoClient.connect(dbURL, function (err, db) {
                    var movie = db.db(dbName).collection('drama');
                    movie.find(
                        {}).toArray(function (err, data) {
                        if (data) {
                            responseData.code = 0;
                            responseData.message = '戏曲信息获取成功';
                            responseData.data = data.length;
                            res.json(responseData);
                        } else {
                            responseData.code = 1;
                            responseData.message = '戏曲信息获取失败';
                            res.json(responseData);
                        }
                        // 释放资源
                        db.close();
                    })
                })
            } else {
                //    全部
                mongoClient.connect(dbURL, function (err, db) {
                    var movie = db.db(dbName).collection('drama');
                    movie.find(
                        {
                            type: type
                        }).toArray(function (err, data) {
                        if (data) {
                            responseData.code = 0;
                            responseData.message = '戏曲信息获取成功';
                            responseData.data = data.length;
                            res.json(responseData);
                        } else {
                            responseData.code = 1;
                            responseData.message = '戏曲信息获取失败';
                            res.json(responseData);
                        }
                        // 释放资源
                        db.close();
                    })
                })
            }
        } else {
            if (type == '全部') {
                //  央视台、卫视台、轮播台、具体省份地方台
                mongoClient.connect(dbURL, function (err, db) {
                    var movie = db.db(dbName).collection('drama');
                    movie.find(
                        {
                            $and: [
                                {
                                    name: {
                                        $regex: key_word,
                                        $options: "six"
                                    }
                                }
                            ]
                        }).toArray(function (err, data) {
                        if (data) {
                            responseData.code = 0;
                            responseData.message = '戏曲信息获取成功';
                            responseData.data = data.length;
                            res.json(responseData);
                        } else {
                            responseData.code = 1;
                            responseData.message = '戏曲信息获取失败';
                            res.json(responseData);
                        }
                        // 释放资源
                        db.close();
                    })
                })
            } else {
                //  央视台、卫视台、轮播台、具体省份地方台
                mongoClient.connect(dbURL, function (err, db) {
                    var movie = db.db(dbName).collection('drama');
                    movie.find(
                        {
                            $and: [
                                {type: type},
                                {
                                    name: {
                                        $regex: key_word,
                                        $options: "six"
                                    }
                                }
                            ]
                        }).toArray(function (err, data) {
                        if (data) {
                            responseData.code = 0;
                            responseData.message = '戏曲信息获取成功';
                            responseData.data = data.length;
                            res.json(responseData);
                        } else {
                            responseData.code = 1;
                            responseData.message = '戏曲信息获取失败';
                            res.json(responseData);
                        }
                        // 释放资源
                        db.close();
                    })
                })
            }
        }
    } else if (source_type == 'piece') {
        var type = req.query.type == null || req.query.type == 'null' ? '全部' : req.query.type
        var type2 = req.query.type2 == null || req.query.type2 == 'null' ? '全部' : req.query.type2
        // 每页大小
        var page_size = req.query.page_size == null || req.query.page_size == 'null' ? 20 : +req.query.page_size
        // 当前页数
        var page_index = req.query.page_index == null || req.query.page_index == 'null' ? 1 : +req.query.page_index
        var key_word = req.query.key_word
        if (key_word == null || key_word == 'null') {
            if (type == '全部') {
                //    全部
                mongoClient.connect(dbURL, function (err, db) {
                    var movie = db.db(dbName).collection('piece');
                    movie.find(
                        {}).toArray(function (err, data) {
                        if (data) {
                            responseData.code = 0;
                            responseData.message = '小品信息获取成功';
                            responseData.data = data.length;
                            res.json(responseData);
                        } else {
                            responseData.code = 1;
                            responseData.message = '小品信息获取失败';
                            res.json(responseData);
                        }
                        // 释放资源
                        db.close();
                    })
                })
            } else {
                if (type2 == '全部') {
                    //    全部
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('piece');
                        movie.find(
                            {
                                type: type
                            },
                            {
                                sort: {name: 1},
                                collation: {locale: "zh"}
                            }
                        ).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '小品信息获取成功';
                                responseData.data = data.length;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '小品信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                } else {
                    //    全部
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('piece');
                        movie.find(
                            {
                                type: type,
                                type2: type2
                            },
                            {
                                sort: {name: 1},
                                collation: {locale: "zh"}
                            }
                        ).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '小品信息获取成功';
                                responseData.data = data.length;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '小品信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
            }
        } else {
            if (type == '全部') {
                //  央视台、卫视台、轮播台、具体省份地方台
                mongoClient.connect(dbURL, function (err, db) {
                    var movie = db.db(dbName).collection('piece');
                    movie.find(
                        {
                            $or: [
                                {
                                    name: {
                                        $regex: key_word,
                                        $options: "six"
                                    }
                                },
                                {
                                    type: {
                                        $regex: key_word,
                                        $options: "six"
                                    }
                                },
                                {
                                    type2: {
                                        $regex: key_word,
                                        $options: "six"
                                    }
                                }
                            ]
                        },
                        {
                            sort: {name: 1},
                            collation: {locale: "zh"}
                        }
                    ).toArray(function (err, data) {
                        if (data) {
                            responseData.code = 0;
                            responseData.message = '小品信息获取成功';
                            responseData.data = data.length;
                            res.json(responseData);
                        } else {
                            responseData.code = 1;
                            responseData.message = '小品信息获取失败';
                            res.json(responseData);
                        }
                        // 释放资源
                        db.close();
                    })
                })
            } else {
                if (type2 == '全部') {
                    //  央视台、卫视台、轮播台、具体省份地方台
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('piece');
                        movie.find(
                            {
                                type: type
                            }
                        ).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '小品信息获取成功';
                                responseData.data = data.length;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '小品信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                } else {
                    //  央视台、卫视台、轮播台、具体省份地方台
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('piece');
                        movie.find(
                            {
                                type: type,
                                type2: type2,
                            }
                        ).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '小品信息获取成功';
                                responseData.data = data.length;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '小品信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
            }
        }
    }
})

/**
 * 获取推荐的数据(影视)
 */

router.get('/recommendations/get', function (req, res, next) {
    var movie_id = req.query.movie_id
    var type = req.query.type
    // 每页大小
    var page_size = req.query.page_size == null || req.query.page_size == 'null' ? 20 : +req.query.page_size
    // 当前页数
    var page_index = req.query.page_index == null || req.query.page_index == 'null' ? 1 : +req.query.page_index
    var limit = req.query.limit == null || req.query.limit == 'null' ? page_size : parseInt(req.query.limit)
    mongoClient.connect(dbURL, function (err, db) {
        var movie = db.db(dbName).collection('recommendations');
        movie.aggregate([
            {
                $match: {'temp_id': objectId(movie_id)}
            },
            {
                $lookup: {
                    from: type,
                    localField: "temp_id2",
                    foreignField: "_id",
                    as: "movie"
                }
            },
            {
                $sort: {euclidean: -1}
            },
            {
                $limit: page_size
            }
        ]).toArray(function (err, data) {
            if (data != null) {
                responseData.code = 0;
                responseData.message = '影视推荐数据获取成功';
                responseData.data = data;
                res.json(responseData);
            } else {
                responseData.code = 1;
                responseData.message = '影视推荐数据失败';
                res.json(responseData);
            }
            // 释放资源
            db.close();
        })
    })
})

/**
 * 获取推荐的数据(用户名)
 */

router.get('/recommendations/get/user', function (req, res, next) {
    var user_name = req.query.user_name
    var browse_type = req.query.browse_type
    var type = req.query.type == null || req.query.type == 'null' || req.query.type == '推荐' ? '全部' : req.query.type
    // 每页大小
    var page_size = req.query.page_size == null || req.query.page_size == 'null' ? 20 : +req.query.page_size
    // 当前页数
    var page_index = req.query.page_index == null || req.query.page_index == 'null' ? 1 : +req.query.page_index
    var limit = req.query.limit == null || req.query.limit == 'null' ? page_size : parseInt(req.query.limit)

    if (browse_type == 'movie') {
        //  影视、小品
        if (type == '全部') {
            mongoClient.connect(dbURL, function (err, db) {
                var records = db.db(dbName).collection('records');
                records.find(
                    {user_name: user_name, browse_type: browse_type},
                    {
                        sort: {record_time: -1},
                        collation: {locale: "zh"},
                        limit: 1
                    }).toArray(function (err, data) {
                    if (data.length > 0) {
                        var movie = db.db(dbName).collection('recommendations');
                        movie.aggregate([
                            {
                                $match: {'temp_id': objectId(data[0]['id'])}
                            },
                            {
                                $lookup: {
                                    from: browse_type,
                                    localField: "temp_id2",
                                    foreignField: "_id",
                                    as: "movie"
                                }
                            },
                            {
                                $sort: {euclidean: -1}
                            },
                            {
                                $limit: page_size
                            }
                        ]).toArray(function (err, data2) {
                            if (data2) {
                                responseData.code = 0;
                                responseData.message = '影视推荐数据获取成功';
                                responseData.data = data2;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视推荐获取数据失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    } else if (data.length == 0) {
                        //  当前类型下没有浏览记录的用户
                        responseData.code = 0;
                        responseData.message = '影视推荐数据获取成功';
                        responseData.data = data;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '浏览记录获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        } else {
            mongoClient.connect(dbURL, function (err, db) {
                var records = db.db(dbName).collection('records');
                records.find(
                    {user_name: user_name, browse_type: browse_type, type: type},
                    {
                        collation: {locale: "zh"},
                        limit: 1
                    }).toArray(function (err, data) {
                    if (data.length > 0) {
                        var movie = db.db(dbName).collection('recommendations');
                        movie.aggregate([
                            {
                                $match: {'temp_id': objectId(data[0]['id'])}
                            },
                            {
                                $lookup: {
                                    from: browse_type,
                                    localField: "temp_id2",
                                    foreignField: "_id",
                                    as: "movie"
                                }
                            },
                            {
                                $sort: {euclidean: -1}
                            },
                            {
                                $limit: page_size
                            }
                        ]).toArray(function (err, data2) {
                            if (data2) {
                                responseData.code = 0;
                                responseData.message = '影视推荐数据获取成功';
                                responseData.data = data2;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视推荐获取数据失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    } else if (data.length == 0) {
                        //  当前类型下没有浏览记录的用户
                        responseData.code = 0;
                        responseData.message = '影视推荐数据获取成功';
                        responseData.data = data;
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        }
    } else if (browse_type == 'tv') {
        mongoClient.connect(dbURL, function (err, db) {
            var records = db.db(dbName).collection('records');
            records.find(
                {user_name: user_name, browse_type: browse_type},
                {
                    sort: {record_time: -1},
                    collation: {locale: "zh"},
                    limit: 1
                }).toArray(function (err, data) {
                if (data && data.length > 0) {
                    var movie = db.db(dbName).collection(browse_type);
                    movie.find(
                        {
                            type: data[0].type
                        },
                        {
                            sort: {name: 1},
                            collation: {locale: "zh"},
                            skip: page_size * (page_index - 1),
                            limit: page_size
                        }).toArray(function (err, data2) {
                        if (data2) {
                            responseData.code = 0;
                            responseData.message = '影视推荐数据获取成功';
                            responseData.data = data2;
                            res.json(responseData);
                        } else {
                            responseData.code = 1;
                            responseData.message = '影视推荐数据获取失败';
                            res.json(responseData);
                        }
                        // 释放资源
                        db.close();
                    })
                } else if (data.length == 0) {
                    //  当前类型下没有浏览记录的用户
                    responseData.code = 0;
                    responseData.message = '影视推荐数据获取成功';
                    responseData.data = data;
                    res.json(responseData);
                }
                // 释放资源
                db.close();
            })
        })
    } else {
        if (type == '全部') {
            mongoClient.connect(dbURL, function (err, db) {
                var records = db.db(dbName).collection('records');
                records.find(
                    {user_name: user_name, browse_type: browse_type},
                    {
                        sort: {record_time: -1},
                        collation: {locale: "zh"},
                        limit: 1
                    }).toArray(function (err, data) {
                    if (data && data.length > 0) {
                        var movie = db.db(dbName).collection('recommendations');
                        movie.aggregate([
                            {
                                $match: {'temp_id': objectId(data[0]['id'])}
                            },
                            {
                                $lookup: {
                                    from: browse_type,
                                    localField: "temp_id2",
                                    foreignField: "_id",
                                    as: "movie"
                                }
                            },
                            {
                                $sort: {euclidean: -1}
                            },
                            {
                                $limit: page_size
                            }
                        ]).toArray(function (err, data2) {
                            if (data2) {
                                responseData.code = 0;
                                responseData.message = '影视推荐数据获取成功';
                                responseData.data = data2;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视推荐数据获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    } else if (data.length == 0) {
                        //  当前类型下没有浏览记录的用户
                        responseData.code = 0;
                        responseData.message = '影视推荐数据获取成功';
                        responseData.data = data;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '浏览记录获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        } else {
            mongoClient.connect(dbURL, function (err, db) {
                var records = db.db(dbName).collection('records');
                records.find(
                    {user_name: user_name, browse_type: browse_type, type: type},
                    {
                        sort: {record_time: -1},
                        collation: {locale: "zh"},
                        limit: 1
                    }).toArray(function (err, data) {
                    if (data.length > 0) {
                        var movie = db.db(dbName).collection('recommendations');
                        movie.aggregate([
                            {
                                $match: {'temp_id': objectId(data[0]['id'])}
                            },
                            {
                                $lookup: {
                                    from: browse_type,
                                    localField: "temp_id2",
                                    foreignField: "_id",
                                    as: "movie"
                                }
                            },
                            {
                                $sort: {euclidean: -1}
                            },
                            {
                                $limit: page_size
                            }
                        ]).toArray(function (err, data2) {
                            if (data2) {
                                responseData.code = 0;
                                responseData.message = '影视推荐数据获取成功';
                                responseData.data = data2;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视推荐获取数据失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    } else if (data.length == 0) {
                        //  当前类型下没有浏览记录的用户
                        responseData.code = 0;
                        responseData.message = '影视推荐数据获取成功';
                        responseData.data = data;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '浏览记录获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        }
    }

})


/**
 * 根据版本号获取版本信息
 */

router.get('/version/get/number', function (req, res, next) {
    var number = req.query.number
    mongoClient.connect(dbURL, function (err, db) {
        var version = db.db(dbName).collection('version');
        version.find(
            {version_number: number}
        ).toArray(function (err, data) {
            if (data) {
                responseData.code = 0;
                responseData.message = '版本信息获取成功';
                responseData.data = data[0];
                res.json(responseData);
            } else {
                responseData.code = 1;
                responseData.message = '版本信息获取失败';
                res.json(responseData);
            }
            // 释放资源
            db.close();
        })
    })
})

/**
 * 获取最新版本信息
 */

router.get('/version/get/latest', function (req, res, next) {
    mongoClient.connect(dbURL, function (err, db) {
        var version = db.db(dbName).collection('version');
        version.find(
            {},
            {
                sort: {acquisition_time: -1},
                limit: 1
            }).toArray(function (err, data) {
            if (data) {
                responseData.code = 0;
                responseData.message = '版本信息获取成功';
                responseData.data = data[0];
                res.json(responseData);
            } else {
                responseData.code = 1;
                responseData.message = '版本信息获取失败';
                res.json(responseData);
            }
            // 释放资源
            db.close();
        })
    })
})

/**
 * 添加版本信息
 */

router.post('/version/add', function (req, res, next) {
    //  版本号
    var version_number = req.body.version_number
    //  描述
    var descriptions = req.body.descriptions.split('\\n')
    //  更新时间
    var acquisition_time = getFormatDate2()

    mongoClient.connect(dbURL, function (err, db) {
        var version = db.db(dbName).collection('version');
        //将记录信息写入到数据库中
        var versionInfo = {
            version_number: version_number,
            descriptions: descriptions,
            acquisition_time: acquisition_time
        };
        version.find({version_number: versionInfo.version_number}).toArray(function (err, data) {
            if (data.length == 0) {
                version.save(versionInfo).then(function (data2) {
                    if (data2) {
                        //保存成功
                        responseData.code = 0;
                        responseData.message = '保存成功';
                        responseData.data = versionInfo;
                        res.json(responseData);
                    } else {
                        //注册失败
                        responseData.code = 1;
                        responseData.message = '保存失败';
                        res.json(responseData);
                    }
                })
            } else {
                //保存成功
                responseData.code = 2;
                responseData.message = '版本号已存在';
                res.json(responseData);
            }
        })
    })
})

/**
 * 获取所有反馈信息数量
 */

router.get('/count/get/feedback', function (req, res, next) {
    //  用户名
    var user_name = req.query.user_name == null || req.query.user_name == 'null' ? null : req.query.user_name
    //  是否回复
    var is_reply = req.query.is_reply == null || req.query.is_reply == 'null' ? null : req.query.is_reply
    //  浏览类型
    var browse_type = req.query.browse_type == null || req.query.browse_type == 'null' ? null : req.query.browse_type
    // 每页大小
    var page_size = req.query.page_size == null || req.query.page_size == 'null' ? 20 : +req.query.page_size
    // 当前页数
    var page_index = req.query.page_index == null || req.query.page_index == 'null' ? 1 : +req.query.page_index
    //    全部
    if (user_name != null) {
        if (is_reply != null) {
            mongoClient.connect(dbURL, function (err, db) {
                var movie = db.db(dbName).collection('feedback');
                movie.find(
                    {
                        user_name: user_name,
                        is_reply: is_reply,
                    }).toArray(function (err, data) {
                    if (data) {
                        responseData.code = 0;
                        responseData.message = '反馈信息获取成功';
                        responseData.data = data.length;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '反馈信息获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        } else {
            mongoClient.connect(dbURL, function (err, db) {
                var movie = db.db(dbName).collection('feedback');
                movie.find(
                    {user_name: user_name}).toArray(function (err, data) {
                    if (data) {
                        responseData.code = 0;
                        responseData.message = '反馈信息获取成功';
                        responseData.data = data.length;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '反馈信息获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        }

    } else {
        if (is_reply != null) {
            mongoClient.connect(dbURL, function (err, db) {
                var movie = db.db(dbName).collection('feedback');
                movie.find(
                    {
                        is_reply: is_reply,
                    }).toArray(function (err, data) {
                    if (data) {
                        responseData.code = 0;
                        responseData.message = '反馈信息获取成功';
                        responseData.data = data.length;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '反馈信息获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        } else {
            mongoClient.connect(dbURL, function (err, db) {
                var movie = db.db(dbName).collection('feedback');
                movie.find(
                    {}).toArray(function (err, data) {
                    if (data) {
                        responseData.code = 0;
                        responseData.message = '反馈信息获取成功';
                        responseData.data = data.length;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '反馈信息获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        }
    }
})

/**
 * 回复反馈信息
 */

router.post('/feedback/reply', function (req, res, next) {
    var _id = req.body._id;
    var reply = req.body.reply;
    mongoClient.connect(dbURL, function (err, db) {
        var records = db.db(dbName).collection('feedback');
        //将记录信息更新到数据库中
        records.update({
                _id: objectId(_id)
            },
            {
                $set: {
                    reply: reply,
                    is_reply: 'true',
                    record_time: getFormatDate2()
                }
            }).then(function (data) {
            if (data) {
                //保存成功
                responseData.code = 0;
                responseData.message = '修改成功';
                res.json(responseData);
            } else {
                //注册失败
                responseData.code = 1;
                responseData.message = '修改失败';
                res.json(responseData);
            }
        })
    })

});

/**
 * 获取所有反馈信息
 */

router.get('/feedback/get/all', function (req, res, next) {
    //  用户名
    var user_name = req.query.user_name == null || req.query.user_name == 'null' ? null : req.query.user_name
    //  是否回复
    var is_reply = req.query.is_reply == null || req.query.is_reply == 'null' ? null : req.query.is_reply
    //  浏览类型
    var browse_type = req.query.browse_type == null || req.query.browse_type == 'null' ? null : req.query.browse_type
    // 每页大小
    var page_size = req.query.page_size == null || req.query.page_size == 'null' ? 20 : +req.query.page_size
    // 当前页数
    var page_index = req.query.page_index == null || req.query.page_index == 'null' ? 1 : +req.query.page_index
    //    全部
    if (user_name != null) {
        if (is_reply != null) {
            mongoClient.connect(dbURL, function (err, db) {
                var movie = db.db(dbName).collection('feedback');
                movie.find(
                    {
                        user_name: user_name,
                        is_reply: is_reply,
                    },
                    {
                        sort: {record_time: -1},
                        collation: {locale: "zh"},
                        skip: page_size * (page_index - 1),
                        limit: page_size
                    }).toArray(function (err, data) {
                    if (data) {
                        responseData.code = 0;
                        responseData.message = '反馈信息获取成功';
                        responseData.data = data;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '反馈信息获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        } else {
            mongoClient.connect(dbURL, function (err, db) {
                var movie = db.db(dbName).collection('feedback');
                movie.find(
                    {user_name: user_name},
                    {
                        sort: {record_time: -1},
                        collation: {locale: "zh"},
                        skip: page_size * (page_index - 1),
                        limit: page_size
                    }).toArray(function (err, data) {
                    if (data) {
                        responseData.code = 0;
                        responseData.message = '反馈信息获取成功';
                        responseData.data = data;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '反馈信息获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        }

    } else {
        if (is_reply != null) {
            mongoClient.connect(dbURL, function (err, db) {
                var movie = db.db(dbName).collection('feedback');
                movie.find(
                    {
                        is_reply: is_reply,
                    },
                    {
                        sort: {record_time: -1},
                        collation: {locale: "zh"},
                        skip: page_size * (page_index - 1),
                        limit: page_size
                    }).toArray(function (err, data) {
                    if (data) {
                        responseData.code = 0;
                        responseData.message = '反馈信息获取成功';
                        responseData.data = data;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '反馈信息获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        } else {
            mongoClient.connect(dbURL, function (err, db) {
                var movie = db.db(dbName).collection('feedback');
                movie.find(
                    {},
                    {
                        sort: {record_time: -1},
                        collation: {locale: "zh"},
                        skip: page_size * (page_index - 1),
                        limit: page_size
                    }).toArray(function (err, data) {
                    if (data) {
                        responseData.code = 0;
                        responseData.message = '反馈信息获取成功';
                        responseData.data = data;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '反馈信息获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        }
    }
})

/**
 * 添加反馈信息
 */

router.post('/feedback/add', function (req, res, next) {
    var content = req.body.content;
    var user_name = req.body.user_name;
    var record_time = getFormatDate2();
    var device_uuid = req.body.device_uuid;
    var device_version = req.body.device_version;
    var device_platform = req.body.device_platform;

    mongoClient.connect(dbURL, function (err, db) {
        var user = db.db(dbName).collection('user');
        user.find({'username': user_name}).toArray(function (err, userInfo) {
            if (userInfo.length > 0) {
                user = userInfo[0]
                mongoClient.connect(dbURL, function (err, db) {
                    var records = db.db(dbName).collection('feedback');
                    //将记录信息写入到数据库中
                    var recordsInfo = {
                        content: content,
                        reply: '',
                        is_reply: 'false',
                        user_name: user_name,
                        user_avatar: user.avatar,
                        record_time: record_time,
                        device_uuid: device_uuid,
                        device_version: device_version,
                        device_platform: device_platform,
                    };
                    records.save(recordsInfo).then(function (data) {
                        if (data) {
                            //保存成功f
                            responseData.code = 0;
                            responseData.message = '保存成功';
                            responseData.data = recordsInfo;
                            res.json(responseData);
                        } else {
                            //注册失败
                            responseData.code = 1;
                            responseData.message = '保存失败';
                            res.json(responseData);
                        }
                    })
                })
            }
        })
    })

});

/**
 * 获取所有搜索记录
 */

router.get('/search/get/all', function (req, res, next) {
    //  用户名
    var user_name = req.query.user_name == null || req.query.user_name == 'null' ? null : req.query.user_name
    //  浏览类型
    var search_type = req.query.search_type == null || req.query.search_type == 'null' ? null : req.query.search_type
    // 每页大小
    var page_size = req.query.page_size == null || req.query.page_size == 'null' ? 20 : +req.query.page_size
    // 当前页数
    var page_index = req.query.page_index == null || req.query.page_index == 'null' ? 1 : +req.query.page_index
    //    全部
    if (user_name != null) {
        if (search_type != null) {
            mongoClient.connect(dbURL, function (err, db) {
                var movie = db.db(dbName).collection('search');
                movie.find(
                    {
                        user_name: user_name,
                        search_type: search_type,
                    },
                    {
                        sort: {search_time: -1},
                        collation: {locale: "zh"},
                        skip: page_size * (page_index - 1),
                        limit: page_size
                    }).toArray(function (err, data) {
                    if (data) {
                        responseData.code = 0;
                        responseData.message = '记录获取成功';
                        responseData.data = data;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '记录获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        } else {
            mongoClient.connect(dbURL, function (err, db) {
                var movie = db.db(dbName).collection('search');
                movie.find(
                    {user_name: user_name},
                    {
                        sort: {search_time: -1},
                        collation: {locale: "zh"},
                        skip: page_size * (page_index - 1),
                        limit: page_size
                    }).toArray(function (err, data) {
                    if (data) {
                        responseData.code = 0;
                        responseData.message = '记录获取成功';
                        responseData.data = data;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '记录获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        }

    } else {
        if (search_type != null) {
            mongoClient.connect(dbURL, function (err, db) {
                var movie = db.db(dbName).collection('search');
                movie.find(
                    {search_type: search_type},
                    {
                        sort: {search_time: -1},
                        collation: {locale: "zh"},
                        skip: page_size * (page_index - 1),
                        limit: page_size
                    }).toArray(function (err, data) {
                    if (data) {
                        responseData.code = 0;
                        responseData.message = '记录获取成功';
                        responseData.data = data;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '记录获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        } else {
            mongoClient.connect(dbURL, function (err, db) {
                var movie = db.db(dbName).collection('search');
                movie.find(
                    {},
                    {
                        sort: {search_time: -1},
                        collation: {locale: "zh"},
                        skip: page_size * (page_index - 1),
                        limit: page_size
                    }).toArray(function (err, data) {
                    if (data) {
                        responseData.code = 0;
                        responseData.message = '记录获取成功';
                        responseData.data = data;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '记录获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        }
    }
})

/**
 * 获取所有浏览记录
 */

router.get('/records/get/all', function (req, res, next) {
    //  用户名
    var user_name = req.query.user_name == null || req.query.user_name == 'null' ? null : req.query.user_name
    //  浏览类型
    var browse_type = req.query.browse_type == null || req.query.browse_type == 'null' ? null : req.query.browse_type
    // 每页大小
    var page_size = req.query.page_size == null || req.query.page_size == 'null' ? 20 : +req.query.page_size
    // 当前页数
    var page_index = req.query.page_index == null || req.query.page_index == 'null' ? 1 : +req.query.page_index
    //    全部
    if (user_name != null) {
        if (browse_type != null) {
            mongoClient.connect(dbURL, function (err, db) {
                var movie = db.db(dbName).collection('records');
                movie.find(
                    {
                        user_name: user_name,
                        browse_type: browse_type,
                    },
                    {
                        sort: {record_time: -1},
                        collation: {locale: "zh"},
                        skip: page_size * (page_index - 1),
                        limit: page_size
                    }).toArray(function (err, data) {
                    if (data) {
                        responseData.code = 0;
                        responseData.message = '浏览记录获取成功';
                        responseData.data = data;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '浏览记录获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        } else {
            mongoClient.connect(dbURL, function (err, db) {
                var movie = db.db(dbName).collection('records');
                movie.find(
                    {user_name: user_name},
                    {
                        sort: {record_time: -1},
                        collation: {locale: "zh"},
                        skip: page_size * (page_index - 1),
                        limit: page_size
                    }).toArray(function (err, data) {
                    if (data) {
                        responseData.code = 0;
                        responseData.message = '浏览记录获取成功';
                        responseData.data = data;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '浏览记录获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        }

    } else {
        if (browse_type != null) {
            mongoClient.connect(dbURL, function (err, db) {
                var movie = db.db(dbName).collection('records');
                movie.find(
                    {browse_type: browse_type},
                    {
                        sort: {record_time: -1},
                        collation: {locale: "zh"},
                        skip: page_size * (page_index - 1),
                        limit: page_size
                    }).toArray(function (err, data) {
                    if (data) {
                        responseData.code = 0;
                        responseData.message = '浏览记录获取成功';
                        responseData.data = data;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '浏览记录获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        } else {
            mongoClient.connect(dbURL, function (err, db) {
                var movie = db.db(dbName).collection('records');
                movie.find(
                    {},
                    {
                        sort: {record_time: -1},
                        collation: {locale: "zh"},
                        skip: page_size * (page_index - 1),
                        limit: page_size
                    }).toArray(function (err, data) {
                    if (data) {
                        responseData.code = 0;
                        responseData.message = '浏览记录获取成功';
                        responseData.data = data;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '浏览记录获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        }
    }
})

/**
 * 添加搜索记录
 */

router.post('/search/add', function (req, res, next) {
    var user_name = req.body.user_name;
    var search_type = req.body.search_type;
    var key_word = req.body.key_word;
    var search_time = getFormatDate2();
    var device_uuid = req.body.device_uuid;
    var device_version = req.body.device_version;
    var device_platform = req.body.device_platform;

    mongoClient.connect(dbURL, function (err, db) {
        var records = db.db(dbName).collection('search');
        //将记录信息写入到数据库中
        var recordsInfo = {
            user_name: user_name,
            search_type: search_type,
            key_word: key_word,
            search_time: search_time,
            device_uuid: device_uuid,
            device_version: device_version,
            device_platform: device_platform,
        };
        records.save(recordsInfo).then(function (data) {
            if (data) {
                //保存成功
                responseData.code = 0;
                responseData.message = '保存成功';
                responseData.data = recordsInfo;
                res.json(responseData);
            } else {
                //注册失败
                responseData.code = 1;
                responseData.message = '保存失败';
                res.json(responseData);
            }
        })
    })

});

/**
 * 添加浏览记录
 */

router.post('/records/add', function (req, res, next) {
    var user_name = req.body.user_name;
    var id = req.body.id;
    var name = req.body.name;
    var type = req.body.type;
    var type2 = req.body.type2;
    var src = req.body.src;
    var url = req.body.url;
    var browse_type = req.body.browse_type;
    var record_time = getFormatDate2();
    var device_uuid = req.body.device_uuid;
    var device_version = req.body.device_version;
    var device_platform = req.body.device_platform;

    mongoClient.connect(dbURL, function (err, db) {
        var records = db.db(dbName).collection('records');
        //将记录信息写入到数据库中
        var recordsInfo = {
            user_name: user_name,
            id: id,
            name: name,
            type: type,
            type2: type2,
            src: src,
            url: url,
            browse_type: browse_type,
            record_time: record_time,
            device_uuid: device_uuid,
            device_version: device_version,
            device_platform: device_platform,
        };
        records.save(recordsInfo).then(function (data) {
            if (data) {
                //保存成功
                responseData.code = 0;
                responseData.message = '保存成功';
                responseData.data = recordsInfo;
                res.json(responseData);
            } else {
                //注册失败
                responseData.code = 1;
                responseData.message = '保存失败';
                res.json(responseData);
            }
        })
    })

});

/**
 * 获取小品信息(name)
 */

router.get('/piece/get/_id', function (req, res, next) {
    var _id = objectId(req.query._id)
    mongoClient.connect(dbURL, function (err, db) {
        var movie = db.db(dbName).collection('piece');
        movie.find({_id: _id},
            {
                sort: {name: 1},
                collation: {locale: "zh"}
            }
        ).toArray(function (err, data) {
            if (data) {
                responseData.code = 0;
                responseData.message = '小品信息获取成功';
                responseData.data = data[0];
                res.json(responseData);
            } else {
                responseData.code = 1;
                responseData.message = '小品信息获取失败';
                res.json(responseData);
            }
            // 释放资源
            db.close();
        })
    })
})

/**
 * 获取所有小品信息
 */

router.get('/piece/get/all', function (req, res, next) {
    var type = req.query.type == null || req.query.type == 'null' ? '全部' : req.query.type
    var type2 = req.query.type2 == null || req.query.type2 == 'null' ? '全部' : req.query.type2
    // 每页大小
    var page_size = req.query.page_size == null || req.query.page_size == 'null' ? 20 : +req.query.page_size
    // 当前页数
    var page_index = req.query.page_index == null || req.query.page_index == 'null' ? 1 : +req.query.page_index
    var key_word = req.query.key_word == null || req.query.key_word == 'null' || req.query.key_word == '' ? null : req.query.key_word
    if (key_word == null) {
        if (type == '全部') {
            //    全部
            mongoClient.connect(dbURL, function (err, db) {
                var movie = db.db(dbName).collection('piece');
                movie.find(
                    {},
                    {
                        sort: {acquisition_time: -1},
                        collation: {locale: "zh"},
                        skip: page_size * (page_index - 1),
                        limit: page_size
                    }).toArray(function (err, data) {
                    if (data) {
                        responseData.code = 0;
                        responseData.message = '小品信息获取成功';
                        responseData.data = data;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '小品信息获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        } else {
            if (type2 == '全部') {
                //    全部
                mongoClient.connect(dbURL, function (err, db) {
                    var movie = db.db(dbName).collection('piece');
                    movie.find(
                        {
                            type: type
                        },
                        {
                            sort: {acquisition_time: -1},
                            collation: {locale: "zh"},
                            skip: page_size * (page_index - 1),
                            limit: page_size
                        }).toArray(function (err, data) {
                        if (data) {
                            responseData.code = 0;
                            responseData.message = '小品信息获取成功';
                            responseData.data = data;
                            res.json(responseData);
                        } else {
                            responseData.code = 1;
                            responseData.message = '小品信息获取失败';
                            res.json(responseData);
                        }
                        // 释放资源
                        db.close();
                    })
                })
            } else {
                //    全部
                mongoClient.connect(dbURL, function (err, db) {
                    var movie = db.db(dbName).collection('piece');
                    movie.find(
                        {
                            type: type,
                            type2: type2
                        },
                        {
                            sort: {acquisition_time: -1},
                            collation: {locale: "zh"},
                            skip: page_size * (page_index - 1),
                            limit: page_size
                        }).toArray(function (err, data) {
                        if (data) {
                            responseData.code = 0;
                            responseData.message = '小品信息获取成功';
                            responseData.data = data;
                            res.json(responseData);
                        } else {
                            responseData.code = 1;
                            responseData.message = '小品信息获取失败';
                            res.json(responseData);
                        }
                        // 释放资源
                        db.close();
                    })
                })
            }
        }
    } else {
        if (type == '全部') {
            //  央视台、卫视台、轮播台、具体省份地方台
            mongoClient.connect(dbURL, function (err, db) {
                var movie = db.db(dbName).collection('piece');
                movie.find(
                    {
                        $or: [
                            {
                                name: {
                                    $regex: key_word,
                                    $options: "six"
                                }
                            },
                            {
                                type: {
                                    $regex: key_word,
                                    $options: "six"
                                }
                            },
                            {
                                type2: {
                                    $regex: key_word,
                                    $options: "six"
                                }
                            }
                        ]
                    },
                    {
                        sort: {name: 1},
                        collation: {locale: "zh"},
                        skip: page_size * (page_index - 1),
                        limit: page_size
                    }).toArray(function (err, data) {
                    if (data) {
                        responseData.code = 0;
                        responseData.message = '小品信息获取成功';
                        responseData.data = data;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '小品信息获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        } else {
            if (type2 == '全部') {
                //  央视台、卫视台、轮播台、具体省份地方台
                mongoClient.connect(dbURL, function (err, db) {
                    var movie = db.db(dbName).collection('piece');
                    movie.find(
                        {
                            $or: [
                                {
                                    name: {
                                        $regex: key_word,
                                        $options: "six"
                                    }
                                },
                                {
                                    type: {
                                        $regex: key_word,
                                        $options: "six"
                                    }
                                },
                                {
                                    type2: {
                                        $regex: key_word,
                                        $options: "six"
                                    }
                                }
                            ]
                        },
                        {
                            sort: {name: 1},
                            collation: {locale: "zh"},
                            skip: page_size * (page_index - 1),
                            limit: page_size
                        }).toArray(function (err, data) {
                        if (data) {
                            responseData.code = 0;
                            responseData.message = '小品信息获取成功';
                            responseData.data = data;
                            res.json(responseData);
                        } else {
                            responseData.code = 1;
                            responseData.message = '小品信息获取失败';
                            res.json(responseData);
                        }
                        // 释放资源
                        db.close();
                    })
                })
            } else {
                //  央视台、卫视台、轮播台、具体省份地方台
                mongoClient.connect(dbURL, function (err, db) {
                    var movie = db.db(dbName).collection('piece');
                    movie.find(
                        {
                            $or: [
                                {
                                    name: {
                                        $regex: key_word,
                                        $options: "six"
                                    }
                                },
                                {
                                    type: {
                                        $regex: key_word,
                                        $options: "six"
                                    }
                                },
                                {
                                    type2: {
                                        $regex: key_word,
                                        $options: "six"
                                    }
                                }
                            ]
                        },
                        {
                            sort: {name: 1},
                            collation: {locale: "zh"},
                            skip: page_size * (page_index - 1),
                            limit: page_size
                        }).toArray(function (err, data) {
                        if (data) {
                            responseData.code = 0;
                            responseData.message = '小品信息获取成功';
                            responseData.data = data;
                            res.json(responseData);
                        } else {
                            responseData.code = 1;
                            responseData.message = '小品信息获取失败';
                            res.json(responseData);
                        }
                        // 释放资源
                        db.close();
                    })
                })
            }
        }
    }
})

/**
 * 获取所有小品类型
 */

router.get('/piece/type/get/all', function (req, res, next) {
    mongoClient.connect(dbURL, function (err, db) {
        var movieType = db.db(dbName).collection('piece_type');
        movieType.find({}).toArray(function (err, data) {
            if (data) {
                responseData.code = 0;
                responseData.message = '小品类型信息获取成功';
                responseData.data = data;
                res.json(responseData);
            } else {
                responseData.code = 1;
                responseData.message = '小品类型信息获取失败';
                res.json(responseData);
            }
            // 释放资源
            db.close();
        })
    })
})

/**
 * 获取戏曲信息(name)
 */

router.get('/drama/get/_id', function (req, res, next) {
    var _id = objectId(req.query._id)
    mongoClient.connect(dbURL, function (err, db) {
        var movie = db.db(dbName).collection('drama');
        movie.find({_id: _id}).toArray(function (err, data) {
            if (data) {
                responseData.code = 0;
                responseData.message = '戏曲信息获取成功';
                responseData.data = data[0];
                res.json(responseData);
            } else {
                responseData.code = 1;
                responseData.message = '戏曲信息获取失败';
                res.json(responseData);
            }
            // 释放资源
            db.close();
        })
    })
})

/**
 * 获取所有戏曲信息
 */

router.get('/drama/get/all', function (req, res, next) {
    var type = req.query.type == null || req.query.type == 'null' ? '全部' : req.query.type
    // 每页大小
    var page_size = req.query.page_size == null || req.query.page_size == 'null' ? 20 : +req.query.page_size
    // 当前页数
    var page_index = req.query.page_index == null || req.query.page_index == 'null' ? 1 : +req.query.page_index
    var key_word = req.query.key_word
    if (key_word == null || key_word == 'null') {
        if (type == '全部') {
            //    全部
            mongoClient.connect(dbURL, function (err, db) {
                var movie = db.db(dbName).collection('drama');
                movie.find(
                    {},
                    {
                        sort: {acquisition_time: -1},
                        collation: {locale: "zh"},
                        skip: page_size * (page_index - 1),
                        limit: page_size
                    },
                    {
                        sort: {name: 1},
                        collation: {locale: "zh"}
                    }
                ).toArray(function (err, data) {
                    if (data) {
                        responseData.code = 0;
                        responseData.message = '戏曲信息获取成功';
                        responseData.data = data;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '戏曲信息获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        } else {
            //    全部
            mongoClient.connect(dbURL, function (err, db) {
                var movie = db.db(dbName).collection('drama');
                movie.find(
                    {
                        type: type
                    },
                    {
                        sort: {acquisition_time: -1},
                        collation: {locale: "zh"},
                        skip: page_size * (page_index - 1),
                        limit: page_size
                    },
                    {
                        sort: {name: 1},
                        collation: {locale: "zh"}
                    }
                ).toArray(function (err, data) {
                    if (data) {
                        responseData.code = 0;
                        responseData.message = '戏曲信息获取成功';
                        responseData.data = data;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '戏曲信息获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        }
    } else {
        if (type == '全部') {
            //  央视台、卫视台、轮播台、具体省份地方台
            mongoClient.connect(dbURL, function (err, db) {
                var movie = db.db(dbName).collection('drama');
                movie.find(
                    {
                        $and: [
                            {
                                name: {
                                    $regex: key_word,
                                    $options: "six"
                                }
                            }
                        ]
                    },
                    {
                        sort: {name: 1},
                        collation: {locale: "zh"},
                        skip: page_size * (page_index - 1),
                        limit: page_size
                    }).toArray(function (err, data) {
                    if (data) {
                        responseData.code = 0;
                        responseData.message = '戏曲信息获取成功';
                        responseData.data = data;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '戏曲信息获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        } else {
            //  央视台、卫视台、轮播台、具体省份地方台
            mongoClient.connect(dbURL, function (err, db) {
                var movie = db.db(dbName).collection('drama');
                movie.find(
                    {
                        $and: [
                            {type: type},
                            {
                                name: {
                                    $regex: key_word,
                                    $options: "six"
                                }
                            }
                        ]
                    },
                    {
                        sort: {name: 1},
                        collation: {locale: "zh"},
                        skip: page_size * (page_index - 1),
                        limit: page_size
                    }).toArray(function (err, data) {
                    if (data) {
                        responseData.code = 0;
                        responseData.message = '戏曲信息获取成功';
                        responseData.data = data;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '戏曲信息获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        }
    }
})

/**
 * 获取所有影视类型
 */

router.get('/drama/type/get/all', function (req, res, next) {
    mongoClient.connect(dbURL, function (err, db) {
        var movieType = db.db(dbName).collection('drama_type');
        movieType.find({}).toArray(function (err, data) {
            if (data) {
                responseData.code = 0;
                responseData.message = '影视类型信息获取成功';
                responseData.data = data;
                res.json(responseData);
            } else {
                responseData.code = 1;
                responseData.message = '影视类型信息获取失败';
                res.json(responseData);
            }
            // 释放资源
            db.close();
        })
    })
})

/**
 * 获取所有影视类型
 */

router.get('/movie/type/get/all', function (req, res, next) {
    mongoClient.connect(dbURL, function (err, db) {
        var movieType = db.db(dbName).collection('movie_type');
        movieType.find({}).toArray(function (err, data) {
            if (data) {
                responseData.code = 0;
                responseData.message = '影视类型信息获取成功';
                responseData.data = data;
                res.json(responseData);
            } else {
                responseData.code = 1;
                responseData.message = '影视类型信息获取失败';
                res.json(responseData);
            }
            // 释放资源
            db.close();
        })
    })
})

/**
 * 获取最新影视信息(前10)
 */

router.get('/movie/latest/top', function (req, res, next) {
    // 影视类型 0：电影 1：电视剧 2：综艺 3：动漫
    var typeList = ['电影', '电视剧', '综艺', '动漫']
    var type = req.query.type
    var top_num = 8
    mongoClient.connect(dbURL, function (err, db) {
        var movie = db.db(dbName).collection('movie');
        // 1 为升序，-1 为降序
        movie.find(
            {type: typeList[type]},
            {sort: {'acquisition_time': -1}, limit: top_num}).toArray(function (err, data) {
            if (data) {
                responseData.code = 0;
                responseData.message = '影视信息获取成功';
                responseData.data = data;
                res.json(responseData);
            } else {
                responseData.code = 1;
                responseData.message = '影视信息获取失败';
                res.json(responseData);
            }
            // 释放资源
            db.close();
        })
    })
})

/**
 * 获取最热影视信息(前10)
 */

router.get('/movie/hottest/top', function (req, res, next) {
    // 影视类型 0：电影 1：电视剧 2：综艺 3：动漫
    var typeList = ['电影', '电视剧', '综艺', '动漫']
    var type = req.query.type
    var top_num = 10
    mongoClient.connect(dbURL, function (err, db) {
        var movie = db.db(dbName).collection('movie');
        // 1 为升序，-1 为降序
        movie.find(
            {type: typeList[type]},
            {sort: {'score': -1}, limit: top_num}).toArray(function (err, data) {
            if (data) {
                responseData.code = 0;
                responseData.message = '影视信息获取成功';
                responseData.data = data;
                res.json(responseData);
            } else {
                responseData.code = 1;
                responseData.message = '影视信息获取失败';
                res.json(responseData);
            }
            // 释放资源
            db.close();
        })
    })
})

/**
 * 获取今日更新影视信息
 */
router.get('/get/today', function (req, res, next) {
    var type = req.query.type == null || req.query.type == 'null' ? '全部' : req.query.type
    var sort_type = req.query.sort_type == null || req.query.sort_type == 'null' ? 0 : req.query.sort_type
    var page_size = req.query.page_size == null || req.query.page_size == 'null' ? 15 : +req.query.page_size
    var today = getFormatDate3();
    if (type != '全部') {
        if (sort_type == '0') {
            mongoClient.connect(dbURL, function (err, db) {
                var movie = db.db(dbName).collection(type);
                // 1 为升序，-1 为降序
                movie.find(
                    {
                        $and: [
                            {acquisition_time: {$regex: eval("/" + today + "/i")}},
                            {type2: {$ne: '欧美剧'}},
                            {type2: {$ne: '海外剧'}},
                            {type2: {$ne: '日本剧'}},
                            {type2: {$ne: '其他剧'}}
                        ]
                    },
                    {
                        sort: {'release_date': -1, 'acquisition_time': -1, 'score': -1},
                        limit: page_size
                    }).toArray(function (err, data) {
                    if (data) {
                        responseData.code = 0;
                        responseData.message = '影视信息获取成功';
                        responseData.data = data;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '影视信息获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        } else {
            mongoClient.connect(dbURL, function (err, db) {
                var movie = db.db(dbName).collection(type);
                // 1 为升序，-1 为降序
                movie.find(
                    {
                        $and: [
                            {acquisition_time: {$regex: eval("/" + today + "/i")}},
                            {type2: {$ne: '欧美剧'}},
                            {type2: {$ne: '海外剧'}},
                            {type2: {$ne: '日本剧'}},
                            {type2: {$ne: '其他剧'}}
                        ]
                    },
                    {
                        sort: {'release_date': -1, 'score': -1, 'acquisition_time': -1},
                        limit: page_size
                    }).toArray(function (err, data) {
                    if (data) {
                        responseData.code = 0;
                        responseData.message = '影视信息获取成功';
                        responseData.data = data;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '影视信息获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        }
    } else {
        responseData.code = 3;
        responseData.message = '参数错误';
        res.json(responseData);
    }
})

/**
 * 获取今日更新影视数
 */
router.get('/count/get/today', function (req, res, next) {
    var type = req.query.type == null || req.query.type == 'null' ? '全部' : req.query.type
    var today = getFormatDate3();
    if (type != '全部') {
        mongoClient.connect(dbURL, function (err, db) {
            var movie = db.db(dbName).collection(type);
            // 1 为升序，-1 为降序
            movie.find(
                {acquisition_time: {$regex: eval("/" + today + "/i")}}).toArray(function (err, data) {
                if (data) {
                    responseData.code = 0;
                    responseData.message = '影视信息获取成功';
                    responseData.data = data.length;
                    res.json(responseData);
                } else {
                    responseData.code = 1;
                    responseData.message = '影视信息获取失败';
                    res.json(responseData);
                }
                // 释放资源
                db.close();
            })
        })
    } else {
        responseData.code = 3;
        responseData.message = '参数错误';
        res.json(responseData);
    }
})

/**
 * 获取指定id的影视信息
 */

router.get('/movie/get/_id', function (req, res, next) {
    // 影视id
    var _id = objectId(req.query._id)
    mongoClient.connect(dbURL, function (err, db) {
        var movie = db.db(dbName).collection('movie');
        movie.find({_id: _id}).toArray(function (err, data) {
            if (data) {
                responseData.code = 0;
                responseData.message = '影视信息获取成功';
                responseData.data = data[0];
                res.json(responseData);
            } else {
                responseData.code = 1;
                responseData.message = '影视信息获取失败';
                res.json(responseData);
            }
            // 释放资源
            db.close();
        })
    })
})

/**
 * 获取所有影视信息
 */

router.get('/movie/get/all', function (req, res, next) {
    // 影视类型 0：电影 1：电视剧 2：综艺 3：动漫
    var typeList = ['电影', '电视剧', '综艺', '动漫', '少儿']
    var type = req.query.type == null || req.query.type == 'null' ? '全部' : req.query.type
    // 每页大小
    var page_size = req.query.page_size == null || req.query.page_size == 'null' ? 20 : +req.query.page_size
    // 当前页数
    var page_index = req.query.page_index == null || req.query.page_index == 'null' ? 1 : +req.query.page_index
    // 排序方式 0,1：更新时间 2：评分
    var sort_type = (req.query.sort_type == null || req.query.sort_type == 'null' || req.query.sort_type == 0 || req.query.sort_type == 1) ? 0 : 2
    //  分类
    var type2 = req.query.type2 == null || req.query.type2 == 'null' ? '全部' : req.query.type2
    //  地区
    var region = req.query.region == null || req.query.region == 'null' ? '全部' : req.query.region
    //  年代
    var release_date = req.query.release_date == null || req.query.release_date == 'null' || req.query.release_date == '全部' ? '全部' : req.query.release_date
    //  关键词
    var key_word = req.query.key_word == null || req.query.key_word == 'null' || req.query.key_word == '' ? 'null' : req.query.key_word
    if (type == '全部') {
        if (key_word == null || key_word == 'null') {
            if (sort_type == 0 || sort_type == 1) {
                // 根据更新时间进行排序
                if (type2 == '全部' && region == '全部' && release_date == '全部') {
                    //  所有分类
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {},
                            {
                                sort: {release_date: -1, acquisition_time: -1, score: -1},
                                skip: page_size * (page_index - 1),
                                limit: page_size
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
                if (type2 == '全部' && region == '全部' && release_date != '全部') {
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {
                                release_date: release_date,
                            },
                            {
                                sort: {release_date: -1, acquisition_time: -1, score: -1},
                                skip: page_size * (page_index - 1),
                                limit: page_size
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
                if (type2 == '全部' && region != '全部' && release_date == '全部') {
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {
                                region: region
                            },
                            {
                                sort: {release_date: -1, acquisition_time: -1, score: -1},
                                skip: page_size * (page_index - 1),
                                limit: page_size
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
                if (type2 == '全部' && region != '全部' && release_date != '全部') {
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {
                                region: region,
                                release_date: release_date
                            },
                            {
                                sort: {release_date: -1, acquisition_time: -1, score: -1},
                                skip: page_size * (page_index - 1),
                                limit: page_size
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
                if (type2 != '全部' && region == '全部' && release_date == '全部') {
                    //  所有分类
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {
                                type2: type2
                            },
                            {
                                sort: {release_date: -1, acquisition_time: -1, score: -1},
                                skip: page_size * (page_index - 1),
                                limit: page_size
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
                if (type2 != '全部' && region == '全部' && release_date != '全部') {
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {
                                type2: type2,
                                release_date: release_date,
                            },
                            {
                                sort: {release_date: -1, acquisition_time: -1, score: -1},
                                skip: page_size * (page_index - 1),
                                limit: page_size
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
                if (type2 != '全部' && region != '全部' && release_date == '全部') {
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {
                                type2: type2,
                                region: region
                            },
                            {
                                sort: {release_date: -1, acquisition_time: -1, score: -1},
                                skip: page_size * (page_index - 1),
                                limit: page_size
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
                if (type2 != '全部' && region != '全部' && release_date != '全部') {
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {
                                type2: type2,
                                region: region,
                                release_date: release_date
                            },
                            {
                                sort: {release_date: -1, acquisition_time: -1, score: -1},
                                skip: page_size * (page_index - 1),
                                limit: page_size
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
            } else {
                // 根据评分进行排序
                if (type2 == '全部' && region == '全部' && release_date == '全部') {
                    //  所有分类
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {},
                            {
                                sort: {release_date: -1, score: -1, acquisition_time: -1},
                                skip: page_size * (page_index - 1),
                                limit: page_size
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
                if (type2 == '全部' && region == '全部' && release_date != '全部') {
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {
                                release_date: release_date,
                            },
                            {
                                sort: {release_date: -1, score: -1, acquisition_time: -1},
                                skip: page_size * (page_index - 1),
                                limit: page_size
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
                if (type2 == '全部' && region != '全部' && release_date == '全部') {
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {
                                region: region
                            },
                            {
                                sort: {release_date: -1, score: -1, acquisition_time: -1},
                                skip: page_size * (page_index - 1),
                                limit: page_size
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
                if (type2 == '全部' && region != '全部' && release_date != '全部') {
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {
                                region: region,
                                release_date: release_date
                            },
                            {
                                sort: {release_date: -1, score: -1, acquisition_time: -1},
                                skip: page_size * (page_index - 1),
                                limit: page_size
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
                if (type2 != '全部' && region == '全部' && release_date == '全部') {
                    //  所有分类
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {
                                type2: type2
                            },
                            {
                                sort: {release_date: -1, score: -1, acquisition_time: -1},
                                skip: page_size * (page_index - 1),
                                limit: page_size
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
                if (type2 != '全部' && region == '全部' && release_date != '全部') {
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {
                                type2: type2,
                                release_date: release_date,
                            },
                            {
                                sort: {release_date: -1, score: -1, acquisition_time: -1},
                                skip: page_size * (page_index - 1),
                                limit: page_size
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
                if (type2 != '全部' && region != '全部' && release_date == '全部') {
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {
                                type2: type2,
                                region: region
                            },
                            {
                                sort: {release_date: -1, score: -1, acquisition_time: -1},
                                skip: page_size * (page_index - 1),
                                limit: page_size
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
                if (type2 != '全部' && region != '全部' && release_date != '全部') {
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {
                                type2: type2,
                                region: region,
                                release_date: release_date
                            },
                            {
                                sort: {release_date: -1, score: -1, acquisition_time: -1},
                                skip: page_size * (page_index - 1),
                                limit: page_size
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
            }
        } else {
            //  所有分类
            mongoClient.connect(dbURL, function (err, db) {
                var movie = db.db(dbName).collection('movie');
                movie.find(
                    {
                        $or: [
                            {
                                name: {
                                    $regex: key_word,
                                    $options: "six"
                                }
                            },
                            {
                                actors: {$elemMatch: {$regex: key_word, $options: "six"}}
                            },
                            {
                                directors: {$elemMatch: {$regex: key_word, $options: "six"}}
                            }
                        ]
                    },
                    {
                        sort: {release_date: -1, acquisition_time: -1},
                        collation: {locale: "zh"},
                        skip: page_size * (page_index - 1),
                        limit: page_size
                    }).toArray(function (err, data) {
                    if (data) {
                        responseData.code = 0;
                        responseData.message = '影视信息获取成功';
                        responseData.data = data;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '影视信息获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        }
    } else {
        if (key_word == null || key_word == 'null') {
            if (sort_type == 0 || sort_type == 1) {
                // 根据更新时间进行排序
                if (type2 == '全部' && region == '全部' && release_date == '全部') {
                    //  所有分类
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {type: typeList[type]},
                            {
                                sort: {release_date: -1, acquisition_time: -1, score: -1},
                                skip: page_size * (page_index - 1),
                                limit: page_size
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
                if (type2 == '全部' && region == '全部' && release_date != '全部') {
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {
                                type: typeList[type],
                                release_date: release_date,
                            },
                            {
                                sort: {release_date: -1, acquisition_time: -1, score: -1},
                                skip: page_size * (page_index - 1),
                                limit: page_size
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
                if (type2 == '全部' && region != '全部' && release_date == '全部') {
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {
                                type: typeList[type],
                                region: region
                            },
                            {
                                sort: {release_date: -1, acquisition_time: -1, score: -1},
                                skip: page_size * (page_index - 1),
                                limit: page_size
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
                if (type2 == '全部' && region != '全部' && release_date != '全部') {
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {
                                type: typeList[type],
                                region: region,
                                release_date: release_date
                            },
                            {
                                sort: {release_date: -1, acquisition_time: -1, score: -1},
                                skip: page_size * (page_index - 1),
                                limit: page_size
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
                if (type2 != '全部' && region == '全部' && release_date == '全部') {
                    //  所有分类
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {
                                type: typeList[type],
                                type2: type2
                            },
                            {
                                sort: {release_date: -1, acquisition_time: -1, score: -1},
                                skip: page_size * (page_index - 1),
                                limit: page_size
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
                if (type2 != '全部' && region == '全部' && release_date != '全部') {
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {
                                type: typeList[type],
                                type2: type2,
                                release_date: release_date,
                            },
                            {
                                sort: {release_date: -1, acquisition_time: -1, score: -1},
                                skip: page_size * (page_index - 1),
                                limit: page_size
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
                if (type2 != '全部' && region != '全部' && release_date == '全部') {
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {
                                type: typeList[type],
                                type2: type2,
                                region: region
                            },
                            {
                                sort: {release_date: -1, acquisition_time: -1, score: -1},
                                skip: page_size * (page_index - 1),
                                limit: page_size
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
                if (type2 != '全部' && region != '全部' && release_date != '全部') {
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {
                                type: typeList[type],
                                type2: type2,
                                region: region,
                                release_date: release_date
                            },
                            {
                                sort: {release_date: -1, acquisition_time: -1, score: -1},
                                skip: page_size * (page_index - 1),
                                limit: page_size
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
            } else {
                // 根据评分进行排序
                if (type2 == '全部' && region == '全部' && release_date == '全部') {
                    //  所有分类
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {type: typeList[type]},
                            {
                                sort: {release_date: -1, score: -1, acquisition_time: -1},
                                skip: page_size * (page_index - 1),
                                limit: page_size
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
                if (type2 == '全部' && region == '全部' && release_date != '全部') {
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {
                                type: typeList[type],
                                release_date: release_date,
                            },
                            {
                                sort: {release_date: -1, score: -1, acquisition_time: -1},
                                skip: page_size * (page_index - 1),
                                limit: page_size
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
                if (type2 == '全部' && region != '全部' && release_date == '全部') {
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {
                                type: typeList[type],
                                region: region
                            },
                            {
                                sort: {release_date: -1, score: -1, acquisition_time: -1},
                                skip: page_size * (page_index - 1),
                                limit: page_size
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
                if (type2 == '全部' && region != '全部' && release_date != '全部') {
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {
                                type: typeList[type],
                                region: region,
                                release_date: release_date
                            },
                            {
                                sort: {release_date: -1, score: -1, acquisition_time: -1},
                                skip: page_size * (page_index - 1),
                                limit: page_size
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
                if (type2 != '全部' && region == '全部' && release_date == '全部') {
                    //  所有分类
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {
                                type: typeList[type],
                                type2: type2
                            },
                            {
                                sort: {release_date: -1, score: -1, acquisition_time: -1},
                                skip: page_size * (page_index - 1),
                                limit: page_size
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
                if (type2 != '全部' && region == '全部' && release_date != '全部') {
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {
                                type: typeList[type],
                                type2: type2,
                                release_date: release_date,
                            },
                            {
                                sort: {release_date: -1, score: -1, acquisition_time: -1},
                                skip: page_size * (page_index - 1),
                                limit: page_size
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
                if (type2 != '全部' && region != '全部' && release_date == '全部') {
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {
                                type: typeList[type],
                                type2: type2,
                                region: region
                            },
                            {
                                sort: {release_date: -1, score: -1, acquisition_time: -1},
                                skip: page_size * (page_index - 1),
                                limit: page_size
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
                if (type2 != '全部' && region != '全部' && release_date != '全部') {
                    mongoClient.connect(dbURL, function (err, db) {
                        var movie = db.db(dbName).collection('movie');
                        movie.find(
                            {
                                type: typeList[type],
                                type2: type2,
                                region: region,
                                release_date: release_date
                            },
                            {
                                sort: {release_date: -1, score: -1, acquisition_time: -1},
                                skip: page_size * (page_index - 1),
                                limit: page_size
                            }).toArray(function (err, data) {
                            if (data) {
                                responseData.code = 0;
                                responseData.message = '影视信息获取成功';
                                responseData.data = data;
                                res.json(responseData);
                            } else {
                                responseData.code = 1;
                                responseData.message = '影视信息获取失败';
                                res.json(responseData);
                            }
                            // 释放资源
                            db.close();
                        })
                    })
                }
            }
        } else {
            //  所有分类
            mongoClient.connect(dbURL, function (err, db) {
                var movie = db.db(dbName).collection('movie');
                movie.find(
                    {
                        $or: [{
                            name: {
                                $regex: key_word,
                                $options: "six"
                            }
                        }, {
                            actors: {$elemMatch: {$regex: key_word, $options: "six"}}
                        },
                            {
                                directors: {$elemMatch: {$regex: key_word, $options: "six"}}
                            }
                        ]
                    },
                    {
                        sort: {release_date: -1, acquisition_time: -1},
                        collation: {locale: "zh"},
                        skip: page_size * (page_index - 1),
                        limit: page_size
                    }).toArray(function (err, data) {
                    if (data) {
                        responseData.code = 0;
                        responseData.message = '影视信息获取成功';
                        responseData.data = data;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '影视信息获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        }
    }
})

/**
 * 获取所有电视信息
 */

router.get('/tv/get/all', function (req, res, next) {
    var type = req.query.type
    var selected_type = req.query.selected_type
    if (selected_type != null && selected_type != 'null' && selected_type != '全部') type = selected_type
    // 每页大小
    var page_size = req.query.page_size == null || req.query.page_size == 'null' ? 20 : +req.query.page_size
    // 当前页数
    var page_index = req.query.page_index == null || req.query.page_index == 'null' ? 1 : +req.query.page_index
    var key_word = req.query.key_word
    //  港澳台
    var hongkongMacaoTaiwanNameList = [
        '香港台',
        '澳门台',
        '台湾台'
    ]
    //  地方台
    var localStationNameList = [
        '广东台',
        '福建台',
        '天津台',
        '湖南台',
        '辽宁台',
        '河南台',
        '江西台',
        '内蒙古台',
        '新疆台',
        '上海台',
        '安徽台',
        '浙江台',
        '贵州台',
        '湖北台',
        '山西台',
        '山东台',
        '广西台',
        '北京台',
        '陕西台',
        '四川台',
        '吉林台',
        '重庆台',
        '河北台',
        '甘肃台',
        '江苏台',
        '海南台',
        '黑龙江台',
        '云南台',
        '宁夏台',
        '青海台'
    ]
    //  海外台
    var overseasStationNameList = [
        '韩国台',
        '英国台',
        '海外台',
        '美国台',
        '新加坡台',
        '印度台',
        '马来西亚台',
        '加拿大台',
        '法国台'
    ]
    if (key_word == null || key_word == 'null') {
        if (type == '全部') {
            //    全部
            mongoClient.connect(dbURL, function (err, db) {
                var movie = db.db(dbName).collection('tv');
                movie.find(
                    {},
                    {
                        sort: {name: 1},
                        collation: {locale: "zh"},
                        skip: page_size * (page_index - 1),
                        limit: page_size
                    }).toArray(function (err, data) {
                    if (data) {
                        responseData.code = 0;
                        responseData.message = '电视信息获取成功';
                        responseData.data = data;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '电视信息获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        } else if (type == '港澳台') {
            //  港澳台
            mongoClient.connect(dbURL, function (err, db) {
                var movie = db.db(dbName).collection('tv');
                movie.find(
                    {type: {$in: hongkongMacaoTaiwanNameList}},
                    {
                        sort: {name: 1},
                        collation: {locale: "zh"},
                        skip: page_size * (page_index - 1),
                        limit: page_size
                    }).toArray(function (err, data) {
                    if (data) {
                        responseData.code = 0;
                        responseData.message = '电视信息获取成功';
                        responseData.data = data;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '电视信息获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        } else if (type == '地方台') {
            //  地方台
            mongoClient.connect(dbURL, function (err, db) {
                var movie = db.db(dbName).collection('tv');
                movie.find(
                    {type: {$in: localStationNameList}},
                    {
                        sort: {name: 1},
                        collation: {locale: "zh"},
                        skip: page_size * (page_index - 1),
                        limit: page_size
                    }).toArray(function (err, data) {
                    if (data) {
                        responseData.code = 0;
                        responseData.message = '电视信息获取成功';
                        responseData.data = data;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '电视信息获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        } else if (type == '海外台') {
            //  海外台
            mongoClient.connect(dbURL, function (err, db) {
                var movie = db.db(dbName).collection('tv');
                movie.find(
                    {type: {$in: overseasStationNameList}},
                    {
                        sort: {name: 1},
                        collation: {locale: "zh"},
                        skip: page_size * (page_index - 1),
                        limit: page_size
                    }).toArray(function (err, data) {
                    if (data) {
                        responseData.code = 0;
                        responseData.message = '电视信息获取成功';
                        responseData.data = data;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '电视信息获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        } else {
            //  央视台、卫视台、轮播台、具体省份地方台
            mongoClient.connect(dbURL, function (err, db) {
                var movie = db.db(dbName).collection('tv');
                movie.find(
                    {type: type},
                    {
                        sort: {name: 1},
                        collation: {locale: "zh"},
                        skip: page_size * (page_index - 1),
                        limit: page_size
                    }).toArray(function (err, data) {
                    if (data) {
                        responseData.code = 0;
                        responseData.message = '电视信息获取成功';
                        responseData.data = data;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '电视信息获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        }
    } else {
        if (type == '全部') {
            //    全部
            mongoClient.connect(dbURL, function (err, db) {
                var movie = db.db(dbName).collection('tv');
                movie.find(
                    {
                        name: {
                            $regex: key_word,
                            $options: "six"
                        }
                    },
                    {
                        sort: {name: 1},
                        collation: {locale: "zh"},
                        skip: page_size * (page_index - 1),
                        limit: page_size
                    }).toArray(function (err, data) {
                    if (data) {
                        responseData.code = 0;
                        responseData.message = '电视信息获取成功';
                        responseData.data = data;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '电视信息获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        } else if (type == '港澳台') {
            //  港澳台
            mongoClient.connect(dbURL, function (err, db) {
                var movie = db.db(dbName).collection('tv');
                movie.find(
                    {
                        $and: [
                            {type: {$in: hongkongMacaoTaiwanNameList}},
                            {
                                name: {
                                    $regex: key_word,
                                    $options: "six"
                                }
                            }
                        ]
                    },
                    {
                        sort: {name: 1},
                        collation: {locale: "zh"},
                        skip: page_size * (page_index - 1),
                        limit: page_size
                    }).toArray(function (err, data) {
                    if (data) {
                        responseData.code = 0;
                        responseData.message = '电视信息获取成功';
                        responseData.data = data;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '电视信息获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        } else if (type == '地方台') {
            //  地方台
            mongoClient.connect(dbURL, function (err, db) {
                var movie = db.db(dbName).collection('tv');
                movie.find(
                    {
                        $and: [
                            {type: {$in: localStationNameList}},
                            {
                                name: {
                                    $regex: key_word,
                                    $options: "six"
                                }
                            }
                        ]
                    },
                    {
                        sort: {name: 1},
                        collation: {locale: "zh"},
                        skip: page_size * (page_index - 1),
                        limit: page_size
                    }).toArray(function (err, data) {
                    if (data) {
                        responseData.code = 0;
                        responseData.message = '电视信息获取成功';
                        responseData.data = data;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '电视信息获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        } else if (type == '海外台') {
            //  海外台
            mongoClient.connect(dbURL, function (err, db) {
                var movie = db.db(dbName).collection('tv');
                movie.find(
                    {
                        $and: [
                            {type: {$in: overseasStationNameList}},
                            {
                                name: {
                                    $regex: key_word,
                                    $options: "six"
                                }
                            }
                        ]
                    },
                    {
                        sort: {name: 1},
                        collation: {locale: "zh"},
                        skip: page_size * (page_index - 1),
                        limit: page_size
                    }).toArray(function (err, data) {
                    if (data) {
                        responseData.code = 0;
                        responseData.message = '电视信息获取成功';
                        responseData.data = data;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '电视信息获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        } else {
            //  央视台、卫视台、轮播台、具体省份地方台
            mongoClient.connect(dbURL, function (err, db) {
                var movie = db.db(dbName).collection('tv');
                movie.find(
                    {
                        $and: [
                            {type: type},
                            {
                                name: {
                                    $regex: key_word,
                                    $options: "six"
                                }
                            }
                        ]
                    },
                    {
                        sort: {name: 1},
                        collation: {locale: "zh"},
                        skip: page_size * (page_index - 1),
                        limit: page_size
                    }).toArray(function (err, data) {
                    if (data) {
                        responseData.code = 0;
                        responseData.message = '电视信息获取成功';
                        responseData.data = data;
                        res.json(responseData);
                    } else {
                        responseData.code = 1;
                        responseData.message = '电视信息获取失败';
                        res.json(responseData);
                    }
                    // 释放资源
                    db.close();
                })
            })
        }
    }
})

/**
 * 获取电视信息(name)
 */

router.get('/tv/get/_id', function (req, res, next) {
    var _id = objectId(req.query._id)
    mongoClient.connect(dbURL, function (err, db) {
        var movie = db.db(dbName).collection('tv');
        movie.find({_id: _id}).toArray(function (err, data) {
            if (data) {
                responseData.code = 0;
                responseData.message = '电视信息获取成功';
                responseData.data = data[0];
                res.json(responseData);
            } else {
                responseData.code = 1;
                responseData.message = '电视信息获取失败';
                res.json(responseData);
            }
            // 释放资源
            db.close();
        })
    })
})

/**
 * 用户注册
 * 参数：username、password、mobile
 * 请求方式：post
 * url：/api/user/register
 */

/**
 * 验证用户名是否存在
 * 参数：username
 * 请求方式：post
 * url：/api/user/register/validate_username
 */

router.post('/user/register/validate_username', function (req, res, next) {
    mongoClient.connect(dbURL, function (err, db) {
        var user = db.db(dbName).collection('user');
        user.find({username: req.body.username}).toArray(function (err, data) {
            if (data.length == 0) {
                responseData.code = 0;
                responseData.message = '用户名未被注册';
                responseData.data = data;
                res.json(responseData);
            } else {
                responseData.code = 1;
                responseData.message = '用户名已经被注册';
                res.json(responseData);
            }
            // 释放资源
            db.close();
        })
    })
});

/**
 * 验证手机号是否存在
 * 参数：mobile
 * 请求方式：post
 * url：/api/user/register/validate_mobile
 */

router.post('/user/register/validate_mobile', function (req, res, next) {
    var mobile = req.body.mobile;
    mongoClient.connect(dbURL, function (err, db) {
        var user = db.db(dbName).collection('user');
        user.find({mobile: mobile}).toArray(function (err, data) {
            if (data.length == 0) {
                responseData.code = 0;
                responseData.message = '手机号未被注册';
                responseData.data = data;
                res.json(responseData);
            } else {
                responseData.code = 1;
                responseData.message = '手机号已经被注册';
                res.json(responseData);
            }
            // 释放资源
            db.close();
        })
    });
})

router.post('/user/register', function (req, res, next) {

    var username = req.body.username;
    var password = req.body.password;
    var mobile = req.body.mobile;
    var register_time = getFormatDate();

    mongoClient.connect(dbURL, function (err, db) {
        var user = db.db(dbName).collection('user');
        user.find({
            username: username
        }).toArray(function (err, userInfo) {
            if (userInfo.length == 0) {
                //将用户信息写入到数据库中
                var userInfo = {
                    username: username,
                    password: password,
                    mobile: mobile,
                    register_time: register_time,
                    activate: true,
                    activate_time: register_time,
                    type: 'common',
                    avatar: avatarList[getRandomNum(0, avatarList.length - 1)]
                };
                user.save(userInfo).then(function (data) {
                    if (data) {
                        //注册成功
                        responseData.code = 0;
                        responseData.message = '注册成功';
                        responseData.userInfo = userInfo;
                        //将注册用户的信息存入cookies中
                        req.cookies.set('userInfo', JSON.stringify({
                            _id: userInfo._id,
                            username: new Buffer(userInfo.username).toString('base64')
                        }));
                        res.json(responseData);
                    } else {
                        //注册失败
                        responseData.code = 1;
                        responseData.message = '注册失败';
                        res.json(responseData);
                    }
                })
            } else {
                responseData.code = 2;
                responseData.message = '用户名已经被注册';
                responseData.userInfo = userInfo;
                res.json(responseData);
            }
        })
    })

});

/**
 * 用户登录
 * 参数：username、password
 * 请求方式：post
 * url：/api/user/login
 */

/**
 * 验证用户名是否存在
 * 参数：username
 * 请求方式：post
 * url：/api/user/login/validate_user
 */

router.post('/user/login/validate_user', function (req, res, next) {
    var username = req.body.username;
    mongoClient.connect(dbURL, function (err, db) {
        var user = db.db(dbName).collection('user');
        user.find({
            username: username
        }).toArray(function (err, userInfo) {
            if (!userInfo) {
                //用户名不存在
                responseData.code = 1;
                responseData.message = '用户名不存在';
                res.json(responseData);
                return;
            } else {
                res.json(responseData);
                return;
            }
        })
    })
});

router.post('/user/login', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    mongoClient.connect(dbURL, function (err, db) {
        var user = db.db(dbName).collection('user');
        user.find({
            username: username,
            password: password
        }).toArray(function (err, userInfo) {
            if (userInfo.length == 1) {
                //数据库中有对应的用户信息，登录成功
                userInfo = userInfo[0]
                responseData.message = '登录成功';
                responseData.code == 0;
                responseData.userInfo = userInfo;
                //将登录用户的信息存入cookies中
                req.cookies.set('userInfo', JSON.stringify({
                    _id: userInfo._id,
                    username: new Buffer(userInfo.username).toString('base64')
                }));
                res.json(responseData);
            } else {
                //数据库中没有对应的用户信息，用户名或密码错误，登录失败
                responseData.code = 1;
                responseData.message = '用户名或密码错误';
                res.json(responseData);
            }
        })
    })
});

/**
 * 获取用户信息
 */

router.get('/user/info', function (req, res, next) {
    var _id = objectId(req.query._id);
    mongoClient.connect(dbURL, function (err, db) {
        var user = db.db(dbName).collection('user');
        user.find({
            _id: _id
        }).toArray(function (err, userInfo) {
            if (userInfo.length == 1) {
                //数据库中有对应的用户信息，登录成功
                userInfo = userInfo[0]
                responseData.message = '用户信息获取成功';
                responseData.code == 0;
                responseData.userInfo = userInfo;
                res.json(responseData);
            } else {
                //数据库中没有对应的用户信息，用户名或密码错误，登录失败
                responseData.code = 1;
                responseData.message = '用户信息获取失败';
                res.json(responseData);
            }
        })
    })
});

/**
 * 生成验证码
 * 参数：无
 * 请求方式：get
 * url：/api/user/message/code/generate
 */

router.get('/user/message/code/generate', function (req, res, next) {
    //随机产生六位数验证码
    var range = function (start, end) {
        var array = [];
        for (var i = start; i < end; ++i) array.push(i);
        return array;
    };
    var code = String(range(0, 6).map(function (x) {
        return Math.floor(Math.random() * 10);
    }).join(''))

    responseData.code == 0;
    responseData.message = '验证码生成成功';
    responseData.messageCode = code;
    res.json(responseData);
})

/**
 * 添加短信验证码
 * 参数：mobile、code
 * 请求方式：post
 * url：/api/user/message/code/add
 */

router.post('/user/message/code/add', function (req, res, next) {
    var mobile = req.body.mobile;
    var code = req.body.code;

    var messageCode = {
        mobile: mobile,
        code: code
    }

    mongoClient.connect(dbURL, function (err, db) {
        var message_code = db.db(dbName).collection('message_code');
        message_code.save(messageCode).then(function (err, messageCodeInfo) {
            if (messageCodeInfo) {
                responseData.code = 0;
                responseData.message = '短信验证码发送成功';
                res.json(responseData);
            } else {
                responseData.code = 1;
                responseData.message = '短信验证码发送失败';
                res.json(responseData);
            }
        })
    })
})

/**
 * 验证短信验证码
 * 参数：mobile、code
 * 请求方式：get
 * url：'/api/user/message/code/validate
 */

router.get('/user/message/code/validate', function (req, res, next) {
    var mobile = req.query.mobile;
    var code = req.query.code;

    mongoClient.connect(dbURL, function (err, db) {
        var message_code = db.db(dbName).collection('message_code');
        message_code.find({
            mobile: mobile,
            code: code
        }).toArray(function (err, messageCodeInfo) {
            if (messageCodeInfo) {
                responseData.code = 0;
                responseData.message = '短信验证码验证成功';
                res.json(responseData);
            } else {
                responseData.code = 1;
                responseData.message = '短信验证码验证失败';
                res.json(responseData);
            }
        })
    })
})

/**
 * 发送短信验证码
 */

router.post('/user/message/code/send', function (req, res, next) {
    var mobile = req.body.mobile;
    var code = req.body.code;
    $.ajax({
        type: 'post',
        url: 'https://api.mysubmail.com/message/send',
        data: {
            appid: '33415',
            to: mobile,
            content: '【掌上影视】您正在注册成为新用户，验证码为：' + code + '，请在30内输入，感谢您的支持',
            signature: '81eb8af6976d87a1233329fa4150dbe1'
        },
        dataType: 'json',
        success: function (result) {
        }
    })
    responseData.code = 0;
    responseData.message = '短信验证码发送成功';
    res.json(responseData);
})

module.exports = router;