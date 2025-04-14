let slotMachine = new SlotMachine();
let game = new Game(slotMachine);
slotMachine.initializeReels();
slotMachine.createReels();


var spinButton = document.querySelector("#spin-button");
spinButton.addEventListener("click", function() {
    var betAmountInput = document.querySelector("#betAmount");

    if (!betAmountInput.value || parseFloat(betAmountInput.value) <= 0) {
        betAmountInput.setCustomValidity("Invalid amount. Please enter a valid bet amount.");
        betAmountInput.reportValidity();
        return;
    } else {
        betAmountInput.setCustomValidity(""); 
    }

    if (game.wallet.getBalance() <= betAmountInput.value) {
        betAmountInput.setCustomValidity("You should have some money in your wallet to place a bet.");
        betAmountInput.reportValidity();
        return;
    } else {
        betAmountInput.setCustomValidity(""); 
    }

    var betAmountInputValue = betAmountInput.value;
    game.predictions = false;
    var check = game.makeBet(parseFloat(betAmountInputValue));

    if(check) {
        slotMachine.runDraw();
    }
    
});

var maxButton = document.querySelector("#max-button");
maxButton.addEventListener("click", function() {
    var betAmountInput = document.querySelector("#betAmount");
    var maxBet = game.wallet.getBalance();
    betAmountInput.value = maxBet;
});


var addFunds = document.querySelector(".add-funds-button");
addFunds.addEventListener("click", function() {
    var fundsInput = document.querySelector("#fundsInput");
    if (fundsInput.validity.valueMissing) {
        fundsInput.setCustomValidity("Please enter a valid amount to add.");
        fundsInput.reportValidity();
        return;
    } else if (fundsInput.value == "") {
        fundsInput.setCustomValidity("Please enter a valid amount to add.");
        fundsInput.reportValidity();
        return;
    } else if (fundsInput.validity.rangeUnderflow) {
        fundsInput.setCustomValidity("The amount must be greater than 0.");
        fundsInput.reportValidity();
        return;
    } else if (fundsInput.validity.rangeOverflow) {
        fundsInput.setCustomValidity("The amount exceeds the maximum allowed limit of 1000.");
        fundsInput.reportValidity();
        return;
    } else {
        fundsInput.setCustomValidity(""); 
    }
    var fundsInputValue = fundsInput.value;
    game.wallet.depositTransaction(fundsInputValue);

})

var reelContainer = document.querySelector("#reel1")
reelContainer.addEventListener("transitionend", () => {
    game.calculatePaylines();
});

var cheatRadios = document.querySelectorAll("input[name='cheat']");
cheatRadios.forEach(radio => {
    radio.addEventListener("change", function() {
        if (this.checked) {
            game.setGameMode(radio.value)
        }
    });
});

Predictions.loadSelectionOptions();

var maxButtonPredictions = document.querySelector("#max-button-predictions");
maxButtonPredictions.addEventListener("click", function() {
    var betAmountInput = document.querySelector("#betAmount-predictions");
    var maxBet = game.wallet.getBalance();
    betAmountInput.value = maxBet;
});

var spinButtonPredictions = document.querySelector("#spin-button-predictions");
spinButtonPredictions.addEventListener("click", function() {
    var betAmountInput = document.querySelector("#betAmount-predictions");

    if (!betAmountInput.value || parseFloat(betAmountInput.value) <= 0) {
        betAmountInput.setCustomValidity("Invalid amount. Please enter a valid bet amount.");
        betAmountInput.reportValidity();
        return;
    } else {
        betAmountInput.setCustomValidity(""); 
    }

    if (game.wallet.getBalance() <= betAmountInput.value) {
        betAmountInput.setCustomValidity("You should have some money in your wallet to place a bet.");
        betAmountInput.reportValidity();
        return;
    } else {
        betAmountInput.setCustomValidity(""); 
    }
    
    game.predictions = true;
    var betAmountInputValue = betAmountInput.value;

    var predictionsSelect = document.querySelector("#predictions-select");
    var selectedItemPath = predictionsSelect.value;
    Predictions.item = selectedItemPath;
    Predictions.ocurrences = document.querySelector("#predictions-ocurrences").value;


    var check = game.makeBetPredictions(parseFloat(betAmountInputValue), Predictions.ocurrences, Predictions.item);

    if(check) {
        slotMachine.runDraw();
    }
});


