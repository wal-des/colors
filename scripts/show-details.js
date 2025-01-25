
$(document).on("click", ".swatch-card", function () { 
    console.log("Clicked card");
    $(".color-information-list", this).toggle();
});