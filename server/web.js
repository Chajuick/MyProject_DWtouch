const express = require("express");
const path = require("path");

const app = express();

// 🔥 React build 폴더 경로
const clientBuildPath = path.join(__dirname, "..", "client", "build");

// 정적 파일 서빙
app.use(express.static(clientBuildPath));

// SPA 라우팅 대응 (React Router)
app.get("*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`웹 서버 실행: http://localhost:${PORT}`);
});