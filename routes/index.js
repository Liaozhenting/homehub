var express = require("express");
var router = express.Router();
var fs = require("fs");
//path模块，可以生产相对和绝对路径
var path = require("path");
//配置本地资源路径
var filePath = "./public/resources";

/* GET home page. */
router.get("/", rootController);

router.get("/anime", animeController);

function rootController(req, res, next) {
  try {
    var folderArr = [];
    var count;
    var folders = fs.readdirSync(filePath);

    folders.forEach(function(folderName) {
      var stats = fs.statSync(path.join(filePath, folderName));
      if (stats.isDirectory()) {
        folderArr.push(folderName);
      }
    });

    count = folderArr.length;

    res.render("index", {
      folderArr,
      title: "HomeHub",
      count,
      getdir
    });
  } catch (err) {
    console.log(err);
    res.render("error", {
      message: "服务器错误",
      error: err
    });
  }
}

function animeController(req, res, next) {
  try {
    var param = req.query || req.params;
    var title = param.name;
    var filesArr = [];
    var count;
    var files = fs.readdirSync(path.join(filePath, title));

    files.forEach(async function(filename) {
      if (['jpg','jpeg','png','bmp','gif','mp3','mp4','m4v'].includes(getdir(filename))) {
        filesArr.push(filename);
      }
    });

    count = filesArr.length;

    res.render("anime", {
      filesArr,
      title,
      count,
      getdir
    });
  } catch (err) {
    console.log(err);
    res.render("error", {
      message: "服务器错误",
      error: err
    });
  }
}

//获取后缀名
function getdir(url) {
  var arr = url.split(".");
  var len = arr.length;
  return arr[len - 1];
}

module.exports = router;

