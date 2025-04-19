let bows = []; // 儲存愛心的陣列
let angleOffsets = []; // 儲存每個愛心的搖晃角度偏移量

function setup() {
  createCanvas(windowWidth, windowHeight);

  // 設定行數
  let rows = int(random(5, 8)); // 隨機設定 5~7 行
  let xSpacingOdd = width / 7; // 單數排水平間距
  let xSpacingEven = width / 6; // 偶數排水平間距
  let ySpacing = height / rows; // 垂直間距

  // 建立愛心，交錯排列
  for (let i = 0; i < rows; i++) {
    let isOddRow = i % 2 === 0; // 判斷是否為單數排
    let cols = isOddRow ? 7 : 6; // 單數排 7 個，偶數排 6 個
    let xSpacing = isOddRow ? xSpacingOdd : xSpacingEven;

    for (let j = 0; j < cols; j++) {
      let bow = {
        x: j * xSpacing + xSpacing / 2, // 水平位置
        y: i * ySpacing + ySpacing / 2, // 垂直位置
        size: random(30, 50), // 初始大小
        offset: isOddRow ? 0 : xSpacing / 2 // 偶數排偏移，交錯排列
      };
      bows.push(bow);
      angleOffsets.push(random(TWO_PI)); // 為每個愛心設定隨機的初始角度偏移
    }
  }

  // 建立選單容器
  let menu = createElement('ul');
  menu.style('list-style', 'none');
  menu.style('margin', '0');
  menu.style('padding', '10px'); // 減少內距
  menu.style('display', 'flex');
  menu.style('position', 'absolute');
  menu.style('top', '10px');
  menu.style('right', '10px');
  menu.style('border', '2px solid #ffffff'); // 邊框顏色改為白色
  menu.style('border-radius', '10px'); // 稍微圓潤的邊框
  menu.style('background-color', '#ffffff'); // 邊框填滿白色

  // 建立選單項目及子選單
  let items = [
    { name: '首頁', subItems: ['GO'] },
    { name: '自我介紹', subItems: ['基本資訊', '興趣愛好'] },
    { name: '作品集', subItems: ['作業1', 'hackMD'] },
    { 
      name: '測驗題', 
      subItems: [
        { question: '第一題：1+1=?', options: ['A:1', 'B:2', 'C:3'] },
        { question: '第二題：1+2=?', options: ['A:1', 'B:2', 'C:3'] }
      ]
    }
  ];

  items.forEach(item => {
    let li = createElement('li', item.name);
    li.style('margin', '0 20px'); // 減少選單項目間距
    li.style('cursor', 'pointer');
    li.style('font-family', 'Microsoft JhengHei, Arial, sans-serif'); // 設定微軟正黑體
    li.style('font-size', '36px'); // 縮小字體
    li.style('color', '#bee1e6'); // 更新字體顏色
    li.style('position', 'relative'); // 設定相對定位，讓子選單可以定位在其下方

    // 建立子選單
    if (item.subItems && item.subItems.length > 0) {
      let subMenu = createElement('ul');
      subMenu.style('list-style', 'none');
      subMenu.style('margin', '0'); // 子選單的上方間距
      subMenu.style('padding', '10px');
      subMenu.style('position', 'absolute'); // 絕對定位
      subMenu.style('top', '100%'); // 子選單顯示在主選單項目下方
      subMenu.style('left', '0'); // 子選單與主選單項目對齊
      subMenu.style('background-color', '#ffffff'); // 子選單背景顏色
      subMenu.style('border', '1px solid #bee1e6'); // 子選單邊框
      subMenu.style('border-radius', '5px'); // 子選單圓角
      subMenu.style('display', 'none'); // 預設隱藏子選單

      item.subItems.forEach(subItem => {
        if (typeof subItem === 'object') {
          // 測驗題子選單顯示「第一題」或「第二題」
          let questionLi = createElement('li', subItem.question.split('：')[0]); // 只顯示「第一題」或「第二題」
          questionLi.style('margin', '5px 0');
          questionLi.style('cursor', 'pointer');
          questionLi.style('font-family', 'Microsoft JhengHei, Arial, sans-serif');
          questionLi.style('font-size', '24px');
          questionLi.style('color', '#bee1e6');

          // 點擊測驗題時顯示問題和選項
          questionLi.mousePressed(() => {
            selectAll('div').forEach(existingBox => existingBox.remove()); // 移除現有框框

            let container = createDiv(); // 建立容器
            container.style('position', 'absolute');
            container.style('top', '50%');
            container.style('left', '50%');
            container.style('transform', 'translate(-50%, -50%)');
            container.style('width', '50%');
            container.style('padding', '20px');
            container.style('border', '2px solid #bee1e6');
            container.style('border-radius', '10px');
            container.style('background-color', '#ffffff');
            container.style('text-align', 'center');

            // 顯示問題
            let question = createElement('h2', subItem.question);
            question.style('font-family', 'Microsoft JhengHei, Arial, sans-serif');
            question.style('font-size', '24px');
            question.style('color', '#577399');
            container.child(question);

            // 顯示選項
            subItem.options.forEach(option => {
              let optionButton = createButton(option);
              optionButton.style('margin', '10px');
              optionButton.style('padding', '10px 20px');
              optionButton.style('font-family', 'Microsoft JhengHei, Arial, sans-serif');
              optionButton.style('font-size', '18px');
              optionButton.style('color', '#ffffff');
              optionButton.style('background-color', '#577399');
              optionButton.style('border', 'none');
              optionButton.style('border-radius', '5px');
              optionButton.style('cursor', 'pointer');

              // 點擊選項時顯示答案
              optionButton.mousePressed(() => {
                selectAll('div').forEach(existingBox => existingBox.remove()); // 移除現有框框
                let correctAnswer = subItem.question.includes('1+1') ? 'B:2' : 'C:3'; // 判斷正確答案
                let resultMessage = option === correctAnswer ? '答對了！' : '答錯了！';

                let answerBox = createDiv(resultMessage);
                answerBox.style('position', 'absolute');
                answerBox.style('top', '50%');
                answerBox.style('left', '50%');
                answerBox.style('transform', 'translate(-50%, -50%)');
                answerBox.style('padding', '20px');
                answerBox.style('border', '2px solid #bee1e6');
                answerBox.style('border-radius', '10px');
                answerBox.style('background-color', '#ffffff');
                answerBox.style('font-family', 'Microsoft JhengHei, Arial, sans-serif');
                answerBox.style('font-size', '24px');
                answerBox.style('color', '#577399');
                answerBox.style('text-align', 'center');

                // 點擊框時關閉
                answerBox.mousePressed(() => answerBox.remove());
              });

              container.child(optionButton);
            });

            // 建立關閉按鈕
            let closeButton = createDiv('×');
            closeButton.style('position', 'absolute');
            closeButton.style('top', '10px');
            closeButton.style('right', '10px');
            closeButton.style('cursor', 'pointer');
            closeButton.style('font-size', '24px');
            closeButton.style('font-family', 'Arial, sans-serif');
            closeButton.style('color', '#bee1e6');
            closeButton.style('background-color', '#ffffff');
            closeButton.style('border', '1px solid #bee1e6');
            closeButton.style('border-radius', '50%');
            closeButton.style('width', '30px');
            closeButton.style('height', '30px');
            closeButton.style('display', 'flex');
            closeButton.style('align-items', 'center');
            closeButton.style('justify-content', 'center');
            closeButton.mousePressed(() => container.remove()); // 點擊關閉按鈕時移除容器
            container.child(closeButton);
          });

          subMenu.child(questionLi);
        } else if (typeof subItem === 'string') {
          // 一般子選單項目
          let subLi = createElement('li', subItem);
          subLi.style('margin', '5px 0'); // 子選單項目間距
          subLi.style('cursor', 'pointer');
          subLi.style('font-family', 'Microsoft JhengHei, Arial, sans-serif');
          subLi.style('font-size', '24px'); // 子選單字體較小
          subLi.style('color', '#bee1e6');

          // 點擊子選單項目時顯示對應的框或 iframe
          subLi.mousePressed(() => {
            // 不移除其他框框，允許多個框框同時存在
            let container = createDiv(); // 建立容器
            container.style('position', 'absolute');
            container.style('top', '50%');
            container.style('left', '50%');
            container.style('transform', 'translate(-50%, -50%)');
            container.style('width', '80%');
            container.style('height', '80%');
            container.style('border', '2px solid #bee1e6');
            container.style('border-radius', '10px');
            container.style('background-color', '#ffffff');
            container.style('overflow', 'hidden'); // 確保內容不超出容器範圍

            if (subItem === '基本資訊') {
              // 顯示基本資訊內容
              container.style('width', '50%');
              container.style('height', 'auto');
              container.style('padding', '20px');
              container.style('background-color', '#bdd5ea'); // 背景顏色
              container.style('text-align', 'center');
              container.html('哈囉我是潘詠楨，就讀淡江大學教育科技系一年級，謝謝大家。');
            } else if (subItem === '興趣愛好') {
              // 顯示興趣愛好內容
              container.style('width', '50%');
              container.style('height', 'auto');
              container.style('padding', '20px');
              container.style('background-color', '#bdd5ea'); // 背景顏色
              container.style('text-align', 'center');
              container.html('我喜歡追劇、看動漫、聽歌、看海跟睡覺');
            } else if (subItem === '作業1') {
              // 顯示作業1的內容
              let iframe = createElement('iframe');
              iframe.attribute('src', 'https://yongzhen9436.github.io/20250303/');
              iframe.style('width', '100%');
              iframe.style('height', '100%');
              iframe.style('border', 'none');
              container.child(iframe);
            } else if (subItem === 'hackMD') {
              // 顯示 hackMD 的內容
              let iframe = createElement('iframe');
              iframe.attribute('src', 'https://hackmd.io/@HNe8Dm5ZTiC8ZzA_UdZ_NQ/BkekjtC0Jg');
              iframe.style('width', '100%');
              iframe.style('height', '100%');
              iframe.style('border', 'none');
              container.child(iframe);
            }

            // 建立關閉按鈕
            let closeButton = createDiv('×');
            closeButton.style('position', 'absolute');
            closeButton.style('top', '10px');
            closeButton.style('right', '10px');
            closeButton.style('cursor', 'pointer');
            closeButton.style('font-size', '24px');
            closeButton.style('font-family', 'Arial, sans-serif');
            closeButton.style('color', '#bee1e6');
            closeButton.style('background-color', '#ffffff');
            closeButton.style('border', '1px solid #bee1e6');
            closeButton.style('border-radius', '50%');
            closeButton.style('width', '30px');
            closeButton.style('height', '30px');
            closeButton.style('display', 'flex');
            closeButton.style('align-items', 'center');
            closeButton.style('justify-content', 'center');
            closeButton.mousePressed(() => container.remove()); // 點擊關閉按鈕時移除容器
            container.child(closeButton);
          });

          subMenu.child(subLi);
        }
      });

      li.mouseOver(() => subMenu.style('display', 'block')); // 滑鼠移入顯示子選單
      li.mouseOut(() => subMenu.style('display', 'none')); // 滑鼠移出隱藏子選單
      li.child(subMenu);
    }

    menu.child(li);
  });
}

function draw() {
  background('#d8e2dc'); // 更新背景顏色

  // 繪製愛心
  noStroke();
  fill(255, 255, 255, 150); // 白色，帶透明度
  bows.forEach((bow, index) => {
    let distance = dist(mouseX, mouseY, bow.x, bow.y); // 計算滑鼠與愛心的距離
    let dynamicSize = bow.size + map(distance, 0, width, 20, -10); // 根據距離調整大小

    // 計算搖晃偏移
    let angle = angleOffsets[index];
    let xOffset = sin(angle) * 5; // 左右搖晃幅度為 5 像素
    angleOffsets[index] += 0.05; // 每次繪製時增加角度，讓愛心搖晃

    // 繪製愛心的左半部分
    beginShape();
    vertex(bow.x + xOffset, bow.y); // 愛心底部的尖點
    bezierVertex(
      bow.x - dynamicSize / 2 + xOffset, bow.y - dynamicSize / 2, // 左側控制點
      bow.x - dynamicSize / 2 + xOffset, bow.y - dynamicSize,    // 左上控制點
      bow.x + xOffset, bow.y - dynamicSize / 2                  // 左上圓弧的終點
    );
    endShape();

    // 繪製愛心的右半部分
    beginShape();
    vertex(bow.x + xOffset, bow.y); // 愛心底部的尖點
    bezierVertex(
      bow.x + dynamicSize / 2 + xOffset, bow.y - dynamicSize / 2, // 右側控制點
      bow.x + dynamicSize / 2 + xOffset, bow.y - dynamicSize,    // 右上控制點
      bow.x + xOffset, bow.y - dynamicSize / 2                  // 右上圓弧的終點
    );
    endShape();
  });
}
