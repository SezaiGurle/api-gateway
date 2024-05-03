const express = require('express');
const app = express();
const port = 3001;

// Örnek bir öğrenci veritabanı
const tuition_data = {
  "123456": { "student_no": "123456", "tuition_fee": 1000 },
  "789012": { "student_no": "789012", "tuition_fee": 1500 }
};

// /api/query-tuition yolunu dinleyen endpoint
app.get('/api/query-tuition', (req, res) => {
  console.log(`Received request to /api/query-tuition: ${req.method} ${req.url}`);
  
  // İstemciden gelen öğrenci numarasını al
  const student_no = req.query.student_no;

  // Öğrenci numarasına göre öğrenci bilgilerini getir
  if (student_no in tuition_data) {
    const student_info = tuition_data[student_no];
    res.status(200).json(student_info);
  } else {
    res.status(404).json({ "error": "Student not found" });
  }
});

app.listen(port, () => {
  console.log(`Service A listening on port ${port}`);
});
