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
            var newItem, ID;
            
            // create unique ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
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
        },
        testing: function() {
            return data;
        }
    }

})();


// UI MODULE
let UIComponent = (function () {

    let DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    }

    return {
        publicGetInputData: function() {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            }
        },
        publicAddListItem: function(obj, type) {
            let html, newHtml, element; 
            // html string with placeholder text 
            if (type === 'inc') {
                element = DOMStrings.incomeContainer;
                html  = `<div class="item clearfix" id="income-%id%">
                            <div class="item__description">%description%</div>
                            <div class="right clearfix">
                                <div class="item__value">%value%</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>`;
            } else if (type === 'exp') {    
                element = DOMStrings.expensesContainer;
                html = `<div class="item clearfix" id="expense-%id%">
                            <div class="item__description">%description%</div>
                            <div class="right clearfix">
                                <div class="item__value">%value%</div>
                                <div class="item__percentage">21%</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>`;
            }
            // replace placeholder test with actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            // insert the HTML to the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        publicClearFields: function() {
            let fields, fieldsArr;
            fields =  document.querySelectorAll(DOMStrings.inputDescription + ',' + DOMStrings.inputValue);
            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });
            fieldsArr[0].focus();
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
        // 1. get the field input data
        inputValues = uiCpnt.publicGetInputData();
        // 2. add the item to budget module
        newItem = budgetCpnt.publicAddItem(inputValues.type, inputValues.description, inputValues.value);
        // console.log(newItem);
        // 3. add the item on UI
        uiCpnt.publicAddListItem(newItem, inputValues.type);
        //  clear the field 
        uiCpnt.publicClearFields();
        // 5. calculate the budget
        
        // 6. display the budget on UI
    }

    return {
        publicAppInit: function() {
            setupEventListeners();
            console.log('Application started');
        }
    }

})(BudgetComponent, UIComponent);

AppComponent.publicAppInit();

