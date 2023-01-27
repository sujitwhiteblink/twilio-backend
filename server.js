const express = require("express");
const app = express();

const multer = require("multer");

const port = process.env.port || 3031;

const cors = require("cors");
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST']
}));

const fs = require("fs");

const { Blob, Buffer } = require("buffer");

const ffmpeg = require("fluent-ffmpeg");
const ffprobe = require("ffprobe");

var pathToFfmpeg = require("ffmpeg-static");

const ffprobeStatic = require("ffprobe-static");
ffmpeg.setFfmpegPath(pathToFfmpeg);
console.log(pathToFfmpeg);
ffmpeg.setFfprobePath(ffprobeStatic.path);

const moment = require("moment");

const { exec, spawn } = require("child_process");

// ffprobe('./videos/temp12.mp4', { path: ffprobeStatic.path }, function (err, info) {
//   if (err) return done(err);
//   console.log(info);
// })

// configure multer to handle file uploads
const upload = multer({ dest: "./videos", storage: multer.memoryStorage() });

videoChunks = [];

app.post("/testConnection", (req,res)=>{
  res.status(200).send("yes connected post")
})



app.post(
  "/sendMediaFeed",
  upload.single("mediaFeed"),
  async (request, response) => {
    // const video = new Buffer([request.file]);

    const videoDuration = request.body.videoDuration;
    console.log("videoDuration",videoDuration);

    mediaBlob = request.file.buffer;
    let folderLength;
    let tempFile;
    let duration;

//     if (!fs.existsSync('./download')) {
//       fs.mkdirSync('./download');
//   }

//   if (!fs.existsSync('./videos')) {
//     fs.mkdirSync('./videos');
// }
    

    // Write the buffer to a temporary file
    fs.readdir("./download", (err, files) => {

      if (err) {
        return response.status(500).send({ error: err });
      }

      folderLength = files.length;
      tempFile = `./videos/temp${folderLength + 1}.mp4`;
      fs.writeFileSync(tempFile, mediaBlob);

      ffmpeg(tempFile)
            .setDuration(videoDuration)
            .save(`./download/video${folderLength + 1}.mp4`)
            .on('end', function() {
              
              console.log('Setting duration finished!');
              // fs.unlinkSync(tempFile)
              
              response.send("video uploaded successfully");

            });  
    
    });

  }
);



app.get("/download", (request, response) => {
  let downloadFile;
  fs.readdir(`./download`,(err, files) => {
    downloadFile = files.length

  const file = fs.readFile(`./download/video${downloadFile}.mp4`, (err, file)=>{
    if(err){
      response.status(404).send("Video not found")
    }else{
      response.status(200).send(file)

    }
  })

})

});

app.listen(port, () => {
  console.log("Express started at port 3031");
});
