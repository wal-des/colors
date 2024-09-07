        //Show details modal

        // Get the modal
        var modal = document.getElementById("colorDetails");

        function openDetails() {
            document.getElementById("colorDetails").style.display = "block";
        }

        function closeDetails() {
            document.getElementById("colorDetails").style.display = "none";
        }
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
