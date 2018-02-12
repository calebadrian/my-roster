function PlayerController() {

    
    var playerService = new PlayerService(drawPage)
    var playersElem = document.getElementById("player-roster")
    var myPlayersElem = document.getElementById("my-team")

    function drawPage(){
        
    }

    function drawFilteredPlayers(arr){
        var template = `
        <table class="table-format">
            <tr class="header-format">
                <th>Player Name</th>
                <th>Position</th>
                <th>Team</th>
                <th>Add To Team</th>
            </tr>`
        arr.forEach(player => {
            template += `
            <tr class="tr-format">
                <td>${player.fullname}</td>
                <td>${player.position}</td>
                <td>${player.pro_team}</td>
                <td class="pt-2 pb-2"><button class="btn-primary" onclick="app.controllers.playerCtrl.addToTeam(${player.id})">Add To Team</button></td>
            </tr>
            `
        })
        template += `</table>`
        playersElem.innerHTML = template
    }

    function drawMyTeam(arr){
        var template = `
        <div class="col-sm-12 text-center pt-3 pb-3">
            <h1>My Team</h1>
            <button class="btn-danger" onclick="app.controllers.playerCtrl.resetMyTeam()">Reset My Team</button>
        </div>`
        arr.forEach(player => {
            template += `
            <div class="col-md-2 col-sm-6 player-card text-center">
                <img src="${player.photo}" alt="">
                <h4>${player.fullname}</h4>
                <h4>${player.position}</h4>
                <h4>${player.pro_team}</h4>
                <button class="btn-primary add-btn" onclick="app.controllers.playerCtrl.removeFromTeam(${player.id})">Remove From Team</button>
            </div>`
        })
        myPlayersElem.innerHTML = template
    }



    this.search = function search(event){
        event.preventDefault();
        var formData = event.target
        var val = formData.query.value.toLowerCase()
        var choice = formData.choice.value
        if (choice == 'team'){
            val = playerService.checkTeamDic(val)
            var playersBy = playerService.getPlayersByTeam(val)
        } else if (choice == 'name'){
            var playersBy = playerService.getPlayersByName(val)
        } else {
            val = playerService.checkPositionDic(val)
            var playersBy = playerService.getPlayersBy(choice, val)
        }
        drawFilteredPlayers(playersBy)
    }

    this.addToTeam = function addToTeam(id){
        playerService.addToTeam(id)
        drawMyTeam(playerService.getMyTeam())
        myPlayersElem.scrollIntoView()
    }

    this.removeFromTeam = function removeFromTeam(id){
        playerService.removeFromTeam(id)
        drawMyTeam(playerService.getMyTeam())
    }

    this.resetMyTeam = function resetMyTeam(){
        playerService.resetMyTeam()
        drawMyTeam(playerService.getMyTeam())
        $('#first-draw').get(0).scrollIntoView()
    }

    $('#submit-btn').click(() => {
        $('html, body').animate({
            scrollTop: $('#player-roster').offset().top
        }, 500);
    });

}
