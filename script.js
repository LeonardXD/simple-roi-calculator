const pnlForm = document.getElementById('pnl-form');
const entryPriceInput = document.getElementById('entry-price');
const exitPriceInput = document.getElementById('exit-price');
const marginInput = document.getElementById('margin');
const leverageInput = document.getElementById('leverage');
const pnlResultElement = document.getElementById('pnl-result');
const roiResultElement = document.getElementById('roi-result');

function calculatePnl() {
    const entryPrice = parseFloat(entryPriceInput.value);
    const exitPrice = parseFloat(exitPriceInput.value);
    const margin = parseFloat(marginInput.value);
    const leverage = parseFloat(leverageInput.value);
    const position = document.querySelector('input[name="position"]:checked');

    if (isNaN(entryPrice) || isNaN(exitPrice) || isNaN(margin) || isNaN(leverage) || !position || entryPrice <= 0) {
        pnlResultElement.textContent = '';
        roiResultElement.textContent = '';
        return;
    }

    let roi;
    if (position.value === 'long') {
        roi = ((exitPrice - entryPrice) / entryPrice) * leverage;
    } else {
        roi = ((entryPrice - exitPrice) / entryPrice) * leverage;
    }

    const pnl = roi * margin;

    pnlResultElement.textContent = pnl.toFixed(2);
    roiResultElement.textContent = (roi * 100).toFixed(2) + '%';

    if (pnl >= 0) {
        pnlResultElement.className = 'profit';
        roiResultElement.className = 'profit';
    } else {
        pnlResultElement.className = 'loss';
        roiResultElement.className = 'loss';
    }
}

pnlForm.addEventListener('input', calculatePnl);