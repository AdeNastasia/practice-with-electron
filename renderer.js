function getIp() {
  const ipElement = document.getElementById('ip');
  ipElement.innerText = 'Загрузка IP...';

  fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
      ipElement.innerText = `Внешний IP хоста: ${data.ip}`;
    })
    .catch(error => {
      ipElement.innerText = 'Не удалось получить IP-адрес.';
      console.error('Ошибка при получении IP:', error);
    });
}

getIp();

document.getElementById('refreshBtn').addEventListener('click', getIp);
