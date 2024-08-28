function exportPDFFromLine() {
    const startLine = parseInt(document.getElementById('startLine').value, 10);
    exportPDF(startLine);
}

function exportPDF(startLine = 1) {
    const text = document.getElementById('text').value; // 獲取文本區域的輸入內容
    const lines = text.split('\n').map(line => line.split('.')); // 將輸入內容按行分割，並將每行按點號分割成多個子元素

    const { jsPDF } = window.jspdf; // 從 jsPDF 庫中獲取 jsPDF 類
    const label = new jsPDF(); // 新建一個 jsPDF 實例
    label.setFont("times"); // 設定字型為 Times New Roman

    let y = 10 + (startLine - 1) * 11.95; // 初始化 y 座標，根據起始行調整
    let lineCount = startLine - 1; // 初始化行計數器，考慮起始行

    lines.forEach(line => {
        if (line.length === 4) {
            if (lineCount === 24) { //如果行計數器等於 24 則執行下方程式碼。
                label.addPage(); // 新建一頁
                y = 10; // 重設 y 座標
                lineCount = 0; // 重設行計數器
            }

            const baseX = 15.55;

            // 檢查 line[0]、line[2] 、line[3] 是否超過 15 個字元
            if (line[0].length > 15 || line[2].length > 15 || line[3].length > 15) {
                label.setFontSize(10); // 縮小字體大小以適應長文本
                label.text(`${line[0]}`, baseX, y);  // 電路名稱 (左端)
                label.text(`${line[1]}`, baseX, y + 5);  // 專線代碼 (左端)
                label.text(`${line[2]}`, baseX + 51, y); // 電路位置1 (左端)
                label.text(`${line[3]}`, baseX + 51, y + 5); // 電路位置2 (左端)
                label.text(`${line[0]}`, baseX + 93, y);  // 電路名稱 (右端)
                label.text(`${line[1]}`, baseX + 93, y + 5);  // 專線代碼 (右端)
                label.text(`${line[2]}`, baseX + 93 + 51, y); // 電路位置1 (右端)
                label.text(`${line[3]}`, baseX + 93 + 51, y + 5); // 電路位置2 (右端)
                y += 11.95; // 調整段落間距
            } else {
                // 使用原始格式
                label.setFontSize(12);
                label.text(`${line[0]}`, baseX, y);  // 電路名稱 (左端)
                label.text(`${line[1]}`, baseX, y + 5);  // 專線代碼 (左端)
                label.text(`${line[2]}`, baseX + 61, y); // 電路位置1 (左端)
                label.text(`${line[3]}`, baseX + 61, y + 5); // 電路位置2 (左端)
                label.text(`${line[0]}`, baseX + 93, y);  // 電路名稱 (右端)
                label.text(`${line[1]}`, baseX + 93, y + 5);  // 專線代碼 (右端)
                label.text(`${line[2]}`, baseX + 93 + 61, y); // 電路位置1 (右端)
                label.text(`${line[3]}`, baseX + 93 + 61, y + 5); // 電路位置2 (右端)
                y += 11.95; // 段落間距（東昇協助實測數值）
            }

            lineCount++; // 增加行計數器
        }
    });
    label.save('label.pdf');
}

