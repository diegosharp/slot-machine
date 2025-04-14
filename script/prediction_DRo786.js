class Predictions {

    static ocurrences = 1;
    static item;

    static calculatePayout(ocurrences, payout) {
        var base = 1 / 6;
        var formula = base * ocurrences + (1 + (base * ocurrences))
        var payoutValue = formula * payout;
        return payoutValue;
    }

    //This static method loads the Prediction selection-options.
    static loadSelectionOptions() {
        const selectContainer = document.getElementById("predictions-container");
        const select = document.createElement("select");
        select.id = "predictions-select";
        selectContainer.insertBefore(select, selectContainer.children[2]);
        var countItem = 0;
        for (const item of items) {
            const option = document.createElement("option");
            if(countItem == 0) {
                option.selected = true;
            }
            option.value = item.path;
            option.textContent = item.name + " (Payout: " + item.payout + ")";
            select.appendChild(option);
            countItem++;
        }

        var labelContainer = document.createElement("div");
        labelContainer.style.display = "flex";
        labelContainer.style.flexDirection = "row";
        labelContainer.style.gap = "10px";
        labelContainer.style.alignItems = "center";

        var span = document.createElement("span");
        span.textContent = "Ocurrences: ";
        labelContainer.appendChild(span);

        var spanNumber = document.createElement("span");
        spanNumber.id = "predictions-ocurrences-int";
        spanNumber.textContent = "1";
        labelContainer.appendChild(spanNumber);

        selectContainer.insertBefore(labelContainer, selectContainer.children[3]);


        var range = document.createElement("input");
        range.type = "range";
        range.id = "predictions-ocurrences";
        range.min = 1;
        range.max = 9;
        range.value = 1;
        selectContainer.insertBefore(range, selectContainer.children[4]);

        range.addEventListener("input", function () {
            spanNumber.textContent = range.value;
        });


    }
}