const express = require("express"),
    router = express.Router(),
    multer = require("multer");

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./static/img/");
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${file.originalname.split(".")[0]}-${Date.now()}.${file.originalname.split(".")[1]}`);
    }
});

// let upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024*400,
//     },
//     fileFilter: (req, file, cb) => {
//         console.log("file:",file);
//         const acceptFiles = ["jpg", "jpeg", "png", "gif"];
//         let suffix = file.originalname.split(".")[1];
//
//         if (acceptFiles.includes(suffix)) {
//             cb(null, true);
//         } else {
//             cb(null, false);
//         }
//     }
// });
//
// router.post("/upload", upload.single("hehe"), (req, res, next) => {
//     console.log("req.file:",req.file);
//     let {filename, size, mimetype} = req.file;
//     res.json({result: 0, mes: "文件上传成功", url: `${filename}`});
// });
let upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024*500,
    },
    fileFilter: (req, file, cb) => {
        console.log("file:",file);
        const acceptFiles = ["jpg", "jpeg", "png", "gif"];
        let suffix = file.originalname.split(".")[1];

        if (acceptFiles.includes(suffix)) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
}).single("hehe");

router.post("/upload", (req, res, next) => {
    upload(req, res, function (err) {
        // console.log("errerr:",err);
        if (err instanceof multer.MulterError) {
            res.json({result: -2, msg: err.message});
        } else if (err) {
            res.json({result: -2, msg: "其他error"});
        } else {
            // Everything went fine.
            console.log("req.file:",req.file);
            let {filename, size, mimetype} = req.file;
            res.json({result: 0, mes: "文件上传成功", url: `/img/${filename}`});
        }
    });
});

module.exports = router;