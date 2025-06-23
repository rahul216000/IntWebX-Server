const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: './config.env' });

const app = express();
const SendEmail = require("./Messages/SendEmail")

const allowedOrigins = [
  // "http://127.0.0.1:5500",
    "https://intwebx.com",
  //   "https://yourdomain.com",
  //   "https://another-allowed-domain.com"
];

// Custom CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // allow request
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json()); // Parse JSON body

app.post("/api/law-firm-clients", (req, res) => {
  const { name, firm, email, phone, website } = req.body;

  SentQuoteToMe(name, firm, email, phone, website)

  SentThankyoutoClient(name, firm, email, phone, website)



  res.status(200).json({ message: "Form received successfully" });
});

app.get("/", (req, res) => {

  res.send("OK");
});


function SentQuoteToMe(name, firm, email, phone, website) {
  const sender = {
    email: 'rahul@intwebx.com',
    name: `New Law firm client ${name} - IntWebX`,
  }

  let content = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>New Submission</title>
    <style>
      body {
        font-family: 'Segoe UI', sans-serif;
        background-color: #121212;
        margin: 0;
        padding: 30px;
        color: #ffffff;
      }
      .email-container {
        max-width: 600px;
        margin: auto;
      }
      .header {
        background-color: #1e1e1e;
        color: #ffffff;
        padding: 20px;
        border-radius: 12px 12px 0 0;
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
      }
      .card {
        background-color: #1e1e1e;
        padding: 25px;
        border-radius: 0 0 12px 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        margin-bottom: 20px;
        font-size: 20px;
      }
      .field {
        margin-bottom: 15px;
      }
      .label {
        font-weight: 600;
        display: inline-block;
        width: 100px;
        color: #bbbbbb;
      }
      .value {
        color: #ffffff;
      }
      .footer {
        text-align: center;
        font-size: 14px;
        color: #aaaaaa;
        margin-top: 30px;
      }

      @media only screen and (max-width: 600px) {
        .label {
          display: block;
          margin-bottom: 4px;
        }
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">📬 New Form Submission</div>
      <div class="card">
        <div class="field"><span class="label">Name:</span> <span class="value">${name}</span></div>
        <div class="field"><span class="label">Firm:</span> <span class="value">${firm}</span></div>
        <div class="field"><span class="label">Email:</span> <span class="value">${email}</span></div>
        <div class="field"><span class="label">Phone:</span> <span class="value">${phone}</span></div>
        <div class="field"><span class="label">Website:</span> <span class="value">${website}</span></div>
      </div>
      <div class="footer">
        You received this lead via your <strong>IntWebX</strong> lead capture system.
      </div>
    </div>
  </body>
</html>`



  SendEmail(sender, 'intwebx@gmail.com', name, content)
}

function SentThankyoutoClient(name, firm, email, phone, website) {

  const sender = {
    email: 'rahul@intwebx.com',
    name: `IntWebX`,
  }

  let content = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Thank You for Your Request</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background-color: #F5F0CD;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.07);
    }
    .header {
      background-color: #3674B5;
      color: #ffffff;
      text-align: center;
      padding: 30px 20px;
    }
    .header h1 {
      margin: 0;
      font-size: 26px;
    }
    .content {
      padding: 30px 25px;
      background-color: #F5F0CD;
      color: #1e1d21;
    }
    .content p {
      font-size: 18px;
      line-height: 1.6;
      margin-bottom: 18px;
    }
    .box {
      background-color: #FADA7A;
      padding: 18px 20px;
      border-left: 5px solid #3674B5;
      border-radius: 8px;
      font-size: 16px;
      color: #333333;
      margin-bottom: 20px;
    }
    .footer {
      text-align: center;
      background-color: #578FCA;
      color: #ffffff;
      padding: 15px 20px;
      font-size: 14px;
    }
    @media (max-width: 600px) {
      .container {
        margin: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thank You for Requesting a Quote</h1>
    </div>
    <div class="content">
      <p>Hi ${name},</p>
      <p>Thank you for submitting your request for a free quote form. We appreciate the opportunity to assist you.</p>

      <div class="box">
        🔍 Our team is currently reviewing your request and will get back to you shortly with a personalized message.
      </div>

      <p>In the meantime, if you have any additional information to share or questions for us, feel free to reply to this email.</p>
      <p>Warm regards,<br><strong>IntWebX</strong> <br><strong>Rahul</strong> </p>
    </div>
    <div class="footer">
      &copy; 2025 IntWebX. All rights reserved.
    </div>
  </div>
</body>
</html>
`





  SendEmail(sender, email, `${name}, your request to get a quote form`, content)

}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
