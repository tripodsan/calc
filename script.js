
let total = null;

let operation = '';

let reset = true;

let allClear = true;

function calc(ops) {
    const operand = parseFloat(getInput());
    if (total === null) {
        total = operand;
        operation = ops;
        return;
    }
    if (operation === '+') {
        total += operand;
    } 
    if (operation === '-') {
        total -= operand;
    }
    if (operation === '*') {
        total *= operand;
    }
    if (operation === '/') {
        total /= operand;
    }
    operation = ops;
    setInput(total);
}

function clear() {
    setInput('0');
    reset = true;
    if (allClear) {
        operation = '';
        total = null;
    } else {
        setAllClear(true);
    }
}

function setAllClear(value) {
    allClear = value;
    document.getElementById('ac').textContent = allClear ? 'AC' : 'C';
}

function getInput() {
    return document.getElementById('display').value
}

function setInput(text, direct) {
    const el = document.getElementById('display');
    el.value = text;
    if (!direct) {
        el.classList.add('update');
        setTimeout(() => {
            el.classList.remove('update');
        }, 100);
    }
}

function press(code) {
    const text = getInput();
    switch (code) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            if (text === '0' || reset) {
                setInput(code, true);
            } else {
                setInput(text + code, true);
            }
            reset = false;
            setAllClear(false);
            break;
        case 'c':
            clear();
            break;
        case '.':
            if (reset) {
                setInput('0.', true);
                setAllClear(false);
                reset = false;
            }
            if (text.indexOf('.') < 0) {
                setInput(text + '.', true);
            }
            break;
        case 's':
            if (text === '0') {
                break;
            }
            if (text.startsWith('-')) {
                setInput(text.substring(1));
            } else {
                setInput('-' + text);
            }
            break;
        case '%':
            setInput(parseFloat(getInput()) / 100);
            break;
        case '+':
        case '*':
        case '/':
        case '-':
        case '=':
            calc(code);
            setAllClear(false);
            reset = true;
            break;
    }
}
