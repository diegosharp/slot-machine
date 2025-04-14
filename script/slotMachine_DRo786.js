class SlotMachine {
    // To consider the odds when generating a random element. All the elements are placed in an array
    // if the element has 70 odds, it will appear 70 times in the array. 
    // If the element has 10 odds, it will appear 10 times in the array.
    // So the odds are 70% and 10% respectively.

    static odds = [];
    constructor() {
        // This field stores the reels states.
        this.reelStates = [];
        this.generalDrawsCounter = 0;

        SlotMachineUtils.generateItemsOdds(SlotMachine.odds, items, 'defaultMode');
    }

    initializeReels() {
        for(let i = 0; i < 3; i++) {
            var reelState = new Reel(i + 1);
            this.reelStates.push(reelState);
        }
    }

    createReels() {
        this.reelStates.forEach(reelState => {
            reelState.buildReel();
        })
    }

    runDraw() {
        this.generalDrawsCounter++;
        this.reelStates.forEach(reelState => {
            reelState.animate();
        });
    }
}