$(document).ready( () => {
    $(".option").click(function() {
        $(this).parent().children().each(function() {
            $(this).removeClass("selected");
        });
        $(this).addClass("selected");
        $(this).parent().parent().children(".required-text").css("visibility", 'hidden');
        $(document).scrollTop($(this).parent().parent().next().offset().top);
    });
})

// check to make sure all slide had an option selected
function checkInfo() {
    let info = new Map();
    let slides = $('body').children(".slide");
    let missing = [];
    let infoComplete = true;
    for (let i = 0; i < slides.length; i++) {
        let selected = $(slides[i]).find(".selected");
        if (selected.length == 0) {
            infoComplete = false;
            missing.push(i);
        }
        else {
            info.set($(selected).parent().parent().attr('id'), $(selected).text());
            console.log(info);
        }
    }
    if (infoComplete) {
        let keysArray = Array.from(info.keys());
        calculateResults(info.get(keysArray[0]), info.get(keysArray[1]), info.get(keysArray[2]), info.get(keysArray[3]), info.get(keysArray[4]), info.get(keysArray[5]), info.get(keysArray[6]));
    }
    else {
        for (let j = 0; j < missing.length; j++) {
            $(slides[missing[j]]).children(".required-text").css("visibility", "visible");
        }
        $(document).scrollTop($(slides[missing[0]]).offset().top);
    }
}

function calculateResults(collisionType, activeWeight, activeGear, activeReaction, passiveWeight, passiveGear, passiveReaction) {

    let weights = ["Light", "Medium", "Heavy"];
    let activeBonus = 0;
    let passiveBonus = 0;

    // calculate modifiers for weight differences
    activeWeight = weights.indexOf(activeWeight) + 1;
    passiveWeight = weights.indexOf(passiveWeight) + 1;
    let diff = activeWeight - passiveWeight;
    if (diff > 0) {
        activeBonus = diff*2;
        passiveBonus = diff*-1;
    }
    else if (diff < 0) {
        activeBonus = diff;
        passiveBonus = diff*-2;
    }

    let activeDice = 0;
    let passiveDice = 0;
    // set active dice
    if (activeReaction == "Smash Attack") {
        if (collisionType == "Head On") {
            activeDice = Number(activeGear) + Number(passiveGear);
        }
        else if (collisionType == "Tailgate") {
            activeDice = Math.abs(Number(activeGear) - Number(passiveGear));
        }
        else {
            activeDice = Number(activeGear);
        }
        activeDice += activeBonus;
        if (activeDice < 0) {
            activeDice = 0;
        }
        var activeDiceString = " They get a weight bonus of " + activeBonus + " and roll a total of " + activeDice + " dice.";
    }
    else {
        activeDice = Number(activeGear);
        var activeDiceString = " They roll " + activeDice + " dice.";
    }

    // set passive dice
    if (passiveReaction == "Smash Attack") {
        if (collisionType == "Head On") {
            passiveDice = Number(activeGear) + Number(passiveGear);
        }
        else if (collisionType == "Tailgate") {
            passiveDice = Math.abs(Number(activeGear) - Number(passiveGear));
        }
        else {
            passiveDice = Number(passiveGear);
        }
        passiveDice += passiveBonus;
        if (passiveDice < 0) {
            passiveDice = 0;
        }
        var passiveDiceString = " They get a weight bonus of " + passiveBonus + " and roll a total of " + passiveDice + " dice.";
    }
    else {
        passiveDice = Number(passiveGear);
        var passiveDiceString = " They roll " + passiveDice + " dice.";
    }

    // display results
    let collisionText = document.createElement("h3");
    $(collisionText).addClass("results-text");
    collisionText.innerHTML = "There's a " + collisionType.toUpperCase() + " collision!";
    let activeCar = document.createElement("h3");
    $(activeCar).addClass("results-text");
    activeCar.innerHTML = "The active car chooses to " + activeReaction.toUpperCase() + "!" + activeDiceString;
    let passiveCar = document.createElement("h3");
    $(passiveCar).addClass("results-text");
    passiveCar.innerHTML = "The passive car chooses to " + passiveReaction.toUpperCase() + "! " + passiveDiceString;

    $("#results").append(collisionText);
    $("#results").append(activeCar);
    $("#results").append(passiveCar);

    $("#results-btn").text("Reset");

}

function resetSlides() {
    $(".option").removeClass("selected");
    $(".results-text").remove();
    $('body').scrollTop(0);
    $("#results-btn").text("Calculate");
}

function pickFunction(btnText) {
    console.log(btnText);
    if (btnText == "Calculate") {
        checkInfo();
    }
    else {
        resetSlides();
    }
}