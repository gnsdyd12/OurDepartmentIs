const Editor = toastui.Editor;
const title = document.querySelector("title");
const writer = document.querySelector("writer");

const editor = new Editor({
  el: document.querySelector("#editor"),
  height: "600px",
  initialEditType: "markdown",
  previewStyle: "vertical",
});

// 이미지 업로드 시 aws 서버에 해당 파일을 업로드하고, 서버에 업로드 된 파일의 이미지 주소를 대신 불러오는 함수
editor.addHook("addImageBlobHook", function (blob, callback) {
  const albumBucketName = "ourdepartmentis"; // S3의 버킷 이름
  const region = "ap-northeast-2"; // 서울
  const accessKeyId = "AKIAZEKJEVQEERS6QHNL"; // IAM에서 생성한 사용자의 accessKeyId
  const secretAccessKey = "VF4ioUUCxNvMXv3r+Kz/Um5H0KJnjgvRfwu2JfwI"; // IAM에서 생성한 사용자의 secretAccessKey

  // aws 접속 설정
  AWS.config.update({
    region,
    accessKeyId,
    secretAccessKey,
  });

  // 서버 업로드 함수
  const upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: albumBucketName,
      Key: blob.name,
      Body: blob,
      ACL: "public-read",
    },
  });

  // 업로드 실행
  const promise = upload.promise();

  promise.then(
    function (data) {
      // 성공 시 수행
      // console.log("Successfully uploaded photo.");
      callback(
        "https://ourdepartmentis.s3.ap-northeast-2.amazonaws.com/" + blob.name
      );
    },
    function (err) {
      // 실패 시 수행
      return console.log(
        "There was an error uploading your photo: ",
        err.message
      );
    }
  );
});

async function handlerEditor(e) {
  const editorBody = editor.getMarkdown();
  const input = document.getElementById("contents");
  input.value = editorBody;
}
