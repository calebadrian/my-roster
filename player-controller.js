function PlayerController() {

    
    var playerService = new PlayerService(drawPage)
    var playersElem = document.getElementById("player-roster")
    var myPlayersElem = document.getElementById("my-team")

    function drawPage(){
       
    }

    function drawFilteredPlayers(arr){
        var template = ''
        arr.forEach(player => {
            template += `
            <div class="player-card">
                <h4>${player.fullname}</h4>
                <h4>${player.position}</h4>
                <h4>${player.pro_team}</h4>
                <button class="btn-primary" onclick="app.controllers.playerCtrl.addToTeam(${player.id})">Add To Team</button>
            </div>
            `
        })
        if (template == ''){
            template += `
            <h1>No Data Found</h1>`
        }
        playersElem.innerHTML = template
    }

    function drawMyTeam(arr){
        var template = ''
        arr.forEach(player => {
            template += `
            <div class="player-card">
                <img src="${player.photo}" alt="">
                <h4>${player.fullname}</h4>
                <h4>${player.position}</h4>
                <h4>${player.pro_team}</h4>
                <button class="btn-primary" onclick="app.controllers.playerCtrl.removeFromTeam(${player.id})">Remove From Team</button>
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
            var playersBy = playerService.getPlayersBy(choice, val)
        }
        drawFilteredPlayers(playersBy)
    }

    this.addToTeam = function addToTeam(id){
        playerService.addToTeam(id)
        drawMyTeam(playerService.getMyTeam())
    }

    this.removeFromTeam = function removeFromTeam(id){
        playerService.removeFromTeam(id)
        drawMyTeam(playerService.getMyTeam())
    }
}
