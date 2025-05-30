const { app, BrowserWindow } = require('electron');  
const path = require('path');  

function createWindow() {
  const win = new BrowserWindow({
    width: 800,              
    height: 600,             
    webPreferences: {        
      // preload: path.join(__dirname, 'preload.js') 
    }
  });

  win.loadFile('index_main.html');  // <-- Здесь пока можно менять главную страничку, потом придумаю как получше сделать 
}

app.whenReady().then(createWindow);  

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();  
});
