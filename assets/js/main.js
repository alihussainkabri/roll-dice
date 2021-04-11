/*
window.onload = function () {
    document.getElementById('my_audio').play();
}
*/
function toggleNextScreen() {
    const player_name = $('#name-val').val();
    if (player_name) {
        $('#first-screen').hide();
        $('.sound-img_1').hide();
        $('#game-over-div').hide();
        $('#player-box-name').html(player_name);
        $('#second-screen').show();
        document.getElementById('player-turn').style.visibility = 'hidden';
        showTextMessage("It's your turn. Roll the dice!");
        document.getElementById("audioGo").play();
    } else {
        alert('Enter player name');
    }
}
function changeSound(e) {
    let current_state = $(e).data('type');

    if (current_state == 'play') {
        document.getElementById('startAudio').muted = true;
        $('#img-footer').html(`<img src="./assets/images/mute.png" data-type='mute' onclick="changeSound(this)" alt="sound-on">`);
        $('#img-footer1').html(`<img src="./assets/images/mute.png" data-type='mute' onclick="changeSound(this)" alt="sound-on">`);
    } else if (current_state == 'mute') {
        document.getElementById('startAudio').muted = false;
        $('#img-footer').html(`<img src="./assets/images/sound.png" data-type='play' onclick="changeSound(this)" alt="sound-on">`);
        $('#img-footer1').html(`<img src="./assets/images/sound.png" data-type='play' onclick="changeSound(this)" alt="sound-on">`);
    }
}

function startRoll(e) {
    enabledKey = false;
    turnCount++;

    if (turn == 'user') {
        showTextMessage("");
        document.getElementById('player-turn').style.visibility = 'visible';
        $('#player-turn-count').text(turnCount);
    }
    else {
        showTextMessage("It's the computer's turn.");
        document.getElementById('comp-turn').style.visibility = 'visible';
        $('#comp-turn-count').text(turnCount);
    }

    // animation logic
    document.getElementById('roll-btn').style.visibility = 'hidden';
    document.getElementById('mainCanvas').style.visibility = 'hidden';
    document.getElementById('mainCanvas').style.visibility = 'visible';

    initCube();
    $('#h2-second').show();
}

function glowScore(index_val) {
    var el = document.getElementById(`score-${index_val}`);
    $('.footer-score').removeClass('blink-BG');
    $(el).addClass('blink-BG');
    setTimeout(() => {
        $(el).removeClass('blink-BG');
    }, 10000);
}

function stopGlow(index_val){
    var el = document.getElementById(`score-${index_val}`);
    $(el).removeClass('blink-BG');
}

function addTextName(e) {
    const name = $(e).val();
    if (name) {
        $('#play-btn').attr('disabled', false).removeClass('disable').addClass('active');
    } else {
        $('#play-btn').attr('disabled', true).removeClass('active').addClass('disable');
    }
}

function submitForm(e) {
    var keyCode = e.keyCode ? e.keyCode : e.which;
    if (keyCode == 13) {
        toggleNextScreen();
    }
}

function playMusic(e) {
    var time = $(e).data('time');

    if (time == 0) {
        document.getElementById('startAudio').play();
        $(e).data('time', 1);
    }

}


function disableRollBtn(){
    $('#roll-btn').attr('disabled',true).removeClass('roll-btn-active').addClass('roll-btn-disable');
}

function enableRollBtn(){
    $('#roll-btn').attr('disabled',false).removeClass('roll-btn-disable').addClass('roll-btn-active');
}