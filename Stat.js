document.addEventListener("DOMContentLoaded", function() {
    Msg.textContent = '방향키를 사용하여 좌/우 이동과 점프를 할 수 있습니다.'
    
    setInterval(function() {
        if (HP <= 0) {
            GameOver();
        }
    }, 100);
    setInterval(function() {
        if (HP > 0) {
            CombatStat();
        }
    }, 100);
    setInterval(function() {
        if (HP > 0 && BossHP > 0) {
            HPChange();
        }
    }, 500);
    setInterval(function() {
        if (HP > 0) {
            MPRecover();
        }
    }, 400);
    setInterval(function() {
        if (HP > 0) {
            cooltime();
        }
    }, 1000);

    document.addEventListener("keydown", function(event) {
        BGM.play();
    });
})
const EndA = document.getElementById('EndA');
const BGM = document.getElementById('Music'); // BGM
BGM.volume = 0.25;

 // 쿨타임 점프:2초 파이어볼:2초 윈드:5초 썬더:20초 웨이브10초
var ct1 = 2;
var ct2 = 2;
var ct3 = 5;
var ct4 = 20;
var ct5 = 10;

var DamageResult = 0 // 최종 받는 데미지
var ATT = 0
var GUARD = 0
function CombatStat() {
    ATT = Math.floor(Math.random() * (66 - 45) + 45); // 공격력 계수 (45~65)
    GUARD = Math.floor(Math.random() * (56 - 45) + 45); // 방어력 계수 (45~55)
}

var HP = 1000; // 초기 HP
var MaxHP = 1000; // 최대 HP
var FullHP = 100; // HP 백분율
var emptyHP = 0; // HP 소모량 백분율

var MP = 50; // 초기 MP
var emptyMP = 50; // MP 소모량 백분율

const PlayerHP = document.getElementById('HP');
const PlayerMP = document.getElementById('MP');
const Msg = document.getElementById('Msg'); // 알림창
const icon1 = document.getElementById('icon1'); // 스킬 아이콘 1
const icon2 = document.getElementById('icon2'); // 스킬 아이콘 2
const icon3 = document.getElementById('icon3'); // 스킬 아이콘 3
const icon4 = document.getElementById('icon4'); // 스킬 아이콘 4
const icon5 = document.getElementById('icon5'); // 스킬 아이콘 5
const Playerpng = document.getElementById("Playerpng"); // 플레이어 이미지

function GameOver() { // 플레이어 사망
    EndA.style.display = 'block';
    Playerpng.src = 'GameOver.png';
    Player.style.filter = 'brightness(50%)';
    Player.style.top = '420px';
    FullHP = (HP / 10);
    emptyHP = 100 - FullHP;
    PlayerHP.textContent = 'HP : ' + HP + ' / 1000';
    PlayerHP.style.background = 'linear-gradient(to right, #FF6666 ' + FullHP + '%, white ' + emptyHP + '%)';
}

function cooltime() {

    ct1 += 1; // 점프
    ct2 += 1; // 파이어볼
    ct3 += 1; // 윈드
    ct4 += 1; // 썬더
    ct5 += 1; // 웨이브

    let icon1_white = (50 * ct2); // 쿨타임 완료 영역
    let icon1_cooltime = 100 - icon1_white; // 쿨타임 영역
    let icon2_white = (20 * ct3);
    let icon2_cooltime = 100 - icon2_white;
    let icon3_white = (5 * ct4);
    let icon3_cooltime = 100 - icon3_white;
    let icon4_white = (10 * ct5);
    let icon4_cooltime = 100 - icon4_white;

    if (ct1 > 2) {
        ct1 = 2;
    }
    if (ct2 > 2) {
        ct2 = 2;
    }
    if (ct3 > 5) {
        ct3 = 5;
    }
    if (ct4 > 20) {
        ct4 = 20;
    }
    if (ct5 > 10) {
        ct5 = 10;
    }

    icon1.style.background = 'linear-gradient(to bottom, white ' + icon1_white + '%, #A0A0A0 ' + icon1_cooltime + '%)';
    icon2.style.background = 'linear-gradient(to bottom, white ' + icon2_white + '%, #A0A0A0 ' + icon2_cooltime + '%)';
    icon3.style.background = 'linear-gradient(to bottom, white ' + icon3_white + '%, #A0A0A0 ' + icon3_cooltime + '%)';
    icon4.style.background = 'linear-gradient(to bottom, white ' + icon4_white + '%, #A0A0A0 ' + icon4_cooltime + '%)';
}
function MPRecover() { // MP 자연회복

    MP += 1; // MP 1% 회복
    emptyMP -= 1;
    PlayerMP.textContent = 'MP : ' + MP + '%';
    PlayerMP.style.background = 'linear-gradient(to right, #66B2FF ' + MP + '%, white ' + emptyMP + '%)';

    if (MP > 99) { // 100% 초과 방지
        MP = 99;
        emptyMP = 1;
    } else if (MP <= 0) { // 0% 미만 방지
        MP = 0;
        emptyMP = 100;
    }
}

function HPChange() { // HP 변화

    FullHP = (HP / 10);
    emptyHP = 100 - FullHP;
    PlayerHP.textContent = 'HP : ' + HP + ' / 1000';
    PlayerHP.style.background = 'linear-gradient(to right, #FF6666 ' + FullHP + '%, white ' + emptyHP + '%)';

    rock1Damage(); 
    rock2Damage();
    explosion1Damage();
    explosion2Damage();
    boomDamage();
    firefield1Damage();
    firefield2Damage();
    beamDamage();
    sparkDamage();

    if (HP <= 0) { // HP 음수 방지
        HP = 0;
    }
    if (HP >= MaxHP) { // HP 초과 방지
        HP = MaxHP;
    }
}
function rock1Damage() { // 낙석 1 데미지

    DamageResult = (BossATT * 1.4) - GUARD;

    if (
        PlayerBody.right > rock1Body.left &&
        PlayerBody.left < rock1Body.right &&
        PlayerBody.bottom > rock1Body.top &&
        PlayerBody.top < rock1Body.bottom
    ) {
        HP -= DamageResult;
        Player.style.filter = 'brightness(60%)';
        Damage.textContent = '-' + DamageResult;
        setTimeout(function() {
            Player.style.filter = 'brightness(100%)';
        }, 500);
        setTimeout(function() {
            Damage.textContent = '';
        }, 1500);
        if (HP < 0) { // HP 음수 방지
            HP = 0;
        }
    }
}
function rock2Damage() { // 낙석 2 데미지

    DamageResult = (BossATT * 1.4) - GUARD;

    if (
        PlayerBody.right > rock2Body.left &&
        PlayerBody.left < rock2Body.right &&
        PlayerBody.bottom > rock2Body.top &&
        PlayerBody.top < rock2Body.bottom
    ) {
        HP -= DamageResult;
        Player.style.filter = 'brightness(60%)';
        Damage.textContent = '-' + DamageResult;
        setTimeout(function() {
            Player.style.filter = 'brightness(100%)';
        }, 500);
        setTimeout(function() {
            Damage.textContent = '';
        }, 1500);
        if (HP < 0) { // HP 음수 방지
            HP = 0;
        }
    }
}
function explosion1Damage() { // 폭발 1 데미지

    DamageResult = (BossATT * 2.1) - GUARD;

    if (
        PlayerBody.right > explosion1Body.left &&
        PlayerBody.left < explosion1Body.right &&
        PlayerBody.bottom > explosion1Body.top &&
        PlayerBody.top < explosion1Body.bottom
    ) {
        HP -= DamageResult;
        Player.style.filter = 'brightness(60%)';
        Damage.textContent = '-' + DamageResult;
        setTimeout(function() {
            Player.style.filter = 'brightness(100%)';
        }, 500);
        setTimeout(function() {
            Damage.textContent = '';
        }, 1500);
        if (HP < 0) { // HP 음수 방지
            HP = 0;
        }
    }
}
function explosion2Damage() { // 폭발 2 데미지

    DamageResult = (BossATT * 2.1) - GUARD;

    if (
        PlayerBody.right > explosion2Body.left &&
        PlayerBody.left < explosion2Body.right &&
        PlayerBody.bottom > explosion2Body.top &&
        PlayerBody.top < explosion2Body.bottom
    ) {
        HP -= DamageResult;
        Player.style.filter = 'brightness(60%)';
        Damage.textContent = '-' + DamageResult;
        setTimeout(function() {
            Player.style.filter = 'brightness(100%)';
        }, 500);
        setTimeout(function() {
            Damage.textContent = '';
        }, 1500);
        if (HP < 0) { // HP 음수 방지
            HP = 0;
        }
    }
}
function boomDamage() { // 추적 폭발 데미지

    DamageResult = (BossATT * 1.8) - GUARD;

    if (
        PlayerBody.right > boomBody.left &&
        PlayerBody.left < boomBody.right &&
        PlayerBody.bottom > boomBody.top &&
        PlayerBody.top < boomBody.bottom
    ) {
        HP -= DamageResult;
        Player.style.filter = 'brightness(60%)';
        Damage.textContent = '-' + DamageResult;
        setTimeout(function() {
            Player.style.filter = 'brightness(100%)';
        }, 500);
        setTimeout(function() {
            Damage.textContent = '';
        }, 1500);
        if (HP < 0) { // HP 음수 방지
            HP = 0;
        }
    }
}
function firefield1Damage() { // 불길 1 데미지

    DamageResult = (BossATT * 1.4) - GUARD;

    if (
        PlayerBody.right > firefield1Body.left &&
        PlayerBody.left < firefield1Body.right &&
        PlayerBody.bottom > firefield1Body.top &&
        PlayerBody.top < firefield1Body.bottom
    ) {
        HP -= DamageResult;
        Player.style.filter = 'brightness(60%)';
        Damage.textContent = '-' + DamageResult;
        setTimeout(function() {
            Player.style.filter = 'brightness(100%)';
        }, 500);
        setTimeout(function() {
            Damage.textContent = '';
        }, 1500);
        if (HP < 0) { // HP 음수 방지
            HP = 0;
        }
    }
}
function firefield2Damage() { // 불길 2 데미지

    DamageResult = (BossATT * 1.5) - GUARD;
    if (
        PlayerBody.right > firefield2Body.left &&
        PlayerBody.left < firefield2Body.right &&
        PlayerBody.bottom > firefield2Body.top &&
        PlayerBody.top < firefield2Body.bottom
    ) {
        HP -= DamageResult;
        Player.style.filter = 'brightness(60%)';
        Damage.textContent = '-' + DamageResult;
        setTimeout(function() {
            Player.style.filter = 'brightness(100%)';
        }, 500);
        setTimeout(function() {
            Damage.textContent = '';
        }, 1500);
        if (HP < 0) { // HP 음수 방지
            HP = 0;
        }
    }
}
function beamDamage() { // 레이저 데미지

    DamageResult = (BossATT * 3.7) - GUARD;

    if (
        (PlayerBody.right > beam1Body.left &&
        PlayerBody.left < beam1Body.right &&
        PlayerBody.bottom > beam1Body.top &&
        PlayerBody.top < beam1Body.bottom) ||
        (PlayerBody.right > beam2Body.left &&
        PlayerBody.left < beam2Body.right &&
        PlayerBody.bottom > beam2Body.top &&
        PlayerBody.top < beam2Body.bottom) ||
        (PlayerBody.right > beam3Body.left &&
        PlayerBody.left < beam3Body.right &&
        PlayerBody.bottom > beam3Body.top &&
        PlayerBody.top < beam3Body.bottom) ||
        (PlayerBody.right > beam4Body.left &&
        PlayerBody.left < beam4Body.right &&
        PlayerBody.bottom > beam4Body.top &&
        PlayerBody.top < beam4Body.bottom) ||
        (PlayerBody.right > beam5Body.left &&
        PlayerBody.left < beam5Body.right &&
        PlayerBody.bottom > beam5Body.top &&
        PlayerBody.top < beam5Body.bottom) ||
        (PlayerBody.right > beam6Body.left &&
        PlayerBody.left < beam6Body.right &&
        PlayerBody.bottom > beam6Body.top &&
        PlayerBody.top < beam6Body.bottom) ||
        (PlayerBody.right > beam7Body.left &&
        PlayerBody.left < beam7Body.right &&
        PlayerBody.bottom > beam7Body.top &&
        PlayerBody.top < beam7Body.bottom) ||
        (PlayerBody.right > beam8Body.left &&
        PlayerBody.left < beam8Body.right &&
        PlayerBody.bottom > beam8Body.top &&
        PlayerBody.top < beam8Body.bottom) ||
        (PlayerBody.right > beam9Body.left &&
        PlayerBody.left < beam9Body.right &&
        PlayerBody.bottom > beam9Body.top &&
        PlayerBody.top < beam9Body.bottom) ||
        (PlayerBody.right > beam10Body.left &&
        PlayerBody.left < beam10Body.right &&
        PlayerBody.bottom > beam10Body.top &&
        PlayerBody.top < beam10Body.bottom)
    ) {
        HP -= DamageResult;
        Player.style.filter = 'brightness(60%)';
        Damage.textContent = '-' + DamageResult;
        setTimeout(function() {
            Player.style.filter = 'brightness(100%)';
        }, 500);
        setTimeout(function() {
            Damage.textContent = '';
        }, 1500);
        if (HP < 0) { // HP 음수 방지
            HP = 0;
        }
    }
}
function sparkDamage() { // 전기장 
    if (
        PlayerBody.right > sparkBody.left &&
        PlayerBody.left < sparkBody.right &&
        PlayerBody.bottom > sparkBody.top &&
        PlayerBody.top < sparkBody.bottom
    ) {
        MP -= 3; // 피격 시 마나 감소
        emptyMP += 3;
        ct1 = 0; // 피격 시 점프 불가

        PlayerMP.textContent = 'MP : ' + MP + '%';
        PlayerMP.style.background = 'linear-gradient(to right, #66B2FF ' + MP + '%, white ' + emptyMP + '%)';

        if (MP > 99) { // 100% 초과 방지
            MP = 99;
            emptyMP = 1;
        } else if (MP <= 0) { // 0% 미만 방지
            MP = 0;
            emptyMP = 100;
        }
    }
}