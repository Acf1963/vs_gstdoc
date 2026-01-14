@echo off
echo.
echo ============================================================
echo   GESTDOC - INSTALADOR PARA DESKTOP
echo ============================================================
echo.

:: Verificar se Node.js está instalado
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] Node.js não encontrado!
    echo Por favor, instale o Node.js em: https://nodejs.org/
    pause
    exit /b
)

echo [1/3] Instalando dependencias...
call npm install

echo.
echo [2/3] Criando a versao de producao (Build)...
call npm run build

echo.
echo [3/3] Configurando acesso local...
echo.

:: Criar um script de inicialização
(
echo @echo off
echo echo Iniciando Gestdoc...
echo call npx serve -s dist
) > start_app.bat

echo Instalação concluída!
echo.
echo Para abrir a aplicação no futuro, use o arquivo 'start_app.bat'.
echo Quando ele estiver rodando, acesse http://localhost:3000 no seu navegador.
echo.
echo DICA: No navegador (Chrome ou Edge), voce vera um icone na barra de enderecos
echo para "Instalar Gestdoc". Clique ali para criar um atalho no seu Desktop e Iniciar.
echo.
pause
