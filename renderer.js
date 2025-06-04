const { ipcRenderer } = require('electron');

const getIpButton = document.getElementById('get-ip-btn');
const statusElement = document.getElementById('status');

getIpButton.addEventListener('click', () => {
  const host = document.getElementById('host').value;
  const port = document.getElementById('port').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  statusElement.innerText = 'Подключение... (максимум 30 секунд)';

  ipcRenderer.send('get-ip-request', { host, port, username, password });

  const timeout = setTimeout(() => {
    statusElement.innerText = 'Ошибка: время ожидания истекло.';
  }, 30000);

  ipcRenderer.once('get-ip-response', (event, data) => {
    clearTimeout(timeout); 

    if (data.error) {
      statusElement.innerText = 'Ошибка: ' + data.error;
    } else {
      statusElement.innerText = 'IP-адрес: ' + data.ip;
    }
  });
});
