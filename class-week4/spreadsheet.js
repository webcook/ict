class Cell {
  constructor(isHeader, disabled, data, row, column, rowName, columnName, active = false) {
    this.isHeader = isHeader;
    this.disabled = disabled;
    this.data = data;
    this.row = row;
    this.column = column;
    this.rowName = rowName;
    this.columnName = columnName;
    this.active = active;
  }
}

class SpreadsheetApp {
  constructor(containerId) {
    this.ROWS = 10;
    this.COLS = 10;
    this.alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    this.spreadsheet = [];
    this.historyStack = [];
    this.redoStack = [];
    this.isDragging = false;
    this.dragStartCell = null;

    this.container = document.querySelector(containerId);
    this.statusEl = document.querySelector("#cell-status");

    this.init();
    this.bindExportButton();
    this.bindUndoRedoButtons();
    this.bindKeyboardShortcuts();
  }

  init() {
    for (let i = 0; i < this.ROWS; i++) {
      const row = [];
      for (let j = 0; j < this.COLS; j++) {
        let data = '';
        let isHeader = false;
        let disabled = false;

        if (i === 0 && j === 0) {
          isHeader = true;
          disabled = true;
        } else if (i === 0) {
          isHeader = true;
          disabled = true;
          data = this.alphabets[j - 1];
        } else if (j === 0) {
          isHeader = true;
          disabled = true;
          data = i;
        }

        const rowName = i;
        const columnName = this.alphabets[j - 1];
        row.push(new Cell(isHeader, disabled, data, i, j, rowName, columnName));
      }
      this.spreadsheet.push(row);
    }

    this.drawSheet();
  }

  drawSheet() {
    this.container.innerHTML = "";
    for (let i = 0; i < this.spreadsheet.length; i++) {
      const rowEl = document.createElement("div");
      rowEl.className = "cell-row";
      for (let j = 0; j < this.spreadsheet[i].length; j++) {
        rowEl.appendChild(this.createCellEl(this.spreadsheet[i][j]));
      }
      this.container.appendChild(rowEl);
    }
  }

  createCellEl(cell) {
    const input = document.createElement("input");
    input.className = "cell";
    input.id = `cell_${cell.row}${cell.column}`;
    input.value = cell.data;
    input.disabled = cell.disabled;

    if (cell.isHeader) input.classList.add("header");

    input.onclick = () => this.handleCellClick(cell);
    input.onchange = (e) => {
      this.saveHistory();
      cell.data = e.target.value;
    };

    input.onmousedown = () => {
      if (!cell.disabled) {
        this.isDragging = true;
        this.dragStartCell = cell;
      }
    };

    input.onmouseenter = () => {
      if (this.isDragging && this.dragStartCell && this.dragStartCell.row === cell.row) {
        this.handleDragCopy(this.dragStartCell, cell);
      }
    };

    input.onmouseup = () => {
      this.isDragging = false;
      this.dragStartCell = null;
    };

    return input;
  }

  handleCellClick(cell) {
    this.clearHeaderActiveStates();
    const colHeader = this.spreadsheet[0][cell.column];
    const rowHeader = this.spreadsheet[cell.row][0];

    this.getEl(colHeader.row, colHeader.column).classList.add("active");
    this.getEl(rowHeader.row, rowHeader.column).classList.add("active");
    this.statusEl.innerText = cell.columnName + cell.rowName;
  }

  clearHeaderActiveStates() {
    document.querySelectorAll(".header").forEach(el => el.classList.remove("active"));
  }

  getEl(row, col) {
    return document.querySelector(`#cell_${row}${col}`);
  }

  handleDragCopy(startCell, endCell) {
    const row = startCell.row;
    const min = Math.min(startCell.column, endCell.column);
    const max = Math.max(startCell.column, endCell.column);
    this.saveHistory();

    for (let col = min + 1; col <= max; col++) {
      const target = this.spreadsheet[row][col];
      if (!target.disabled) target.data = startCell.data;
    }
    this.refreshSheet();
  }

  refreshSheet() {
    for (let i = 1; i < this.ROWS; i++) {
      for (let j = 1; j < this.COLS; j++) {
        const el = this.getEl(i, j);
        el.value = this.spreadsheet[i][j].data;
      }
    }
  }

  saveHistory() {
    const snapshot = this.spreadsheet.map(row => row.map(cell => ({ ...cell })));
    this.historyStack.push(snapshot);
    this.redoStack = [];
  }

  undo() {
    if (this.historyStack.length === 0) return;
    this.redoStack.push(this.spreadsheet.map(row => row.map(cell => ({ ...cell }))));
    const prev = this.historyStack.pop();
    for (let i = 0; i < this.ROWS; i++) {
      for (let j = 0; j < this.COLS; j++) {
        this.spreadsheet[i][j].data = prev[i][j].data;
      }
    }
    this.refreshSheet();
  }

  redo() {
    if (this.redoStack.length === 0) return;
    this.historyStack.push(this.spreadsheet.map(row => row.map(cell => ({ ...cell }))));
    const next = this.redoStack.pop();
    for (let i = 0; i < this.ROWS; i++) {
      for (let j = 0; j < this.COLS; j++) {
        this.spreadsheet[i][j].data = next[i][j].data;
      }
    }
    this.refreshSheet();
  }

  bindExportButton() {
    document.querySelector("#export-btn").onclick = () => {
      let csv = "";
      for (let i = 1; i < this.spreadsheet.length; i++) {
        csv += this.spreadsheet[i].slice(1).map(item => item.data).join(',') + "\r\n";
      }
      const blob = new Blob([csv]);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = 'spreadsheet.csv';
      a.click();
    };
  }

  bindUndoRedoButtons() {
    document.querySelector("#undo-btn").onclick = () => this.undo();
    document.querySelector("#redo-btn").onclick = () => this.redo();
  }

  bindKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === 'z') this.undo();
      if (e.ctrlKey && e.key === 'y') this.redo();
    });
  }
}

// 실행
const app = new SpreadsheetApp("#spreadsheet-container");
