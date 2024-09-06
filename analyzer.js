document.getElementById('execute').addEventListener('click', function() {
  // id="date" の要素を取得
  var dateElement = document.getElementById('date');
  var dateValue = dateElement.value;

  // 日付を yyyymmdd の形式に変換
  var dateParts = dateValue.split('-');
  var formattedDate = dateParts[0] + dateParts[1] + dateParts[2];

  // コンソールに表示
  console.log(formattedDate);

  var url = `https://race.netkeiba.com/top/?kaisai_date=${formattedDate}`;

  // fetch APIを使用してURLにアクセス
  fetch(url)
    .then(response => response.text())
    .then(data => {
      // HTML文字列をDOMオブジェクトに変換
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, 'text/html');
      
      // docからリンクを取得
      const links = doc.querySelectorAll('a[href]');

      // リンクを表示するためのコンテナを作成
      const container = document.createElement('div');
      container.id = 'linkContainer';
      document.body.appendChild(container);
      
      // リンクをコンテナに追加
      links.forEach(link => {
          const linkElement = document.createElement('p');
          linkElement.innerHTML = `<a href="${link.href}">${link.href}</a>`;
          container.appendChild(linkElement);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
