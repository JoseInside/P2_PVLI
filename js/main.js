/***************************************************
*Práctica realizada por:
*Jose María Monreal y Nahikari I. Madrid Ferrer
***************************************************/

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
    //***
    var list = Object.keys(this._charactersById);
    var list2 = document.querySelectorAll('.character-list');
    var listHeroes = list2[0];
    var listMonsters = list2[1];
    var render;
    listHeroes.innerHTML = '';
    listMonsters.innerHTML = '';
    
    for (var character in list)
    {
        var aux = this._charactersById[list[character]];
        render = '<li data-chara-id="' + list[character] + '">'+ aux.name + ' (HP: <strong>'+ aux.hp + '</strong>/' + aux.maxHp + ',' + ' MP: <strong>' + aux.mp + '</strong>/' + aux.maxMp + ') </li>';
        if(aux.party === 'heroes'){
            listHeroes.innerHTML += render;
        }
        else listMonsters.innerHTML += render;
        
    }

   // TODO: highlight current character
    //***  
    var charActivo = document.querySelector('[data-chara-id="'+data.activeCharacterId+'"]');
    charActivo.classList.add("active");
    
    // TODO: show battle actions form
    //***
    actionForm.style.display = 'inline';
    var options = this.options.current._group;
    var actions = actionForm.querySelector('.choices');
    
    actions.innerHTML = "";
    for(var availableAction in options){
        render =  '<li><label><input type="radio" name="option" value="' + availableAction + '"></label></li>';
        actions.innerHTML += render;
    }
 

});

battle.on('info', function (data) {
    console.log('INFO', data);

    // TODO: display turn info in the #battle-info panel
    var effect = data.effect;
    var render;
    var effectTxt = prettifyEffect(effect || {});
    //infoPanel.style.display = 'inline'; esto no va me lo dijo María
    var targetName = this._charactersById[data.targetId].name;

    switch(data.action)
     {
        case 'attack':

        if(data.success) 
            render = '<p id="battle-info">' + data.activeCharacterId + ' attacked ' + data.targetId + ' and caused ' + effectsTxt + ' </p>';
            else render = '<strong> ' + name + '</strong> missed atack';
            break;

        case 'cast': 
        render = '<p id="battle-info">' + data.activeCharacterId + ' casted ' + data.scrollName + 'on'+ data.targetId + ' and caused ' + effectsTxt + ' </p>';
        break;

        case 'defend':
        if (data.sucess) render = '<p id="battle-info">' + data.activeCharacterId + 'defended';
        break;

     }

});

battle.on('end', function (data) {
    console.log('END', data);

    // TODO: re-render the parties so the death of the last character gets reflected
    //*** aqui es que es lo  mismo q en render characters...
    var list = Object.keys(this._charactersById);
    var list2 = document.querySelectorAll('.character-list');
    var listHeroes = list2[0];
    var listMonsters = list2[1];
    var render;
    listHeroes.innerHTML = '';
    listMonsters.innerHTML = '';
    
    for (var character in list)
    {
        var aux = this._charactersById[list[character]];
        render = '<li data-chara-id="' + list[character] + '">'+ aux.name + ' (HP: <strong>'+ aux.hp + '</strong>/' + aux.maxHp + ',' + ' MP: <strong>' + aux.mp + '</strong>/' + aux.maxMp + ') </li>';
        if(aux.party === 'heroes'){
            listHeroes.innerHTML += render;
        }
        else listMonsters.innerHTML += render;
        
    }
    // TODO: display 'end of battle' message, showing who won
    //***
    document.getElementById("battle-info").innerHTML = "Battle ends...Game Over, Win <strong>" + data.winner + '</strong>';
    document.querySelector('form[name = end]').style.display = 'inline';
  
});

window.onload = function () {
    actionForm = document.querySelector('form[name=select-action]');
    targetForm = document.querySelector('form[name=select-target]');
    spellForm = document.querySelector('form[name=select-spell]');
    infoPanel = document.querySelector('#battle-info');

    actionForm.addEventListener('submit', function (evt) {
        evt.preventDefault();

        // TODO: select the action chosen by the player
        //***
        var election = actionForm.elements['options'].value;
        battle.options.select(election);

        // TODO: hide this menu
        //***
        actionForm.style.display='none';
        // TODO: go to either select target menu, or to the select spell menu
        //***
        if(election != 'defend'){
            actionForm.style.display = 'none';
            spellForm.style.display = 'block';
         }else{
             actionForm.style.display = 'none';
         targetForm.style.display = 'block';
    }

});

    targetForm.addEventListener('submit', function (evt) {
        evt.preventDefault();
        // TODO: select the target chosen by the player
        //***
        var election = targetForm.elements['option'].value;

        // TODO: hide this menu
        //***
        targetForm.style.display = 'none';
    });

    targetForm.querySelector('.cancel')
    .addEventListener('click', function (evt) {
        evt.preventDefault();
        // TODO: cancel current battle options
        //***
        battle.options.cancel();
        // TODO: hide this form
        //***
        targetForm.style.display = 'none';
        // TODO: go to select action menu
        //***
        actionForm.style.display = 'block';
    });

    spellForm.addEventListener('submit', function (evt) {
        evt.preventDefault();
        // TODO: select the spell chosen by the player
        //***
        var election = spellForm.elements['option'].value;
        battle.options.select(election);
        // TODO: hide this menu
        //****
        spellForm.style.display = 'none';
        // TODO: go to select target menu
        //****
        targetForm.style.display = 'block';
    });


    spellForm.querySelector('.cancel')
    .addEventListener('click', function (evt) {
        evt.preventDefault();
        // TODO: cancel current battle options
        //*** 
          battle.options.cancel();
        // TODO: hide this form
        //***
          targetForm.style.display = 'none';
        // TODO: go to select action menu
        //***
          actionForm.style.display = 'block';

    });

    battle.start();
};
