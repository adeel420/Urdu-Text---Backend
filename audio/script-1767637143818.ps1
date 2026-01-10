
Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
$synth.SelectVoiceByHints([System.Speech.Synthesis.VoiceGender]::Male)
$synth.SetOutputToWaveFile("C:\Users\adeel\Desktop\New folder (3)\urdu-tts-app\backend\audio\urdu-1767637143818.wav")
$synth.Speak("خیبرپختونخواہ میں اب ملٹری آپریشن کی تیاری ہو رہی ہے، سہیل آفریدی
بندوق کی نوک پر بدمعاشی ہوتی ہے ہم عوام کی حفاظت کریں گے، ہم کسی سے بھیک نہیں مانگتے، ہم کسی کے سامنے جھولی نہیں پھیلاتے، ہم صرف چاہتے ہیں انصاف ہو؛ اسلام آباد بار کی تقریب سے خطاب")
$synth.Dispose()
