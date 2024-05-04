const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3002;

const unpaid_tuition = {
  "Spring2024": ["123456", "789012", "345678"],
  "Fall2024": ["901234", "567890"]
};

app.use(bodyParser.json());

app.get('/admin/unpaid-tuition-status', (req, res) => {
  console.log(`Received request for unpaid tuition status: ${req.method} ${req.url}`);
  
  const term = req.query.term;
  const page = parseInt(req.query.page) || 1;
  const per_page = parseInt(req.query.per_page) || 10;

  if (term in unpaid_tuition) {
    const unpaid_students = unpaid_tuition[term];
    const start_index = (page - 1) * per_page;
    const end_index = start_index + per_page;
    const paginated_students = unpaid_students.slice(start_index, end_index);
    res.status(200).json({ "unpaid_students": paginated_students });
  } else {
    res.status(404).json({ "message": "No unpaid tuition for this term" });
  }
});

app.listen(port, () => {
  console.log(`Service B listening on port ${port}`);
});
