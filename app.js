// BUDGET MODULE
let BudgetComponent = (function() {

    // constructor function for expenses
    let Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    }

    // method to calculate percentage
    Expense.prototype.calcPercentage = function(totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    }

    // method to get percentage
    Expense.prototype.getPercentage = function() {
        return this.percentage;
    }
    
    // constructor function for income
    let Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    let calculateTotal = function(type) {
        let sum = 0;
        data.allItems[type].forEach(function(current) {
            sum += current.value;
        });
        data.total[type] = sum;
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
        }, 
        budget: 0,
        percentage: -1  // dosent exist at this point
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
            console.log(data.allItems[type]);
            // return the new item so that is accessible outside the module
            return newItem;
        },
        publicDeleteItem: function(type, id) {
            let ids, index;
            ids = data.allItems[type].map(function(current) {
                return current.id;
            });
            index = ids.indexOf(id);
            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },
        publicCalculateBudget: function() {
            // calculate the total budget and income
            calculateTotal('exp');
            calculateTotal('inc');
            // calcualte the total budget: income - expenses
            data.budget = data.total.inc - data.total.exp;
            // calculate the percentage of income what we spent
            if (data.total.inc > 0) {
                data.percentage = Math.round((data.total.exp / data.total.inc) * 100);
            } else {
                data.percentage = -1;
            }
        },
        publicCalculatePercentages: function() {
             data.allItems.exp.forEach(function(current){
                current.calcPercentage(data.total.inc); 
             });
        },
        pulicGetPercentages: function() {
            let allPerc = data.allItems.exp.map(function(current) {
                return current.getPercentage();
            });
            return allPerc;
        },
        publicGetBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.total.inc,
                totalExp: data.total.exp,
                percentage: data.percentage
            }
        },
        publicTesting: function() {
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
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLael: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensePercentageLabel: '.item__percentage'
    }

    return {
        publicGetInputData: function() {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            }
        },
        publicAddListItem: function(obj, type) {
            let html, newHtml, element; 
            // html string with placeholder text 
            if (type === 'inc') {
                element = DOMStrings.incomeContainer;
                html  = `<div class="item clearfix" id="inc-%id%">
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
                html = `<div class="item clearfix" id="exp-%id%">
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
        publicDeletelistItem: function(selectorID) {
            let el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
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
        publicDisplayBudget: function(obj) {
            document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalInc
            document.querySelector(DOMStrings.expensesLael).textContent = obj.totalExp;
            document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage;

            if (obj.percentage > 0) {
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';
            }   else {
                document.querySelector(DOMStrings.percentageLabel).textContent = '---';
            }
        },
        publicGetPercentages: function(percentages) {
            let fields = document.querySelectorAll(DOMStrings.expensePercentageLabel);

            // writing our own forEach method for nodeList as aboev variable 'fields' is not an arrya but a nodeList
            nodeListforEach = function(nodeList, callback) {
               for (let i = 0; i < nodeList.length; i ++) {
                    callback(nodeList[i], i);   // callback(current, index)
               } 
            }

            // calling nodeListforEach
            nodeListforEach(fields, function(current, index) {
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }
            });

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
        document.querySelector(DOMStrings.container).addEventListener('click', appDeleteItem);
    }

    let appUpdateBudget = function() {
        // 1. calculate the budget
        budgetCpnt.publicCalculateBudget();
        // 2. return / get the budget
        let budget = budgetCpnt.publicGetBudget();
        // 3. display the budget on UI
        uiCpnt.publicDisplayBudget(budget);
        // console.log(budget);
    }

    let appUpdatePercentages = function() {
        // 1. calculate percentages  
        budgetCpnt.publicCalculatePercentages();
        // 2. read / get percentages from budget controller
        let percentages = budgetCpnt.pulicGetPercentages();
        // 3. update the UI with new percentages
        uiCpnt.publicGetPercentages(percentages);
        // console.log(percentages);
    }

    let appAddItem = function() {
        let inputValues, newItem;

        // 1. get the field input data
        inputValues = uiCpnt.publicGetInputData();
        if(inputValues.description !== "" && !isNaN(inputValues.value) && inputValues.value > 0) {
            // 2. add the item to budget module
            newItem = budgetCpnt.publicAddItem(inputValues.type, inputValues.description, inputValues.value);
            // console.log(newItem);
            // 3. add the item on UI
            uiCpnt.publicAddListItem(newItem, inputValues.type);
            // 4. clear the field 
            uiCpnt.publicClearFields();
            // 5. calculate and update budget
            appUpdateBudget(); 
            // 6. calculate and update percentages     
            appUpdatePercentages(); 
        }
    }

    let appDeleteItem = function(event) {
        let itemID, splitID, type, ID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        splitID = itemID.split('-');
        type = splitID[0];
        ID = parseInt(splitID[1]);
        // 1. delete the item from the data structure. 
        budgetCpnt.publicDeleteItem(type, ID);
        // 2. delete the item from the UI.
        uiCpnt.publicDeletelistItem(itemID);
        // 3. update and display the new buget.
        appUpdateBudget();       
        // 4. calculate and update percentages     
        appUpdatePercentages(); 
    }

    return {
        publicAppInit: function() {
            setupEventListeners();
            uiCpnt.publicDisplayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            console.log('Application started');
        }
    }

})(BudgetComponent, UIComponent);

AppComponent.publicAppInit();

