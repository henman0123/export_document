// jsPDF 相關設定常數
const PDF_CONFIGS = {
    INITIAL_Y: 10, //  Y 座標預設值 (初始化也會用到)
    LINE_HEIGHT: 11.95, // 段落間距 （東昇協助實測數值）
    BASE_X: 17.55, //  X 座標預設值
    alignRightOpt_BASE_X: 50, // 給啟用文字靠右對齊的選項物件的 X 座標預設值
    RIGHT_SECTION_OFFSET: 93, // 供右端使用偏移值
    LINE1_X_LINE2_X_SECTION_OFFSET: 50, // 供 line[2]、line[3] X 座標使用偏移值
    LINE3_Y_OFFSET: 5, // 供 line[4] Y 座標使用偏移值
    LINES_PER_PAGE: 24, // 一頁最多幾行
    MAX_TEXT_LENGTH: 16 // 最多接受字元數
};

// 文字靠右對齊的選項物件
const alignRightOpt = {
    align: 'right'
};

// 在繪製文字時加入選項
label.text('你的文字', x座標, y座標, alignRightOptions);

function exportPDFFromLine() {
    const startLine = parseInt(document.getElementById('startLine').value, 10);
    exportPDF(startLine);
}
 
function exportPDF(startLine = 1) {
    const text = document.getElementById('text').value; // 獲取文本區域的輸入內容
 
    const lines = text.split('\n').map(line => line.split('.')); // 將輸入內容按行分割，並將每行按點號分割成多個子元素
 
    const { jsPDF } = window.jspdf; // 從 jsPDF 庫中獲取 jsPDF 類
    const label = new jsPDF(); // 新建一個 jsPDF 實例
    //label.setFont("times"); // 設定字型為 Times New Roman
    label.addFont('SourceHanSans-Normal.ttf', 'SourceHanSans-Normal', 'normal');     // 設定字型為思源黑體，用以支援顯示中文
    label.setFont('SourceHanSans-Normal');
 
    let y = PDF_CONFIGS.INITIAL_Y + (startLine - 1) * PDF_CONFIGS.LINE_HEIGHT; // 初始化 y 座標，根據使用者輸入的起始行調整
    let lineCount = startLine - 1; // 初始化行計數器，考慮起始行
 
    lines.forEach(line => {
        if (line.length === 4) {
            if (lineCount === PDF_CONFIGS.LINES_PER_PAGE) { //如果行計數器等於 PDF_CONFIGS.LINES_PER_PAGE 則執行下方程式碼。
                label.addPage(); // 新建一頁
                y = PDF_CONFIGS.INITIAL_Y; // 重設 y 座標
                lineCount = 0; // 重設行計數器
            }
 
 
            // 檢查 line[0]、line[2] 、line[3] 是否超過 MAX_TEXT_LENGTH 
            if (line[0].length > PDF_CONFIGS.MAX_TEXT_LENGTH || line[2].length > PDF_CONFIGS.MAX_TEXT_LENGTH || line[3].length > PDF_CONFIGS.MAX_TEXT_LENGTH) {
                label.setFontSize(9); // 縮小字體大小以適應長文本
                label.text(`${line[0]}`, PDF_CONFIGS.BASE_X, y);  // 電路名稱 (左端)
                label.text(`${line[1]}`, PDF_CONFIGS.BASE_X, y + PDF_CONFIGS.LINE3_Y_OFFSET);  // 專線代碼 (左端)
                label.text(`${line[2]}`, PDF_CONFIGS.alignRightOpt_BASE_X + PDF_CONFIGS.LINE1_X_LINE2_X_SECTION_OFFSET, y, alignRightOpt); // 電路位置1 (左端)
                label.text(`${line[3]}`, PDF_CONFIGS.alignRightOpt_BASE_X + PDF_CONFIGS.LINE1_X_LINE2_X_SECTION_OFFSET, y + PDF_CONFIGS.LINE3_Y_OFFSET, alignRightOpt); // 電路位置2 (左端)
                label.text(`${line[0]}`, PDF_CONFIGS.BASE_X + PDF_CONFIGS.RIGHT_SECTION_OFFSET, y);  // 電路名稱 (右端)
                label.text(`${line[1]}`, PDF_CONFIGS.BASE_X + PDF_CONFIGS.RIGHT_SECTION_OFFSET, y + PDF_CONFIGS.LINE3_Y_OFFSET);  // 專線代碼 (右端)
                label.text(`${line[2]}`, PDF_CONFIGS.alignRightOpt_BASE_X + PDF_CONFIGS.RIGHT_SECTION_OFFSET + PDF_CONFIGS.LINE1_X_LINE2_X_SECTION_OFFSET, y, alignRightOpt); // 電路位置1 (右端)
                label.text(`${line[3]}`, PDF_CONFIGS.alignRightOpt_BASE_X + PDF_CONFIGS.RIGHT_SECTION_OFFSET + PDF_CONFIGS.LINE1_X_LINE2_X_SECTION_OFFSET, y + PDF_CONFIGS.LINE3_Y_OFFSET, alignRightOpt); // 電路位置2 (右端)
                y += PDF_CONFIGS.LINE_HEIGHT; // 調整段落間距
            } else {
                // 使用原始格式
                label.setFontSize(10);
                label.text(`${line[0]}`, PDF_CONFIGS.BASE_X, y);  // 電路名稱 (左端)
                label.text(`${line[1]}`, PDF_CONFIGS.BASE_X, y + PDF_CONFIGS.LINE3_Y_OFFSET);  // 專線代碼 (左端)
                label.text(`${line[2]}`, PDF_CONFIGS.alignRightOpt_BASE_X + PDF_CONFIGS.LINE1_X_LINE2_X_SECTION_OFFSET, y, alignRightOpt); // 電路位置1 (左端)
                label.text(`${line[3]}`, PDF_CONFIGS.alignRightOpt_BASE_X + PDF_CONFIGS.LINE1_X_LINE2_X_SECTION_OFFSET, y + PDF_CONFIGS.LINE3_Y_OFFSET, alignRightOpt); // 電路位置2 (左端)
                label.text(`${line[0]}`, PDF_CONFIGS.BASE_X + PDF_CONFIGS.RIGHT_SECTION_OFFSET, y);  // 電路名稱 (右端)
                label.text(`${line[1]}`, PDF_CONFIGS.BASE_X + PDF_CONFIGS.RIGHT_SECTION_OFFSET, y + PDF_CONFIGS.LINE3_Y_OFFSET);  // 專線代碼 (右端)
                label.text(`${line[2]}`, PDF_CONFIGS.alignRightOpt_BASE_X + PDF_CONFIGS.RIGHT_SECTION_OFFSET + PDF_CONFIGS.LINE1_X_LINE2_X_SECTION_OFFSET, y, alignRightOpt); // 電路位置1 (右端)
                label.text(`${line[3]}`, PDF_CONFIGS.alignRightOpt_BASE_X + PDF_CONFIGS.RIGHT_SECTION_OFFSET + PDF_CONFIGS.LINE1_X_LINE2_X_SECTION_OFFSET, y + PDF_CONFIGS.LINE3_Y_OFFSET, alignRightOpt); // 電路位置2 (右端)
                y += PDF_CONFIGS.LINE_HEIGHT; // 段落間距
            }
 
            lineCount++; // 增加行計數器
        }
    });
    label.save('LD-869_label.pdf');
}
