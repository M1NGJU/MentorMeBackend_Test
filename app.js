const express = require('express');
const app = express();
const PORT = 3000

const questions = {
    "management" : [
        "자신이 기획한 프로젝트 중 가장 기억에 남는 것은?",
        "시장 조사를 어떻게 진행하나요?"
    ],
    "develop" : [
        "REST API와 SOAP의 차이는?",
        "MVC 패턴이란?"
    ],
    "design" : [
        "좋은 디자인이란 무엇이라고 생각하나요?",
        "디자인 영감을 어디서 얻나요?"
    ]
}

