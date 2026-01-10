@echo off
echo Quick eSpeak Installation...

:: Check if chocolatey is installed
choco --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Installing Chocolatey...
    powershell -Command "Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))"
)

:: Install eSpeak using chocolatey
echo Installing eSpeak...
choco install espeak -y

echo Installation completed!
echo Please restart your terminal and try again.
pause