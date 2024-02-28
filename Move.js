// 충돌 위치
let PlayerBody;

// 스킬 충돌 위치;
let fireballBody;
let windBody;
let thunderBody;
let waveBody;

// 초기 위치 설정
let PlayerX = 10;
let PlayerY = 400; // Y축

const Player = document.getElementById("Player"); // 플레이어
const Damage = document.getElementById("Damage"); // 데미지

document.addEventListener("DOMContentLoaded", function() { // 캐릭터 이동, 스킬

    const fireball = document.getElementById("Skill1");
    const wind = document.getElementById("Skill2");
    const thunder = document.getElementById('Skill3');
    const wave = document.getElementById('Skill4');
    const heal = document.getElementById('heal');
    const fireballSound = document.getElementById('sound1');
    const windSound = document.getElementById('sound2');
    const thunderSound = document.getElementById('sound3');
    const waveSound = document.getElementById('sound4');
    const healSound = document.getElementById('sound5');

    // 스킬 사운드
    fireballSound.volume = 0.25;
    windSound.volume = 0.25;
    thunderSound.volume = 0.25;
    waveSound.volume = 0.25;
    healSound.volume = 0.25;
    
    // 키보드 이벤트 처리
    document.addEventListener("keydown", function(event) {

        PlayerBody = Player.getBoundingClientRect();


        // 오른쪽 화살표 키
        if (event.key === "ArrowRight" && HP > 0) {

           PlayerX += 15;
  
           if (PlayerX > 920) { /* 보스 너머 방지 */
              PlayerX = 920;
            }
        }
        // 왼쪽 화살표 키
        else if (event.key === "ArrowLeft" && HP > 0) {

            PlayerX -= 15;
  
            if (PlayerX <= 10) { /* 필드 벗어남 방지 */

               PlayerX = 10;
            }
        }
  
        // A 키 : 파이어볼 (마나 3%, 쿨 2초)
        else if (event.key === 'a' && HP > 0) {

            if (MP >= 3 && ct2 >= 2) {
                Skill_fireball();
            } else {

            }
        }
        // 윗 키 : 점프 (쿨 2초)
        else if (event.key === 'ArrowUp' && ct1 >= 2 && HP > 0) {
            
            ct1 -= 2;
            let JumpUp; // 점프
            let JumpDown; // 착지
            
            JumpUp = setInterval(function() {
                PlayerY -= 15;
                Player.style.top = PlayerY + "px";
            }, 20);

            setTimeout(function() {
                clearInterval(JumpUp);
            }, 360);

            setTimeout(function() {
                JumpDown = setInterval(function() {
                    PlayerY += 15;
                    Player.style.top = PlayerY + "px";
                }, 20);
    
                setTimeout(function() {
                    clearInterval(JumpDown);
                    PlayerY = 400;
                    Player.style.top = PlayerY + "px";
                }, 360);
            }, 500);
        }
        // Z 키 : 윈드 (마나 6%, 쿨 5초)
        else if (event.key === 'z' && HP > 0) {

            if (MP >= 6 && ct3 >= 5) {
                Skill_wind();
            } else {

            }
        }

        // X 키 : 썬더 (마나 40%, 쿨 15초)
        else if (event.key === 'x' && HP > 0) {
            
            if (MP >= 40 && ct4 >= 20) {
                Skill_thunder();
            } else {

            }
        }

        // W 키 : 웨이브 (마나 20%, 쿨 10초)
        else if (event.key === 'w' && HP > 0) {

            if (MP >= 20 && ct5 >= 10) {
                Skill_wave();
            } else {

            }
        }

        // S 키 : 힐 (마나 10%)
        else if (event.key === 's' && HP > 0) {
            if (MP >= 10 && HP < MaxHP) {
                Skill_heal();
            } else {

            }
        }

        // 캐릭터 위치 업데이트
        Player.style.left = PlayerX + "px";
        // 캐릭터 충돌 감지
        PlayerBody = Player.getBoundingClientRect();
    });

    function Skill_fireball() { // 파이어볼

        MP -= 3;
        emptyMP += 3;
        ct2 -= 2;
        let fireballX = PlayerX + 10; // 파이어볼 X축
        let fireballAtt; // 파이어볼 발사
        fireballSound.play();

        fireballAtt = setInterval(function() {
            fireball.style.display = 'block';
            fireballX += 15;
            fireball.style.left = fireballX + "px";
            setInterval(function() {
                // 스킬 충돌 감지
                fireballBody = fireball.getBoundingClientRect();
            }, 10);
        }, 20);

        setTimeout(function() {
            clearInterval(fireballAtt);
            fireballX = PlayerX + 10;
            fireball.style.display = 'none';
            // 스킬 충돌 감지
            fireballBody = fireball.getBoundingClientRect();
        }, 1000);
    }

    function Skill_wind() { // 윈드

        MP -= 6;
        emptyMP += 6;
        ct3 -= 5;
        let windX = PlayerX + 10; // 윈드 X축
        let windAtt; // 윈드 발사
        windSound.play();

        windAtt = setInterval(function() {
            wind.style.display = 'block';
            windX += 15;
            wind.style.left = windX + "px";
            setInterval(function() {
                // 스킬 충돌 감지
                windBody = wind.getBoundingClientRect();
            }, 10);
        }, 15);

        setTimeout(function() {
            clearInterval(windAtt);
            windX = PlayerX + 10;
            wind.style.display = 'none';
            // 스킬 충돌 감지
            windBody = wind.getBoundingClientRect();
        }, 1000);
    }
    
    function Skill_thunder() { // 썬더 (계수:40)

        MP -= 40;
        emptyMP += 40;
        ct4 -= 20;
        thunder.style.display = 'block';
        thunderSound.play();

        setInterval(function() {
            // 스킬 충돌 감지
            thunderBody = thunder.getBoundingClientRect();
        }, 50);

        setTimeout(function() {
            thunder.style.display = 'none';
            // 스킬 충돌 감지
            thunderBody = thunder.getBoundingClientRect();
        }, 1400);
    }

    function Skill_wave() { // 웨이브

        MP -= 20;
        emptyMP += 20;
        ct5 -= 10;
        let waveX = PlayerX + 15; // 웨이브 X축
        let waveAtt; // 웨이브 발사
        waveSound.play();

        waveAtt = setInterval(function() {
            wave.style.display = 'block';
            waveX += 8;
            wave.style.left = waveX + "px";
            setInterval(function() {
                // 스킬 충돌 감지
                waveBody = wave.getBoundingClientRect();
            }, 10);
        }, 10);

        setTimeout(function() {
            clearInterval(waveAtt);
            waveX = PlayerX + 15;
            wave.style.display = 'none';
            // 스킬 충돌 감지
            waveBody = wave.getBoundingClientRect();
        }, 1000);
    }

    function Skill_heal() { // 힐

        HP += 100; // HP 회복 100
        MP -= 10;
        emptyMP += 10;
        heal.style.display = 'block';
        heal.style.left = PlayerX + "px";
        healSound.play();

        Damage.textContent = '+100'

        setTimeout(function() {
            heal.style.display = 'none';
        }, 500);
        setTimeout(function() {
            Damage.textContent = '';
        }, 2000);
        if (HP >= MaxHP) { // HP 초과 방지
            HP = MaxHP;
        }
    }
});
