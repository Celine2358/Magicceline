document.addEventListener("DOMContentLoaded", function() {

    GolemChange();
    // HP 1% ~ 100%
    setInterval(function() {
        if (BossHP <= 100000 && BossHP > 0) {
            boss_rock1();
        }
    }, 3500);
    setInterval(function() {
        if (BossHP <= 100000 && BossHP > 0) {
            boss_rock2();
        }
    }, 4500);
    // HP 71% ~ 85%
    setInterval(function() { 
        if (BossHP <= 85000 && BossHP > 50000) {
            boss_explosion1();
        }
    }, 10000);
    setInterval(function() {
        if (BossHP <= 85000 && BossHP > 50000) {
            boss_explosion2();
        }
    }, 12000);
    setInterval(function() {
        if (BossHP <= 85000 && BossHP > 70000 && PatternA == 0) {
            BossHP_85();
        }
    }, 1000);

    // HP 61% ~ 70%
    setInterval(function() {
        if (BossHP <= 70000 && BossHP > 50000) {
            targetBoom();
        }
    }, 15000);
    setInterval(function() {
        if (BossHP <= 70000 && BossHP > 60000 && PatternB == 0) {
            BossHP_70();
        }
    }, 1000);
    // HP 51% ~ 60%
    setInterval(function() {
        if (BossHP <= 60000 && BossHP > 20000) {
            boss_beam();
        }
    }, 20000);
    setInterval(function() {
        if (BossHP <= 60000 && BossHP > 50000 && PatternC == 0) {
            BossHP_60();
        }
    }, 1000);
    // HP 34% ~ 50%
    setInterval(function() { 
        if (BossHP <= 50000 && BossHP > 0) {
            boss_explosion1();
        }
    }, 6000);
    setInterval(function() {
        if (BossHP <= 50000 && BossHP > 0) {
            boss_explosion2();
        }
    }, 9000);
    setInterval(function() {
        if (BossHP <= 50000 && BossHP > 20000) {
            targetBoom();
        }
    }, 13000);
    setInterval(function() {
        if (BossHP <= 50000 && BossHP > 33000 && PatternD == 0) {
            BossHP_50();
        }
    }, 1000);
    // HP 21% ~ 33%
    setInterval(function() { 
        if (BossHP <= 33000 && BossHP > 20000) {
            boss_spark();
        }
    }, 12000);
    setInterval(function() {
        if (BossHP <= 33000 && BossHP > 20000 && PatternE == 0) {
            BossHP_33();
        }
    }, 1000);
    // HP 1% ~ 20%
    setInterval(function() {
        if (BossHP <= 20000 && BossHP > 0) {
            targetBoom();
        }
    }, 9000);
    setInterval(function() { 
        if (BossHP <= 20000 && BossHP > 0) {
            boss_spark();
        }
    }, 10000);
    setInterval(function() {
        if (BossHP <= 20000 && BossHP > 0) {
            boss_beam();
        }
    }, 16000);
    setInterval(function() {
        if (BossHP <= 20000 && BossHP > 0 && PatternF == 0) {
            BossHP_20();
        }
    }, 1000);
    // HP 0%
    setInterval(function() {
        if (BossHP <= 0 && Die == 0) {
            GolemDie();
        }
    }, 1000);
})
const EndB = document.getElementById('EndB');

let rock1Body; // 낙석 1 위치 정보
let rock2Body; // 낙석 2 위치 정보
let firefield1Body; // 불길 1 위치 정보
let firefield2Body; // 불길 2 위치 정보
let explosion1Body; // 폭발 1 위치 정보
let explosion2Body; // 폭발 2 위치 정보
let boomBody; // 추적 폭발 위치 정보
// 레이저 위치 정보
let beam1Body;
let beam2Body; 
let beam3Body; 
let beam4Body; 
let beam5Body; 
let beam6Body; 
let beam7Body; 
let beam8Body; 
let beam9Body; 
let beam10Body; 

// 전기장 위치정보
let sparkBody;

let firefieldSound = document.getElementById('sound_firefield');
let sparkSound = document.getElementById('sound_sp');
let GolemImg = document.getElementById('GolemImg'); // 골렘 이미지
const GolemDamage = document.getElementById("BossDamage"); // 데미지
const BossDie = document.getElementById('BossDie'); // 보스 골렘 사망

var FG = 0; // 골렘 Fire 모드 (0:노말 1:Fire)
var Die = 0; // 골렘 사망

var PatternA = 0; // 85%
var PatternB = 0; // 70%
var PatternC = 0; // 60%
var PatternD = 0; // 50%
var PatternE = 0; // 33%
var PatternF = 0; // 20%

firefieldSound.volume = 0.3;
sparkSound.volume = 0.3;

function BossHP_85() { // 골렘 HP 85000
    Msg.textContent = '위협을 느낀 고대의 골렘이 주기적으로 폭발을 일으킵니다.';
    setTimeout(function() {
        PatternA = 1;
        Msg.textContent = '';
    }, 7000)
}
function BossHP_70() { // 골렘 HP 70000
    Msg.textContent = '당신을 추적하는 폭발이 일어나고 불길에 피해를 입습니다.';
    setTimeout(function() {
        PatternB = 1;
        Msg.textContent = '';
    }, 7000)
}
function BossHP_60() { // 골렘 HP 60000
    Msg.textContent = '고대의 골렘이 강력한 레이저를 발사합니다';
    setTimeout(function() {
        PatternC = 1;
        Msg.textContent = '';
    }, 7000)
}
function BossHP_50() { // 골렘 HP 50000
    Msg.textContent = '고대의 골렘이 분노하여 폭발이 자주 일어납니다.';
    setTimeout(function() {
        PatternD = 1;
        Msg.textContent = '';
    }, 7000)
}
function BossHP_33() { // 골렘 HP 33000
    Msg.innerHTML = '고대의 섬을 수호하기 위해 <span style="color: blue;">최비령의 전기장</span>이 발생합니다.';
    setTimeout(function() {
        PatternE = 1;
        Msg.textContent = '';
    }, 7000)
}
function BossHP_20() { // 골렘 HP 20000
    Msg.innerHTML = '<span style="color: red;">고대의 골렘이 매우 분노하여 공격력과 방어력이 증가합니다.</span>';
    setTimeout(function() {
        PatternF = 1;
        Msg.textContent = '';
    }, 7000)
}

function GolemDie() { // 골렘 HP 0 사망
    GolemImg.style.display = 'none';
    BossDie.style.display = 'block';
    document.getElementById('BossUI').style.display = 'none';
    setTimeout(function() {
        BossDie.style.display = 'none';
        Die = 1;
        EndB.style.display = 'block';
        BGM.pause();
    }, 2000);
}

function boss_rock1() { // 보스 스킬 : 낙석1

    const rock1 = document.getElementById('boss_rock1');
    const rock1Img = document.getElementById('rock1Img'); // 낙석 1 이미지
    const firefield1 = document.getElementById('firefield1'); // 불길
    rock1Body = rock1.getBoundingClientRect();
    firefield1Body = firefield1.getBoundingClientRect();

    let rockY = 8; // 낙석 초기 높이
    let rockX = Math.floor(Math.random() * (920 - 8 + 1)) + 8; // 낙석 X축 난수
    let rockDrop;

    if (FG == 1) { // Fire 모드
        rock1Img.src = "fire.gif";
    } else {
        rock1Img.src = 'rock.png';
    }

    rockDrop = setInterval(function() {
        rock1.style.display = 'block';
        rockY += 10;
        rock1.style.left = rockX + 'px';
        rock1.style.top = rockY + 'px';

        // 위치 업데이트
        rock1Body = rock1.getBoundingClientRect();
    }, 80);

    setTimeout(function() {
        clearInterval(rockDrop);
        rock1.style.display = 'none';
        if (FG == 1) {
            firefieldAdd1();
        }
    }, 3500);

    function firefieldAdd1() {
        firefield1.style.display = 'block';
        firefield1.style.left = (rockX - 8) + 'px';
        firefieldSound.play();
        setInterval(function() {
            // 위치 업데이트
            firefield1Body = firefield1.getBoundingClientRect();
        }, 100);
        setTimeout(function() {
            firefield1.style.display = 'none';
        }, 5000);
    }
}
function boss_rock2() { // 보스 스킬 : 낙석2

    const rock2 = document.getElementById('boss_rock2');
    const rock2Img = document.getElementById('rock2Img'); // 낙석 2 이미지
    const firefield2 = document.getElementById('firefield2'); // 불길
    rock2Body = rock2.getBoundingClientRect();
    firefield2Body = firefield2.getBoundingClientRect();

    let rockY = 8; // 낙석 초기 높이
    let rockX = Math.floor(Math.random() * (920 - 8 + 1)) + 8; // 낙석 X축 난수
    let rockDrop;

    if (FG == 1) { // Fire 모드
        rock2Img.src = "fire.gif";
    } else {
        rock2Img.src = 'rock.png';
    }

    rockDrop = setInterval(function() {
        rock2.style.display = 'block';
        rockY += 10;
        rock2.style.left = rockX + 'px';
        rock2.style.top = rockY + 'px';

        // 위치 업데이트
        rock2Body = rock2.getBoundingClientRect();
    }, 80);

    setTimeout(function() {
        clearInterval(rockDrop);
        rock2.style.display = 'none';

        if (FG == 1) {
            firefieldAdd2();
        }
    }, 3500);

    function firefieldAdd2() {
        firefield2.style.display = 'block';
        firefield2.style.left = (rockX - 8) + 'px';
        firefieldSound.play();
        setInterval(function() {
            // 위치 업데이트
            firefield2Body = firefield2.getBoundingClientRect();
        }, 100);
        setTimeout(function() {
            firefield2.style.display = 'none';
        }, 5000);
    }
}
function boss_explosion1() { // 보스 스킬 : 폭발1

    const warn1 = document.getElementById('warn1');
    const ex1 = document.getElementById('explosion1');
    const exSound = document.getElementById('sound_ex');
    let explosionX = Math.floor(Math.random() * (920 - 8 + 1)) + 8; // 예고 및 폭발 X축 난수

    exSound.volume = 0.25;

    warn1.style.left = (explosionX + 62) + 'px';
    warn1.style.display = 'block';
    setTimeout(function() {
        warn1.style.display = 'none';
        ex1.style.left = explosionX + 'px';
        ex1.style.display = 'block';
        exSound.play();
        setInterval(function() {
            // 위치 업데이트
            explosion1Body = ex1.getBoundingClientRect();
        }, 100);
    }, 1200);
    setTimeout(function() {
        ex1.style.display = 'none';
    }, 1900);
}
function boss_explosion2() { // 보스 스킬 : 폭발2

    const warn2 = document.getElementById('warn2');
    const ex2 = document.getElementById('explosion2');
    const exSound = document.getElementById('sound_ex');
    let explosionX = Math.floor(Math.random() * (920 - 8 + 1)) + 8; // 예고 및 폭발 X축 난수

    exSound.volume = 0.25;

    warn2.style.left = (explosionX + 62) + 'px';
    warn2.style.display = 'block';
    setTimeout(function() {
        warn2.style.display = 'none';
        ex2.style.left = explosionX + 'px';
        ex2.style.display = 'block';
        exSound.play();
        setInterval(function() {
            // 위치 업데이트
            explosion2Body = ex2.getBoundingClientRect();
        }, 100);
    }, 1200);
    setTimeout(function() {
        ex2.style.display = 'none';
    }, 1900);
}
function targetBoom() { // 보스 스킬 : 추적 폭발

    const target = document.getElementById('target');
    const boom = document.getElementById('boom');
    const targetSound = document.getElementById('sound_target');
    const boomSound = document.getElementById('sound_boom');
    targetSound.volume = 0.25;
    boomSound. volume = 0.25;

    targetSound.play();

    setInterval(function() {
        target.style.left = (PlayerX + 70 - 75) + 'px';
        boom.style.left = (PlayerX - 75) + 'px';
    }, 2000);
    target.style.display = 'block';

    setTimeout(function() {
        target.style.display = 'none';
        boom.style.display = 'block';
        boomSound.play();
        setInterval(function() {
            // 위치 업데이트
            boomBody = boom.getBoundingClientRect();
        }, 100);
    }, 5000);
    setTimeout(function() {
        boom.style.display = 'none';
    }, 5500);

}
function boss_beam() { // 보스 스킬 : 레이저

    const charging = document.getElementById('charging');
    const beam1 = document.getElementById('beam1');
    const beam2 = document.getElementById('beam2');
    const beam3 = document.getElementById('beam3');
    const beam4 = document.getElementById('beam4');
    const beam5 = document.getElementById('beam5');
    const beam6 = document.getElementById('beam6');
    const beam7 = document.getElementById('beam7');
    const beam8 = document.getElementById('beam8');
    const beam9 = document.getElementById('beam9');
    const beam10 = document.getElementById('beam10');
    const chargeSound = document.getElementById('sound_charge');
    const beamSound = document.getElementById('sound_beam');

    chargeSound.volume = 0.3;
    beamSound.volume = 0.25;

    charging.style.display = 'block';
    chargeSound.play();

    setTimeout(function() {
        charging.style.display = 'none';
        beam1.style.display = 'block';
        beam2.style.display = 'block';
        beam3.style.display = 'block';
        beam4.style.display = 'block';
        beam5.style.display = 'block';
        beam6.style.display = 'block';
        beam7.style.display = 'block';
        beam8.style.display = 'block';
        beam9.style.display = 'block';
        beam10.style.display = 'block';
        beamSound.play();
        setInterval(function() {
            // 위치 업데이트
            beam1Body = beam1.getBoundingClientRect();
            beam2Body = beam2.getBoundingClientRect();
            beam3Body = beam3.getBoundingClientRect();
            beam4Body = beam4.getBoundingClientRect();
            beam5Body = beam5.getBoundingClientRect();
            beam6Body = beam6.getBoundingClientRect();
            beam7Body = beam7.getBoundingClientRect();
            beam8Body = beam8.getBoundingClientRect();
            beam9Body = beam9.getBoundingClientRect();
            beam10Body = beam10.getBoundingClientRect();
        }, 50);
    }, 5000);
    setTimeout(function() {
        beam1.style.display = 'none';
        beam2.style.display = 'none';
        beam3.style.display = 'none';
        beam4.style.display = 'none';
        beam5.style.display = 'none';
        beam6.style.display = 'none';
        beam7.style.display = 'none';
        beam8.style.display = 'none';
        beam9.style.display = 'none';
        beam10.style.display = 'none';
    }, 5600);
}
function boss_spark() {
    const spark = document.getElementById('spark');

    let RandomX = Math.floor(Math.random() * 2) // 0또는 1
    let sparkX = Math.floor(Math.random() * (920 - 8 + 1)) + 8; // 전기장 X축 난수

    if (RandomX == 0) {
        spark.style.left = sparkX + 'px';
    } else {
        spark.style.left = PlayerX + 'px';
    }

    spark.style.display = 'block';
    sparkSound.play();
    setInterval(function() {
        // 위치 업데이트
        sparkBody = spark.getBoundingClientRect();
    }, 50);
    setTimeout(function() {
        spark.style.display = 'none';
    }, 6000);
}

function GolemChange() { // 골렘 변화
    NormalGolem();

    function NormalGolem() { // 골렘 정상화
        FG = 0;
        GolemImg.src = 'BossGolem.gif'
        setTimeout(FireGolem, 30000);
        Msg.innerHTML = '';
    }
    function FireGolem() { // 골렘 Fire 모드
        FG = 1;
        GolemImg.src = 'BossGolem_Fire.gif';
        Msg.innerHTML = '고대의 골렘이 <span style="color: red;">불에 면역을 가집니다!</span>';
        setTimeout(NormalGolem, 30000);
    }
}
