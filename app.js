// BUDGET MODULE
let BudgetComponent = (function() {

    // constructor function for expenses
    let Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }
    
    // constructor function for income
    let Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    // data structure: to store our exepenses, income, total expenses, total income
    let data = {
        allItems: {
            exp: [],
            inc: []
        },
        total: {
            exp: 0,
            inc: 0
        }
    }

    return {
        publicAddItem: function(type, description, value) {
            let newItem, ID;
            
            // create unique ID
            if (data.allItems[type].lenght > 0) {
                ID = data.allItems[type][data.allItems[type].lenght - 1].id + 1;
            } else {
                ID = 0;
            }

            // create new item based on type 'exp or 'inc
            if (type === 'exp') {
                newItem = new Expense(ID, description, value);
            } else if (type === 'inc') {
                newItem = new Income(ID, description, value);
            }

            // push the new item in data structure
            data.allItems[type].push(newItem);

            // return the new item so that is accessible outside the module
            return newItem;
        }
    }

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
        let inputValues, newItem;
        
        inputValues = uiCpnt.publicGetInputData();
        newItem = budgetCpnt.publicAddItem(inputValues.type, inputValues.description, inputValues.value);
        console.log(newItem);
    }

    return {
        publicAppInit: function() {
            setupEventListeners();
        }
    }

})(BudgetComponent, UIComponent);

AppComponent.publicAppInit();

