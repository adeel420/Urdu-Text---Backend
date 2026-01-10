
Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
$synth.SetOutputToWaveFile('C:\Users\adeel\Desktop\New folder (3)\urdu-tts-app\backend\audio\urdu-1767551407884.wav')
$synth.Speak('ماہر فلکیات کی رمضان المبارک، عید الفطر اور عید الاضحیٰ کی ممکنہ تاریخوں کی پیشگوئی
رواں برس ملک میں رمضان المبارک کا چاند آئندہ ماہ فروری کی 18 تاریخ کو نظر آنے کا قوی امکان ظاہر کردیا گیا')
$synth.Dispose()
Remove-Item 'C:\Users\adeel\Desktop\New folder (3)\urdu-tts-app\backend\audio\script-1767551407884.ps1'
