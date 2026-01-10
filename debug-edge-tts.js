const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const fs = require('fs');
const path = require('path');

const audioDir = path.join(__dirname, 'audio');
if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir);
}

const generateTTS = async (text) => {
    try {
        console.log(`Generating Edge TTS for: "${text}"`);

        const tts = new MsEdgeTTS();
        await tts.setMetadata("ur-PK-SalmanNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

        const filename = `debug-${Date.now()}.mp3`;
        const audioPath = path.join(audioDir, filename);

        const fileStream = fs.createWriteStream(audioPath);
        const { audioStream } = await tts.toStream(text);

        audioStream.pipe(fileStream);

        audioStream.on('data', (chunk) => {
            console.log(`Received chunk: ${chunk.length} bytes`);
        });

        return new Promise((resolve, reject) => {
            fileStream.on('finish', () => {
                console.log('Audio file saved locally:', audioPath);
                try {
                    const stats = fs.statSync(audioPath);
                    console.log(`Final file size: ${stats.size} bytes`);
                    resolve(audioPath);
                } catch (e) {
                    console.error("Error reading file stats:", e);
                    reject(e);
                }
            });

            fileStream.on('error', (err) => {
                console.error('File Write Error:', err);
                reject(err);
            });

            audioStream.on('error', (err) => {
                console.error('Stream Error:', err);
                reject(err);
            });
        });

    } catch (error) {
        console.error('Edge TTS Generation Error:', error);
    }
};

const text = "یہ ایک لمبا جملہ ہے جو کہ ٹیسٹ کے لیے استعمال ہو رہا ہے۔";
generateTTS(text);
