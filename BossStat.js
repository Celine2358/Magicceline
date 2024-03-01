document.addEventListener("DOMContentLoaded", function() {
    setInterval(function() {
        BossStats();
    }, 100);
    setInterval(function() {
        if (BossHP > 0) {
            BossHPChange();
        }
    }, 500);
})

let BossHP = 100000; // 보스 HP
let BossMaxHP = 100000; // 보스 최대 HP
let BossFullHP = 100; // HP 백분율
let BossEmptyHP = 0; // HP 소모량 백분율

const HPBar = document.getElementById('BossHP');
var DeBuff1 = 0; // 공격력 감소(0:False 1:True)
var BossATT = 0;
var BossGUARD = 0;
let BonusDamage = 0;
let BossDamage = 0; // 보스가 받는 최종 데미지

function BossStats() {
    BossATT = 50 - (DeBuff1 * 10); // 보스 공격력 계수
    BossGUARD = 50; // 보스 방어력 계수
    BonusDamage = Math.floor(Math.random() * 10); // 추가 데미지 (0~9)

    if (BossHP <= 20000 && BossHP > 0) {
        BossATT = 70 - (DeBuff1 * 10); // 보스 공격력 계수
        BossGUARD = 70; // 보스 방어력 계수
    }
}

let BossG = document.getElementById('Golem'); // 보스 골렘
let BossBody;
// 보스 충돌 감지
BossBody = BossG.getBoundingClientRect();

const swordbreak = document.getElementById('BossDebuff');

function BossHPChange() { // 보스 HP 변화

    BossFullHP = (BossHP / 1000);
    BossEmptyHP = 100 - BossFullHP;
    HPBar.textContent = 'HP : ' + BossHP + ' (' + BossFullHP + '%)';
    HPBar.style.background = 'linear-gradient(to right, #FF6666 ' + BossFullHP + '%, white ' + BossEmptyHP + '%)';

    fireballDamage();
    windDamage();
    thunderDamage();
    waveDamage();

    if (BossHP <= 0) { // HP 음수 방지
        BossHP = 0;
    }
    if (BossHP >= BossMaxHP) { // HP 초과 방지
        BossHP = BossMaxHP;
    }
}
function fireballDamage() { // 파이어볼 피격

    BossDamage = ((ATT * 6 + BonusDamage) - BossGUARD) - (FG * 150); // 계수 6 (Fire모드 일때 데미지 150만큼 감소)
    if (
        BossBody.right > fireballBody.left &&
        BossBody.left < fireballBody.right &&
        BossBody.bottom > fireballBody.top &&
        BossBody.top < fireballBody.bottom
    ) {

        BossHP -= BossDamage;

        GolemDamage.textContent = '-' + BossDamage;
        setTimeout(function() {
            GolemDamage.textContent = '';
        }, 800);
        if (BossHP <= 0) { // HP 음수 방지
            BossHP = 0;
        }
    }
}
function windDamage() { // 윈드 피격

    BossDamage = (ATT * 14 + (BonusDamage + 30)) - BossGUARD; // 계수 14
    if (
        BossBody.right > windBody.left &&
        BossBody.left < windBody.right &&
        BossBody.bottom > windBody.top &&
        BossBody.top < windBody.bottom
    ) {

        BossHP -= BossDamage;

        GolemDamage.textContent = '-' + BossDamage;
        setTimeout(function() {
            GolemDamage.textContent = '';
        }, 800);
        if (BossHP <= 0) { // HP 음수 방지
            BossHP = 0;
        }
    }
}
function thunderDamage() { // 썬더 피격
    BossDamage = (ATT * 23 + BonusDamage) - BossGUARD; // 계수 23
    if (
        BossBody.right > thunderBody.left &&
        BossBody.left < thunderBody.right &&
        BossBody.bottom > thunderBody.top &&
        BossBody.top < thunderBody.bottom
    ) {
        BossHP -= BossDamage;
        DeBuff1 = 1; // 공격력 감소 디버프
        swordbreak.style.display = 'block';

        GolemDamage.textContent = '-' + BossDamage;
        setTimeout(function() {
            GolemDamage.textContent = '';
        }, 800);
        setTimeout(function() {
            DeBuff1 = 0;
            swordbreak.style.display = 'none';
        }, 15000);
        if (BossHP <= 0) { // HP 음수 방지
            BossHP = 0;
        }
    }
}
function waveDamage() { // 웨이브 피격

    BossDamage = (ATT * 16 + BonusDamage) * (FG + 1) - BossGUARD; // 계수 16 (Fire 모드 일때 데미지 2배)
    if (
        BossBody.right > waveBody.left &&
        BossBody.left < waveBody.right &&
        BossBody.bottom > waveBody.top &&
        BossBody.top < waveBody.bottom
    ) {

        BossHP -= BossDamage;

        GolemDamage.textContent = '-' + BossDamage;
        setTimeout(function() {
            GolemDamage.textContent = '';
        }, 800);
        if (BossHP <= 0) { // HP 음수 방지
            BossHP = 0;
        }
    }
}