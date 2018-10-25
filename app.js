// BUDGET MODULE
let BudgetComponent = (function() {


})();


// UI MODULE
let UIComponent = (function () {

    let DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn'
    }

    return {
        publicGetInputData: function() {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            }
        },
        publicGetDOMStrings: function() {
            return DOMStrings;
        }
    }

})();


// APP MODULE
let AppComponent = (function(budgetCpnt, uiCpnt) {

    let setupEventListeners = function() {
        let DOMStrings = uiCpnt.publicGetDOMStrings();
        document.querySelector(DOMStrings.inputButton).addEventListener('click', appAddItem);
        window.addEventListener('keypress', function(e) {
            if (e.keyCode === 13 | e.which === 13) {
                appAddItem();
            }
        });
    }

    let appAddItem = function() {
        let inputValues = uiCpnt.publicGetInputData();
        console.log(inputValues);
    }

    return {
        publicAppInit: function() {
            setupEventListeners();
        }
    }

})(BudgetComponent, UIComponent);

AppComponent.publicAppInit();

