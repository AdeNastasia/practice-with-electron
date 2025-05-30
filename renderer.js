fetch('https://api.ipify.org?format=json')
  .then(response => response.json()) 
  .then(data => {
    const ipElement = document.getElementById('ip'); 
    ipElement.innerText = `Внешний IP хоста: ${data.ip}`; 
  })
  .catch(error => {
    const ipElement = document.getElementById('ip');
    ipElement.innerText = 'Не удалось получить IP-адрес.';
    console.error('Ошибка при получении IP:', error);
  });
