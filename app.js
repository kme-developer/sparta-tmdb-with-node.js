const path = require('path') // => 경로를 조작하는 데 사용되는 Node.js 내장 Module입니다.

const express = require('express');

// 환경 변수 설정
const dotenv = require('dotenv')
dotenv.config() // => '.env'에서 환경 변수를 불러옵니다.

// Router
const pageRouter = require('./routes/pages')
const apiRouter = require('./routes/apis')

const app = express();

// port number
const port = 3000;

// ====================================================================================================

// Middleware를 사용하여 정적 자원을 제공하기 위해 'public' Directory를 지정합니다.
app.use(express.static(path.join(__dirname, 'public')))
// '__dirname'과 'public'을 결합하여 정적 자원의 경로를 설정합니다.
app.set('views', path.join(__dirname, 'public'))

// Express에 있는 EJS(Efficient JavaScript) Template Engine을 설정합니다.
app.set('view engine', 'ejs');
// '.html' 형식의 자원을 rendering할 때 EJS를 사용하도록 설정합니다.
app.engine('html', require('ejs').renderFile);

// JSON 형식의 요청(request) 본문을 Parsing합니다.
app.use(express.json());
// URL-encoded 형식의 요청 본문을 Parsing합니다.
app.use(express.urlencoded({ extended: false }));

// '/' 경로로 들어오는 요청을 처리합니다. 이 Router는 Page를 Rendering하는 데 사용됩니다.
app.use(pageRouter) // => HTML 형태의 응답(response)을 반환하는 API

// '/api' 경로로 들어오는 요청을 처리합니다. 이 Router는 JSON 형태의 응답을 반환하는 데 사용됩니다.
app.use('/api', apiRouter) // => JSON 형태의 응답을 반환하는 API

app.listen(port, () => {
  console.log(port, '=> server open!');
});
