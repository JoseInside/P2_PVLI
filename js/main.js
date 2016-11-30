var battle = new RPG.Battle();
var actionForm, spellForm, targetForm;
var infoPanel;

function prettifyEffect(obj) {
    return Object.keys(obj).map(function (key) {
        var sign = obj[key] > 0 ? '+' : ''; // show + sign for positive effects
        return `${sign}${obj[key]} ${key}`;
    }).join(', ');
}


battle.setup({
    heroes: {
        members: [
            RPG.entities.characters.heroTank,
            RPG.entities.characters.heroWizard
        ],
        grimoire: [
            RPG.entities.scrolls.health,
            RPG.entities.scrolls.fireball
        ]
    },
    monsters: {
        members: [
            RPG.entities.characters.monsterSlime,
            RPG.entities.characters.monsterBat,
            RPG.entities.characters.monsterSkeleton,
            RPG.entities.characters.monsterBat
        ]
    }
});

battle.on('start', function (data) {
    console.log('START', data);
});

battle.on('turn', function (data) {
    
    console.log('TURN', data);

    // TODO: render the characters
    //****
    var list = Object.keys(this._charactersById);
    var list2 = document.querySelectorAll('.character-list');
    var listHeroes = list2[0];
    var listMonsters = list2[1];
    listHeroes.innerHTML = '';
    listMonsters.innerHTML = '';

    for (var cont = 0; cont < list.length; cont++ )
    {
        var aux = this._charactersById[list[cont]];

        if( aux.hp < 1 ) var render = '<li data-chara-id="' + list[cont] + '" class ="dead">' + aux.name +'(HP: <strong>' + aux.hp +'</strong>/' +
            aux.maxHP +', MP: <strong>' + aux.mp + '</strong>/' + aux.maxHP + ') </li>';
        else
        {
            var render = '>li data-chara-id="' + list[cont] +'">' + aux.name + '(HP: <strong>' + aux.hp +'</strong>/' +
            aux.maxHP +', MP: <strong>' + aux.mp + '</strong>/' + aux.maxHP + ') </li>';
        }

        if(aux.party === 'heroes'){
            listHeroes.innerHTML += render;
        }
        else listMonsters.inner += render;
        
    }
    
    // TODO: highlight current character
    //****
    var active = document.querySelector('[data-chara-id="' + data.activeCharacterId + '"]');
    active.classList.add("active");

    // TODO: show battle actions form
});

battle.on('info', function (data) {
    console.log('INFO', data);

    // TODO: display turn info in the #battle-info panel
});

battle.on('end', function (data) {
    console.log('END', data);

    // TODO: re-render the parties so the death of the last character gets reflected
    // TODO: display 'end of battle' message, showing who won
});

window.onload = function () {
    actionForm = document.querySelector('form[name=select-action]');
    targetForm = document.querySelector('form[name=select-target]');
    spellForm = document.querySelector('form[name=select-spell]');
    infoPanel = document.querySelector('#battle-info');

    actionForm.addEventListener('submit', function (evt) {
        evt.preventDefault();

        // TODO: select the action chosen by the player
        // TODO: hide this menu
        // TODO: go to either select target menu, or to the select spell menu
    });

    targetForm.addEventListener('submit', function (evt) {
        evt.preventDefault();
        // TODO: select the target chosen by the player
        // TODO: hide this menu
    });

    targetForm.querySelector('.cancel')
    .addEventListener('click', function (evt) {
        evt.preventDefault();
        // TODO: cancel current battle options
        // TODO: hide this form
        // TODO: go to select action menu
    });

    spellForm.addEventListener('submit', function (evt) {
        evt.preventDefault();
        // TODO: select the spell chosen by the player
        // TODO: hide this menu
        // TODO: go to select target menu
    });

    spellForm.querySelector('.cancel')
    .addEventListener('click', function (evt) {
        evt.preventDefault();
        // TODO: cancel current battle options
        // TODO: hide this form
        // TODO: go to select action menu
    });

    battle.start();
};
