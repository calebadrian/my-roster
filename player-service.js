function PlayerService(callback) {
    var playersData = []
    var myTeam = []
    var teamDic = [
        { 
            name: 'patriots',
            city: 'new england',
            abrev: 'ne'
        },
        {
            name: 'eagles',
            city: 'philadelphia',
            abrev: 'phi'
        },
        {
            name: 'cowboys',
            city: 'dallas',
            abrev: 'dal'
        },
        {
            name: 'vikings',
            city: 'minnesota',
            abrev: 'min'
        },
        {
            name: 'steelers',
            city: 'pittsburgh',
            abrev: 'pit'
        },
        {
            name: 'seahawks',
            city: 'seattle',
            abrev: 'sea'
        },
        {
            name: 'raiders',
            city: 'oakland',
            abrev: 'oak'
        },
        {
            name: 'jaguars',
            city: 'jacksonville',
            abrev: 'jac'
        },
        {
            name: 'packers',
            city: 'green bay',
            abrev: 'gb'
        },
        {
            name: 'falcons',
            city: 'atlanta',
            abrev: 'atl'
        },
        {
            name: 'giants',
            city: 'new york',
            abrev: 'nyg'
        },
        {
            name: 'panthers',
            city: 'carolina',
            abrev: 'car'
        },
        {
            name: 'broncos',
            city: 'denver',
            abrev: 'den'
        },
        {
            name: 'titans',
            city: 'tennessee',
            abrev: 'ten'
        },
        {
            name: 'rams',
            city: 'los angeles',
            abrev: 'lar'
        },
        {
            name: 'browns',
            city: 'cleveland',
            abrev: 'cle'
        },
        {
            name: 'saints',
            city: 'new orleans',
            abrev: 'no'
        },
        {
            name: 'bears',
            city: 'chicago',
            abrev: 'chi'
        },
        {
            name: 'bills',
            city: 'buffalo',
            abrev: 'buf'
        },
        {
            name: 'chiefs',
            city: 'kansas city',
            abrev: 'kc'
        },
        {
            name: 'ravens',
            city: 'baltimore',
            abrev: 'bal'
        },
        {
            name: 'lions',
            city: 'detroit',
            abrev: 'det'
        },
        {
            name: 'redskins',
            city: 'washington',
            abrev: 'wa'
        },
        {
            name: 'chargers',
            city: 'los angeles',
            abrev: 'lac'
        },
        {
            name: 'cardinals',
            city: 'arizona',
            abrev: 'ari'
        },
        {
            name: 'dolphins',
            city: 'miami',
            abrev: 'mia'
        },
        {
            name: 'texans',
            city: 'houston',
            abrev: 'hou'
        },
        {
            name: 'jets',
            city: 'new york',
            abrev: 'nyj'
        },
        {
            name: 'colts',
            city: 'indianapolis',
            abrev: 'ind'
        },
        {
            name: 'bengals',
            city: 'cincinnati',
            abrev: 'cin'
        },
        {
            name: 'buccaneers',
            city: 'tampa bay',
            abrev: 'tb'
        },
        {
            name: '49ers',
            city: 'san francisco',
            abrev: 'sf'
        }
    ]
    var positionDic = {
        "running back": "rb",
        "quarterback": "qb",
        "wide receiver": "wr",
        "tight end": "te",
        "defense": "d"
    }

    function loadPlayersData() {

        //Lets check the localstorage for the data before making the call.
        //Ideally if a user has already used your site 
        //we can cut down on the load time by saving and pulling from localstorage 

        var localData = localStorage.getItem('playersData');
        if (localData) {
            playersData = JSON.parse(localData);
            return callback();
            //return will short-circuit the loadPlayersData function
            //this will prevent the code below from ever executing
        }

        var url = "https://bcw-getter.herokuapp.com/?url=";
        var endpointUri = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
        var apiUrl = url + encodeURIComponent(endpointUri);

        $.getJSON(apiUrl, function (data) {
            playersData = data.body.players;
            console.log('Player Data Ready')
            console.log('Writing Player Data to localStorage')
            localStorage.setItem('playersData', JSON.stringify(playersData))
            console.log('Finished Writing Player Data to localStorage')
            callback()
        });
    }
    loadPlayersData()
    filterPlayers()

    function filterPlayers() {
        for (let i = 0; i < playersData.length; i++) {
            const player = playersData[i];
            if (player.firstname == "" && (player.position.includes("ST") || player.position.includes("TQ"))){
                playersData.splice(i, 1)
            }
        }
    }

    function checkMyTeam(id) {
        if (myTeam.length == 9){
            return true
        }
        for (let i = 0; i < myTeam.length; i++) {
            const player = myTeam[i];
            if (player.id == id) {
                alert(player.fullname + " is already on your team!")
                return true
            }
        }
    }

    this.removeFromTeam = function removeFromTeam(id) {
        for (let i = 0; i < myTeam.length; i++) {
            const player = myTeam[i];
            if (player.id == id) {
                confirm("Are you sure you want to remove " + player.fullname + " from your team?") ? myTeam.splice(i, 1) : false
            }
        }
    }
    
    this.addToTeam = function addToTeam(id) {
        if (checkMyTeam(id)) {
            return
        }
        var toAdd = playersData.filter(player => {
            if (player.id == id) {
                return true
            }
        })
        myTeam.unshift(toAdd[0])
    }
    
    this.getPlayersBy = function getPlayersBy(filterVal, queryVal) {
        var playersBy = playersData.filter(player => {
            if (player[filterVal].toLowerCase() == queryVal.toLowerCase()) {
                return true
            }
        })
        return playersBy
    }

    this.getPlayersByName = function getPlayersByName(name){
        var playersByName = playersData.filter(player => {
            if (player.fullname.toLowerCase().includes(name.toLowerCase())){
                return true
            }
        })
        return playersByName
    }

    this.getPlayersByTeam = function getPlayersByTeam(teamName){
        var playersByTeam = playersData.filter(player => {
            if (teamName == player.pro_team.toLowerCase()){
                return true
            }
        })
        return playersByTeam
    }
    
    this.getMyTeam = function getMyTeam() {
        return JSON.parse(JSON.stringify(myTeam))
    }

    this.checkTeamDic = function checkTeamDic(val){
        for (let i = 0; i < teamDic.length; i++) {
            const team = teamDic[i];
            if (team.name == val || team.city == val){
                val = team.abrev
                return val
            }
        }
        return val
    }

    this.checkPositionDic = function checkPositionDic(val){
        for (var prop in positionDic){
            if (prop == val){
                val = positionDic[prop]
            }
        }
        return val
    }

    this.resetMyTeam = function resetMyTeam(){
        myTeam = []
    }
}