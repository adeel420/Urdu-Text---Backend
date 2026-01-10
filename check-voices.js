const { getVoices } = require('edge-tts');

async function listVoices() {
    try {
        const voices = await getVoices();
        const urduVoices = voices.filter(v => v.ShortName.includes('ur-PK') || v.Name.includes('Urdu'));
        console.log('Urdu Voices:', JSON.stringify(urduVoices, null, 2));
    } catch (error) {
        console.error('Error listing voices:', error);
    }
}

listVoices();
