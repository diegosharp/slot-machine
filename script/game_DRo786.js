
class Wallet {
    constructor() {
        this.balance = 0;
    }
    getBalance() {
        return this.balance;
    }
    depositTransaction(amount) {
        this.balance += parseFloat(amount);
        this.updateWalletDisplay();
    }
    withdrawTransaction(amount) {
        this.balance -= amount;
        this.updateWalletDisplay();
    }

    updateWalletDisplay() {
        var balanceDisplay = document.querySelector(".currency");
        balanceDisplay.textContent = this.getBalance() + " $";
    }
}

class Game {
    constructor(slotMachine) {
        this.bet = 0;
        this.wallet = new Wallet();
        this.slotMachine = slotMachine;
    }

    predictions = false;

    makeBetPredictions(amount, ocurrences, path) {
        if(Number.isNaN(amount)) {
            alert("Please enter a valid bet amount");
            return false;
        }
        if(amount <= 0) {
            alert("Please enter a valid bet amount");
            return false;
        }

        if (this.wallet.getBalance() < amount) {
            alert("Insufficient balance to place the bet. Use the money faucet \nor place a smaller bet");
            return false;
        }
        else {
            this.wallet.withdrawTransaction(amount);
            this.bet = amount;
            return true;
        }
    }

    makeBet(amount) {
        if(amount <= 0) {
            alert("Please enter a valid bet amount");
            return false;
        }

        if (this.wallet.getBalance() >= amount) {
            this.wallet.withdrawTransaction(amount);
            this.bet = amount;
            return true;
        } else {
            alert("Insufficient balance to place the bet. Use the money faucet \nor place a smaller bet");
            return false;
        }
    }

    //This method calculates the prize if there's any. 
    // It checks the reels and compares them to the winning scenarios.
    //If there's a match, it calculates the payout and adds it to the wallet.
    //If there's no match, it alerts the user that there's no win.
    // There's two playing modes, the default one and the prediction one.
    calculatePaylines() {

        if(!this.predictions) {
            let reelsResult = {
                reel1: [],
                reel2: [],
                reel3: []
            }
    
            var count = 0;
    
            slotMachine.reelStates.forEach(reelState => {
                if(count == 0) {
                    reelsResult.reel1 = reelState.getReelResults();
                }
                if(count == 1) {
                    reelsResult.reel2 = reelState.getReelResults();
                }
                if(count == 2) {
                    reelsResult.reel3 = reelState.getReelResults();
                }
                count++
            });
    
            var scenario1 = 0;
            var scenario2 = 0;
            var scenario3 = 0;
            var scenario4 = 0;
            var scenario5 = 0;
            var scenario6 = 0;
            var scenario7 = 0;
            var scenario8 = 0;
    
            var scenariosPayout = [0, 0, 0, 0, 0, 0, 0, 0];
    
            //Scenario 1
            if(reelsResult.reel1[0] == reelsResult.reel2[0] && reelsResult.reel2[0] == reelsResult.reel3[0]) {
                var payout = this.bet * SlotMachineUtils.getElement(reelsResult.reel1[0]).payout;
                scenariosPayout[0] = payout;
            }
            //Scenario 2
            if(reelsResult.reel1[1] == reelsResult.reel2[1] && reelsResult.reel2[1] == reelsResult.reel3[1]) {
                var payout = this.bet * SlotMachineUtils.getElement(reelsResult.reel1[1]).payout;
                scenariosPayout[1] = payout;
            }
    
            //Scenario 3
            if(reelsResult.reel1[2] == reelsResult.reel2[2] && reelsResult.reel2[2] == reelsResult.reel3[2]) {
                var payout = this.bet * SlotMachineUtils.getElement(reelsResult.reel1[2]).payout;
                scenariosPayout[2] = payout;
            }
            //Scenario 4
            if(reelsResult.reel1[0] == reelsResult.reel1[1] && reelsResult.reel1[1] == reelsResult.reel1[2]) {
                var payout = this.bet * SlotMachineUtils.getElement(reelsResult.reel1[0]).payout;
                scenariosPayout[3] = payout;
            }
            //Scenario 5
            if(reelsResult.reel2[0] == reelsResult.reel2[1] && reelsResult.reel2[1] == reelsResult.reel2[2]) {
                var payout = this.bet * SlotMachineUtils.getElement(reelsResult.reel2[0]).payout;
                scenariosPayout[4] = payout;
            }
    
            //Scenario 6
            if(reelsResult.reel3[0] == reelsResult.reel3[1] && reelsResult.reel3[1] == reelsResult.reel3[2]) {
                var payout = this.bet * SlotMachineUtils.getElement(reelsResult.reel3[0]).payout;
                scenariosPayout[5] = payout;
            }
    
            //Scenario 7
            if(reelsResult.reel1[0] == reelsResult.reel2[1] && reelsResult.reel2[1] == reelsResult.reel3[2]) {
                var payout = this.bet * SlotMachineUtils.getElement(reelsResult.reel1[0]).payout;
                scenariosPayout[6] = payout;
            }
    
            //Scenario 8
            if(reelsResult.reel1[2] == reelsResult.reel2[1] && reelsResult.reel2[1] == reelsResult.reel3[0]) {
                var payout = this.bet * SlotMachineUtils.getElement(reelsResult.reel1[2]).payout;
                scenariosPayout[7] = payout;
            }
    
    
            var totalPayout = 0;
            scenariosPayout.forEach(payout => {
                totalPayout += payout;
            });
            this.wallet.depositTransaction(totalPayout);
    
            if(totalPayout > 0) {
                alert("You won " + totalPayout + " $");
            }
            else {
                alert("No win this time, try again!");
            }
    
            scenariosPayout.forEach(payout => {
                payout = 0;
            });
        }
        else {
            let reelsResult = [];

            var count = 0;
    
            slotMachine.reelStates.forEach(reelState => {
                console.log("Reel State");   
                var results = reelState.getReelResults();
                results.forEach(result => {
                    reelsResult.push(result);
                })
            });
    
            var realOcurrences = 0;

            console.log("Prediction path")
            console.log(Predictions.item);

            console.log(reelsResult.length);
    
            reelsResult.forEach(reelState => {
                console.log(reelState);
                if(reelState == Predictions.item) {
                    realOcurrences++;
                }
            })

            console.log("Real Ocurrences")
            console.log(realOcurrences);
            console.log(Predictions.ocurrences);
    
            if(realOcurrences == Predictions.ocurrences) {
                var payout = Predictions.calculatePayout(Predictions.ocurrences, SlotMachineUtils.getElement(Predictions.item).payout);
                var finalPayout = payout * this.bet;
                this.wallet.depositTransaction(finalPayout);
                alert("You won " + finalPayout + " $");
            } else {
                alert("No win this time, try again!");
            }
        }

        

    }

    setGameMode(mode) {
        SlotMachineUtils.generateItemsOdds(SlotMachine.odds, items, mode);
    }
}