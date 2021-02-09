const captcha = document.getElementById('captcha');
const answer = document.getElementById("answer");
const score = document.getElementById('score');
const countdown = document.getElementById("countdown");
const start = document.getElementById("btn-start");

let captchaShow = 0;
let finalScore = 0;
countdown.innerText = "Please Press Start"
answer.disabled = true;

function makeCaptcha(length) {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function timer() {
    start.disabled = true
    score.innerText = ""
    let timeleft = 3;
    let countTimer = setInterval(function() {
    if (timeleft <= 0) {
        clearInterval(countTimer);
        countdown.innerText = "GO!!!";
        captcha.innerText = makeCaptcha(5);
        answer.disabled = false;
        answer.focus();
        let times = setInterval(function() { 
            if (captchaShow === 9) {
                score.innerText = `Final Score : ${finalScore}`
                captchaShow = 0;
                finalScore = 0;
                countdown.innerText = "TIMES UP";
                clearInterval(times);
                answer.value = ""
                answer.disabled = true;
                start.disabled = false
                start.innerText = "Try Again"
                return captcha.innerText = "";
            } else {
                captchaShow++;
                answer.value = ""
                return captcha.innerText = makeCaptcha(5);
            }
        }, 3000);
    } else {
        countdown.innerText = timeleft;
    }
    timeleft -= 1;
    }, 1000);

}

function scoreCount() {
    if (captcha.innerText === answer.value) {
        finalScore += 10;
        answer.value = ""
    }
    return finalScore;
}

answer.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
        scoreCount();
    }
});
