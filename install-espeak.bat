@echo off
echo Installing eSpeak for Windows...

:: Download eSpeak
curl -L -o espeak-setup.exe "https://github.com/espeak-ng/espeak-ng/releases/download/1.51/espeak-ng-X64.msi"

:: Install eSpeak
echo Installing eSpeak...
msiexec /i espeak-setup.exe /quiet

:: Add to PATH
setx PATH "%PATH%;C:\Program Files\eSpeak NG"

echo eSpeak installation completed!
echo Please restart your command prompt and try again.
pause