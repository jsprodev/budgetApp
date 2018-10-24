// Implementing module pattren in javascript
// Budget Module
let BudgetComponent = (function() {


})();

// UI Module
let UIComponent = (function () {
    

})();

// Global App Module
let AppComponent = (function(budgetCpnt, uiCpnt) {

    document.querySelector('.add__btn').addEventListener('click', function() {
        console.log('clicked');
    });

    window.addEventListener('keydown', function(e) {
        this.console.log('keydown', e);
    });

    window.addEventListener('keypress', function(e) {
        this.console.log('keypress', e);
    });

    window.addEventListener('keyup', function(e) {
        this.console.log('keyup', e);
    });

})(BudgetComponent, UIComponent);


