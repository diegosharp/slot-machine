class Reel {
    constructor(reelNumber) {
        //Number to diferentiate the reels
        this.reelNumber = reelNumber;
        //This keeps track of the items in the reel.
        this.reelItemsState = []
        //This is the counter to track all the items that get inserted into the reel during runtime
        this.updateItemCounter = 1;
        // The intervals to avoid update function every frame, this enforce to trigger the update function
        // once every x pixels instead of every frame. If a x prixel frame triggers the update function
        // the interval is stored so that it won't be triggered again.
        this.intervals = [];
        // If the slot machine is running or not
        this.animationRunning = false;
        // This tracker is used to delete the last visible item of the reel, because every "delete"
        // increase the count of the children by one, you can't just delete the last children
        // So you need to substract the number of children by this counter
        this.tracker = {lastItemTracker: 1};


        this.reverted = false;
        this.results = [];

        
    }

    buildReel() {
        var reelContainer = document.createElement('div');
        var reelsContainer = document.querySelector(".slot-machine-elements-space");
        reelContainer.id = 'reel' + this.reelNumber;
        reelContainer.style.display = 'flex'
        reelContainer.style.flexDirection = 'column'
        reelContainer.style.justifyContent = 'flex-end'
        reelContainer.style.width = '50px'
        reelContainer.style.gap = '10px'
        reelContainer.style.position = 'relative'
        reelContainer.style.transform = 'translateY(60px)'

        for(let i = 0; i < 4; i++)  {
            var item = document.createElement('img');
            var randomItem = SlotMachineUtils.getRandomItem(SlotMachine.odds);
            var itemPath = items[randomItem - 1].path;
            item.setAttribute("src", `images/${itemPath}`);
            item.setAttribute("type", "image/webp"); 
            item.setAttribute("width", "50");
            item.setAttribute("height", "50");
            item.id = 'r'+ this.reelNumber + 'item' + (i + 1)
            reelContainer.appendChild(item);
        }

        let height = SlotMachineUtils.calculateHeightOfReel(NUMBER_OF_ITEMS_ESTIMATED);
        reelContainer.style.height = height + 'px';
        reelContainer.style.bottom = '15px';

        var reelsContainer = document.querySelector(".slot-machine-elements-space");
        reelsContainer.appendChild(reelContainer);
    
        reelContainer.addEventListener("transitionstart", () => {
            this.reverted = false;
            this.animationRunning = true;
            requestAnimationFrame(() => this.trackPosition());
        });
        
        reelContainer.addEventListener("transitionend", () => {
            this.animationRunning = false;
            this.reverted = true;
            this.getReelResults();
            this.revertReel(reelContainer);
        });
    }

    updateElements() {
        let reel = document.querySelector("#reel" + this.reelNumber);
        if(reel.children.length > 1) {
            reel.removeChild(reel.children[reel.children.length - this.tracker.lastItemTracker]);
        }
    
        this.tracker.lastItemTracker++;
    
        var emptyDiv = document.createElement('div');
        emptyDiv.style.height = '50px';
        emptyDiv.style.width = '50px';
        emptyDiv.style.backgroundColor = 'transparent';
        reel.appendChild(emptyDiv);
    
        var randomItemId = SlotMachineUtils.getRandomItem(SlotMachine.odds);
        var itemPath = items[randomItemId - 1].path;
    
        var item = document.createElement('img');
        item.setAttribute("src", `images/${itemPath}`);
        item.setAttribute("type", "image/webp"); 
        item.setAttribute("width", "50");
        item.setAttribute("height", "50");
        item.id = 'item' + (this.updateItemCounter + 1)

        this.updateItemCounter++;
    
        reel.insertBefore(item, reel.firstChild);
    }

    trackPosition() {
        var reel = document.querySelector("#reel" + this.reelNumber);
        const computedStyle = window.getComputedStyle(reel);
        const matrix = new DOMMatrix(computedStyle.transform);
        //|1  0  0  Tx|
        //|0  1  0  Ty|
        //|0  0  1  Tz|
        //|0  0  0   1|
        // The transformation matrix, in javascript or the DOM, the Ty translation of y-axis is represented by m42
        // 4th column of the matrix, second row. 
        var interval = matrix.m42 / 60;
        var floorInterval = Math.floor(interval);

        if(!this.intervals.includes(floorInterval)) {
            this.intervals.push(floorInterval);
            if(!this.reverted) {
                this.updateElements();
            }
            
            this.updateItemCounter++;   
        }

        if (this.animationRunning) {
            requestAnimationFrame(() => this.trackPosition());
            
        }
    }

    // The function that animates the reel
    animate() {
        var reel = document.querySelector("#reel" + this.reelNumber);
        reel.style.transition = "transform 5s ease-in-out";
        // These magic numbers, are kind of magic numbers, it's an estimate that works.
        // Initially the logic was 25 elements * 50px + 10. But actually on runtime less elements
        // are inserted, so it's just a calculation that works visually and is pleasing to the eye.
        var calc = (25 * 50) + 10;
        reel.style.transform = `translateY(${calc}px)`;
    }

    revertReel() {
        var reel = document.querySelector("#reel" + this.reelNumber);
        reel.style.transition = "transform 0s ease-in-out";
        reel.style.transform = `translateY(0px)`;

        let reelItemsState = []

        reel.offsetHeight;

        let children = reel.children;
        for(let i = 0; i < children.length; i++) {
            if(children[i].src != undefined) {
                let item = children[i].src.split('/').pop();
                reelItemsState.push(item);
            }
        }

        while (reel.firstChild) {
            reel.removeChild(reel.firstChild);
        }

        this.intervals = [];
        this.tracker.lastItemTracker = 1;


        for(let i = 0; i < reelItemsState.length; i++) {
            let item = document.createElement('img');
            item.setAttribute("src", `images/${reelItemsState[i]}`);
            item.setAttribute("type", "image/webp"); 
            item.setAttribute("width", "50");
            item.setAttribute("height", "50");
            reel.appendChild(item);
        }
    }

    getReelResults() {
        var reel = document.querySelector("#reel" + this.reelNumber);
        var children = reel.children;
        var count = 0
        var results = [];
        for(var child of children) {
            if(child.tagName == "IMG") {
                if(count != 0) {
                    results.push(child.src.split('/').pop())
                }
            }
            count++;
        }
        return results;

    }
}