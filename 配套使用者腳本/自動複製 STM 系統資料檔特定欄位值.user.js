// ==UserScript==
// @name        自動複製 STM 系統資料檔特定欄位值
// @namespace   http://tampermonkey.net/
// @version     1.5
// @description 自動複製 STM 系統資料檔特定欄位值，須配合 TCKK 標籤工具使用。
// @author      noi
// @match       https://web.pams.cht.com.tw/sys/stm/sdh_QryStmSys.asp?*
// @match       http://127.0.0.1:3000/e:/User_Temp/*
// @icon        https://web-eshop.cdn.hinet.net/eshop/img/favicon.ico
// @grant       none
// @updateURL   https://github.com/henman0123/export_document/raw/gh-pages/%E9%85%8D%E5%A5%97%E4%BD%BF%E7%94%A8%E8%80%85%E8%85%B3%E6%9C%AC/%E8%87%AA%E5%8B%95%E8%A4%87%E8%A3%BD%20STM%20%E7%B3%BB%E7%B5%B1%E8%B3%87%E6%96%99%E6%AA%94%E7%89%B9%E5%AE%9A%E6%AC%84%E4%BD%8D%E5%80%BC.user.js
// @downloadURL https://github.com/henman0123/export_document/raw/gh-pages/%E9%85%8D%E5%A5%97%E4%BD%BF%E7%94%A8%E8%80%85%E8%85%B3%E6%9C%AC/%E8%87%AA%E5%8B%95%E8%A4%87%E8%A3%BD%20STM%20%E7%B3%BB%E7%B5%B1%E8%B3%87%E6%96%99%E6%AA%94%E7%89%B9%E5%AE%9A%E6%AC%84%E4%BD%8D%E5%80%BC.user.js
// ==/UserScript==

(function() {
    'use strict';

    let Value1, Value2, Value3, Value4;

    // 取得網頁中的 table 標籤總數
    const tables = document.querySelectorAll('table');
    const tableCount = tables.length;

    switch (tableCount) {
        case 6:
            // 尋找第 6 個 table 標籤的第 6 個 tr 標籤的第 2 個 td 標籤的值
            const table2 = tables[5];
            if (table2) {
                const tr6 = table2.querySelectorAll('tr')[5];
                if (tr6) {
                    const td2 = tr6.querySelectorAll('td')[1];
                    Value2 = td2 ? td2.textContent.trim() : '';

                    // 檢查 Value2 是否為純英文和數字
                    if (!/^[a-zA-Z0-9]+$/.test(Value2)) {
                        Value2 = ''; // 若不符合，設置為空白
                    }
                }
            }
            break;

        case 5:
            // 尋找第 5 個 table 標籤的第 6 個 tr 標籤的第 2 個 td 標籤的值
            const newTable2 = tables[4]; // 假設新的邏輯需要選擇第 5 個表格
            if (newTable2) {
                const tr5 = newTable2.querySelectorAll('tr')[5]; // 假設從第 5 個行開始
                if (tr5) {
                    const td2 = tr5.querySelectorAll('td')[1];
                    Value2 = td2 ? td2.textContent.trim() : '';

                    // 檢查 Value2 是否為純英文和數字
                    if (!/^[a-zA-Z0-9]+$/.test(Value2)) {
                        Value2 = ''; // 若不符合，設置為空白
                    }
                }
            }
            break;

        default:
            console.error('不支援的 table 標籤數量: ', tableCount);
            alert('不支援的網頁結構，請檢查網頁內容。');
            return; // 結束執行
    }

    // 尋找第 2 個 table 標籤的第 2 個 tr 標籤的第 1 個 td 標籤的值
    const table1 = tables[1];
    if (table1) {
        const tr2 = table1.querySelectorAll('tr')[1];
        if (tr2) {
            const td1 = tr2.querySelectorAll('td')[0];
            Value1 = td1 ? td1.textContent.trim() : '';
        }
    }

    // 尋找 class 名為 stlDdf 的元素並格式化其值
    const stlDdfElement = document.querySelector('.stlDdf');
    if (stlDdfElement) {
        const rawText = stlDdfElement.textContent.trim();
        const match = rawText.match(/\[\^[^\-]*-(\w+-\w+-\w+:\w+|\w+-\w+-\w+)\]/);
        Value3 = match ? match[1] : '';
    }

    // 尋找「3.路由資料」表格中「上層電路」包含 TCKK 的值，並複製「銜接設備」的值
    if (tables[3]) { //如果有第四個表格，就執行下面指令
        const rows = tables[3].querySelectorAll('tr');　//選擇第四個表格中的所有 tr 標籤，並將其存儲在變數 rows 中。

        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].querySelectorAll('td'); //選擇所有 td 標籤，並將其存儲在變數 cells 中。
            if (cells.length > 1 && cells[1].textContent.includes('TCKK')) { //該行是否至少有兩個單元格（cells.length > 1），確保有「上層電路」和「銜接設備」兩個欄位，而第二個單元格「上層電路」（cells[1]）的文本內容中是否包含字符串 TCKK。
                let tempValue4 = cells[2].textContent.trim(); // 複製第三個單元格「銜接設備」的值
                const Match2 = tempValue4.match(/\^.*F-(\w+-\w+-\w+:\w+|\w+-\w+-\w+)/); // 正則表達式匹配 「^*F-」 後的內容
                Value4 = Match2 ? Match2[1] : ''; // 提取 ^ 後的值
                break; // 找到後即停止
            }
        }
    }

    // 檢查是否為 undefined 並替換為空白
    Value1 = Value1 === undefined ? '' : Value1;
    Value2 = Value2 === undefined ? '' : Value2;
    Value3 = Value3 === undefined ? '' : Value3;
    Value4 = Value4 === undefined ? '' : Value4;

    // 格式化並自動複製到剪貼簿
    const formattedValue = `${Value1}.${Value2}.${Value3}.${Value4}`;
    navigator.clipboard.writeText(formattedValue).then(() => {
        //alert(`已自動複製: \n${formattedValue}`); //debug用
    }).catch(err => {
        console.error('複製時發生錯誤: ', err);
    });
})();
