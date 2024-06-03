// файл script.js
window.onload = function () {

    let a = ''
    let b = ''
    let expressionResult = ''
    let selectedOperation = null

// окно вывода результата
    let outputElement = document.getElementById("result")

// список объектов кнопок циферблата (id которых начинается с btn_digit_)
    let digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')

    function onDigitButtonClicked(digit) {
        const maxDigits = 18;

        // Function to handle number formatting
        function formatNumber(numStr) {
            if (numStr.length > maxDigits) {
                const num = parseFloat(numStr);
                outputElement.style.fontSize = '1.2rem'; // уменьшить размер шрифта для экспоненциальной формы
                return num.toExponential();
            }
            return numStr;
        }

        // Update font size based on length
        if (outputElement.textContent.length < maxDigits) {
            switch (outputElement.textContent.length) {
                case 16:
                    outputElement.style.fontSize = '1.4rem';
                    break;
                case 17:
                    outputElement.style.fontSize = '1.3rem';
                    break;
                default:
                    outputElement.style.fontSize = '1.5rem';
                    break;
            }
        }

        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
                a += digit;
            }

            // Format the number if it exceeds maxDigits
            outputElement.innerHTML = formatNumber(a);
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) {
                b += digit;
            }

            // Format the number if it exceeds maxDigits
            outputElement.innerHTML = formatNumber(b);
        }
    }


// устанавка колбек-функций на кнопки циферблата по событию нажатия
    digitButtons.forEach(button => {
        button.onclick = function () {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    });

// установка колбек-функций для кнопок операций
    document.getElementById("btn_op_mult").onclick = function () {
        if (a === '') return
        selectedOperation = 'x'
    }
    document.getElementById("btn_op_plus").onclick = function () {
        if (a === '') return
        selectedOperation = '+'
    }
    document.getElementById("btn_op_minus").onclick = function () {
        if (a === '') return
        selectedOperation = '-'
    }
    document.getElementById("btn_op_div").onclick = function () {
        if (a === '') return
        selectedOperation = '/'
    }

// кнопка очищения
    document.getElementById("btn_op_clear").onclick = function () {
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0
    }
    document.getElementById("btn_op_back").onclick = function () {
        if (!selectedOperation) {
            if (a > 9) {
                a = Math.floor(a / 10)
                outputElement.innerHTML = a
            } else {
                a = ''
                outputElement.innerHTML = 0
            }
        } else {
            if (b > 9) {
                b = Math.floor(b / 10)
                outputElement.innerHTML = b
            } else {
                b = ''
                outputElement.innerHTML = 0
            }
        }
    }
// кнопка расчёта результата
    document.getElementById("btn_op_equal").onclick = function () {
        if (a === '' || b === '' || !selectedOperation)
            return

        switch (selectedOperation) {
            case 'x':
                expressionResult = (+a) * (+b)
                break;
            case '+':
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                expressionResult = (+a) / (+b)
                break;
        }

        a = expressionResult.toString()
        b = ''
        selectedOperation = null

        outputElement.innerHTML = a
    }
};