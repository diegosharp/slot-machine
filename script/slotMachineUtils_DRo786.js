class SlotMachineUtils {
  // This static method builds the odds array based on the items and their odds.
    static generateItemsOdds(odds, items, mode) {
      if(mode == undefined || mode == 'defaultMode') {
        odds.length = 0;
        for(const item of items) {
          for(var i = 0; i < item.odds; i++) {
              odds.push(item.id)
            }
        }
      }

      if(mode == 'cheatMode') {
        odds.length = 0;
        for(var i = 0, n = items.length - 1; i < items.length; i++, n--) {
          for(var y = 0; y < items[n].odds; y++) {
            odds.push(items[i].id)
          }
        }
      }

      if(mode == 'ultimateCheatMode') {
        odds.length = 0;
        for(const item of items) {
          for(var i = 0; i < item.odds; i++) {
              odds.push(1)
            }
        }
      }

    }

    static getRandomItem(odds) {
        const randomIndex = Math.floor(Math.random() * odds.length);
        return odds[randomIndex];
      }

    static calculateHeightOfReel(numberOfElements) {
        var gap = 10;
        var itemHeight = 50;
      
        var height = (numberOfElements * itemHeight) + ((numberOfElements - 1) * gap);
        return height;
      }
    
    static getElement(path) {
      var item;
      items.forEach(element => {
        if(element.path == path) {
          item = element;
        }
      });
      return item;
    }
}