function exportPDF() {
    const text = document.getElementById('text').value; //獲取文本區域的輸入內容
    const lines = text.split('\n').map(line => line.split('.')); //將輸入內容按行分割，並將每行按.分割成多個子元素

    const { jsPDF } = window.jspdf; //從 jsPDF 庫中獲取 jsPDF 類
    const label = new jsPDF(); //新建一個 jsPDF 實例
    label.setFont("times"); //設定字型為 Times New Roman
    label.setFontSize(12);

    let y = 0; //初始化 y 座標
    lines.forEach(line => {
        if (line.length === 4) {
            const baseX = 15.55;
            label.text(`${line[0]}`, baseX, y);  // 電路名稱 (左端)
            label.text(`${line[1]}`, baseX, y + 5);  // 專線代碼 (左端)
            label.text(`${line[2]}`, baseX + 61, y); // 電路位置1 (左端)
            label.text(`${line[3]}`, baseX + 61, y + 5); // 電路位置2 (左端)
            label.text(`${line[0]}`, baseX + 95, y);  // 電路名稱 (右端)
            label.text(`${line[1]}`, baseX + 95, y + 5);  // 專線代碼 (右端)
            label.text(`${line[2]}`, baseX + 95 + 61, y); // 電路位置1 (右端)
            label.text(`${line[3]}`, baseX + 95 + 61, y + 5); // 電路位置2 (右端)
            y += 12.3; //段落間距
        }
    });
    label.save('label.pdf');
}
