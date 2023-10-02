"use strict";

const $ = selector => document.querySelector(selector);

const getErrorMsg = lbl => `${lbl} must be a valid number greater than zero.`;
const getErrorMsgTax = lbl => `${lbl} must be a valid number greater than zero and less than 100.\nExample: 6 or 5.5`;

const focusAndSelect = selector => {
    const elem = $(selector);
    elem.focus();
    elem.select();
};

let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

function calculateTotal (sale,tax) {
    const totalPrice = sale * (tax/100 + 1).toFixed(2);
    return totalPrice.toFixed(2);
};

const processEntries = () => {
    const sale = parseFloat($("#sale").value);
    const tax = parseFloat($("#tax").value);

    if (isNaN(sale) || sale <= 0) {
        alert(getErrorMsg("Sales Price"));
        focusAndSelect("#sale");
    } else if (isNaN(tax) || tax <= 0 || tax >= 100) {
        alert(getErrorMsgTax("Tax Rate"));
        focusAndSelect("#tax");
    } else {   
        $("#total").value = USDollar.format(calculateTotal(sale,tax));
    }
};

var clearEntries = () => {
    $("#sale").value = "";
    $("#tax").value = "";
    $("#total").value = "";
    $("#sale").focus();
};

document.addEventListener("DOMContentLoaded", () => {
    $("#calculate").addEventListener("click", processEntries);
    $("#clear").addEventListener("click", clearEntries);
    $("#sale").focus();   
});
