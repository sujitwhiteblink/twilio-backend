const express = require("express");
const app = express();

const multer = require("multer");

const port = process.env.port || 3031;

const cors = require("cors");
app.use(cors());

const {Blob, Buffer } = require("buffer");

const ffmpeg  = require("fluent-ffmpeg");
// const metadata = require("fluent-ffmpeg").Metadata;

const fs = require('fs');

// import {fileTypeFromBuffer} from 'file-type'; 

// configure multer to handle file uploads
const upload = multer({ dest: "./videos", storage: multer.memoryStorage() });
// const upload = multer({
//     storage: multer.memoryStorage()
// });

// Ffmpeg.setFfprobePath('C:\ffmpeg\ffmpeg-master-latest-win64-gpl\bin')

console.log("ffmpeg",ffmpeg.ffprobe);
ffmpeg.ffprobe('./temp12.mp4', function(err, metadata) {
  if (err) {
        console.log(err);
      }
  console.dir("metadata", metadata);
});

app.post("/sendMediaFeed", upload.single("mediaFeed"), async (request, response) => {
  // const video = new Buffer([request.file]);

  mediaBlob = request.file.buffer;
  // Write the buffer to a temporary file
  fs.readdir('./videos', (err, files) => {
    console.log("files.length",files.length);
  });
  const tempFile = `./videos/temp12.mp4`;
  fs.writeFileSync(tempFile, mediaBlob);

  fs.readdir('./videos', (err, files) => {
    console.log("files.length",files.length);
  });


  // writeFileSync(tempFile, mediaBlob);

  ffmpeg.ffprobe('./videos/temp12.mp4', function(err, metadata) {
    if (err) {
          console.log(err);
        }
    console.dir("metadata", metadata);
});

  // const type = await  fileTypeFromBuffer(request.file.buffer);

  // console.log("type",type);
  

  // Extract the metadata
  // console.log("ffmpeg ----", ffmpeg);
  // ffmpeg(tempFile)
  // .outputOptions([
  //   '-f ffmetadata'
  // ])
  // .output('metadata.txt')
  // .on('end', function (res) {
  //   console.log('Metadata extraction finished!',res);
  // })
  // .on('error', function (err) {
  //   console.log('An error occurred: ' + err);
  // })
  // .run();

  // const blob = new Blob([mediaBlob],mediaBlob.type);

  response.send("video uploaded successfully");

  // ffprobe -show_format -show_streams blob


  // ffprobe.ffprobe(request.file.buffer, (err, metadata) => {
  //   console.log("inside out");
  //   if (err) {
  //     console.log(err);
  //   }
  //   console.log("inside inn ",metadata);
  //   // const duration = metadata.format;
  //   // console.log(`Duration:  seconds`, duration);
  // });
  // const tempFile = './temp.webm';
  // writeFileSync(tempFile, mediaBlob);

});

app.post("/testFile", upload.single("mediaFeed"), (request, response) => {
  const video = request.body;
  // const fileReader = new FileReader();
  // fileReader.onload = function() {
  //     const buffer = new Buffer(new Uint8Array(this.result));
  //     console.log("buffer",buffer);
  // };
  // fileReader.readAsArrayBuffer(videoBlob);
  // res.send('Video received');
  console.log("video ", video);
  //   console.log("sendMediaFeed", request);
  console.log("sendMediaFeed body", request.body.mediaFeed);
  response.send("file uploaded successfully");
});

app.listen(port, () => {
  console.log("Express started at port 3031");
});
