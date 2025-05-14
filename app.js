const express = require('express');
const admin = require('firebase-admin');
const app = express();
const PORT = 3000;

const serviceAccount = require('./firebaseServiceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// 질문을 가져오는 API 만들기
app.get('/api/questions', async (req, res) => {
  // URL에서 category=값 으로 전달된 값을 가져옴
  const category = req.query.category;

  if (!category) {
    return res.status(400).json({ error: 'Missing category parameter' });
  }

  try {
    // Firestore에서 'questions' 컬렉션의 해당 카테고리 문서를 찾음
    const docRef = db.collection('questions').doc(category);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Category not found' });
    }
// 문서 안에 있는 'list' 배열(질문 리스트)을 가져오기
    const questionList = doc.data().list;

    if (!questionList || questionList.length === 0) {
      return res.status(404).json({ error: 'No questions found in this category' });
    }
    //질문 리스트에서 랜덤으로 하나 선택
    const randomIndex = Math.floor(Math.random() * questionList.length);
    const question = questionList[randomIndex];

    res.json({ question });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
