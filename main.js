const { app, BrowserWindow } = require('electron');  
const path = require('path');  
const { Client } = require('ssh2');
const { ipcMain } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,              
    height: 600,             
    webPreferences: {        
      // preload: path.join(__dirname, 'preload.js') 
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('index_main.html');  // <-- Здесь пока можно менять главную страничку, потом придумаю как получше сделать 
}

app.whenReady().then(createWindow);  

ipcMain.on('get-ip-request', (event, data) => {
  const conn = new Client();

  console.log('Подключение к SSH...');
  conn.on('ready', () => {
    console.log('SSH подключение установлено.');
    conn.exec('curl ifconfig.me', (err, stream) => {
      if (err) {
        event.reply('get-ip-response', { error: err.message });
        conn.end();
        return;
      }

      let ipData = '';
      stream.on('data', (chunk) => {
        ipData += chunk;
      });

      stream.on('close', () => {
        event.reply('get-ip-response', { ip: ipData.trim() });
        conn.end();
      });
    });
  });

  conn.on('error', (err) => {
    console.error('Ошибка SSH:', err);
    event.reply('get-ip-response', { error: err.message });
  });

  conn.connect({
    host: data.host,
    port: data.port,
    username: data.username,
    password: data.password
  });
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();  
});
