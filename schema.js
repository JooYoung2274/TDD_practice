const mongoose = require("mongoose");

// 몽구스 연결 코드

const connect = () => {
  // 개발할때는 디버그모드로 설정 가능.
  mongoose.set("debug", true);

  //AWS 연결할때는 수정해야함.
  mongoose
    .connect("mongodb://localhost:27017/TDD", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ignoreUndefined: true,
    })
    .catch((err) => console.log(err));
};

// 몽고디비 연결 에러
mongoose.connection.on("error", (err) => {
  console.error("몽고디비 연결 에러", err);
});

// 몽고디비 연결이 끊겼을 때
mongoose.connection.on("disconnected", () => {
  console.error("몽고디비 연결이 끊김. 연결을 재시도함");
  connect();
});

module.exports = connect;
