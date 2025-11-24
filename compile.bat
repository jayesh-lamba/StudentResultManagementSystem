@echo off
echo ========================================
echo Compiling Student Result Management System
echo ========================================

echo Compiling source files...
javac src\*.java

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo Compilation successful!
    echo ========================================
    echo.
    echo To run the application, use:
    echo   java -cp src Main
    echo.
) else (
    echo.
    echo ========================================
    echo Compilation failed!
    echo ========================================
    echo Please check that JDK is installed.
    echo.
    pause
)
