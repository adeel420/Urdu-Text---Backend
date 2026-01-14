const express = require("express");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 4000;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/audio", express.static("audio"));

// Create audio directory
const audioDir = path.join(__dirname, "audio");
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir);
}

// Google Translate TTS function
const generateUrduTTS = (text) => {
  return new Promise((resolve, reject) => {
    const filename = `urdu-${Date.now()}.mp3`;
    const audioPath = path.join(audioDir, filename);
    const audioUrl = `http://localhost:${PORT}/audio/${filename}`;

    // Google Translate TTS URL for Urdu
    const encodedText = encodeURIComponent(text);
    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodedText}&tl=ur&client=tw-ob`;

    console.log("Downloading Urdu TTS from Google...");

    const file = fs.createWriteStream(audioPath);

    https
      .get(
        ttsUrl,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          },
        },
        (response) => {
          if (response.statusCode !== 200) {
            reject(new Error(`HTTP ${response.statusCode}`));
            return;
          }

          response.pipe(file);

          file.on("finish", () => {
            file.close();
            if (fs.existsSync(audioPath) && fs.statSync(audioPath).size > 0) {
              console.log("Urdu audio generated:", audioPath);
              resolve(audioUrl);
            } else {
              reject(new Error("Audio file is empty"));
            }
          });

          file.on("error", reject);
        }
      )
      .on("error", reject);
  });
};

app.post("/api/tts", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text required" });

  try {
    // Split long text into chunks
    const maxLength = 5000;
    let textToSpeak = text;

    if (text.length > maxLength) {
      textToSpeak = text.substring(0, maxLength);
      console.log(`Text truncated to ${maxLength} characters`);
    }

    const audioUrl = await generateUrduTTS(textToSpeak);
    res.json({ audioUrl, message: "Urdu TTS generated successfully" });
  } catch (error) {
    console.error("Urdu TTS Failed:", error);
    res.status(500).json({ error: "TTS failed", details: error.message });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", port: PORT });
});

app.listen(PORT, () => {
  console.log(`✅ Urdu TTS Server running on http://localhost:${PORT}`);
});
