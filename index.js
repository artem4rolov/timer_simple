const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  return (seconds) => {
    const timerId = setInterval(() => {
      // останавливаем таймер, если секунд <= 0
      if (seconds <= 0) {
        clearInterval(timerId);
      }

      // если вдруг запустили новый таймер - останавливаем предыдущий
      buttonEl.addEventListener("click", () => {
        clearInterval(timerId);
      });

      // склонение числительных
      function declensionNum(num, words) {
        return words[
          num % 100 > 4 && num % 100 < 20
            ? 2
            : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]
        ];
      }

      // добавляем нолик, если значение от 0 до 9
      function addZero(num) {
        if (num < 10 && num > 0) {
          return `0${num}`;
        }

        return num;
      }

      // часы
      let hours = Math.floor(seconds / 3600);
      // минуты
      let min = Math.floor((seconds / 60) % 60);
      // секунды
      let sec = seconds % 60;
      // формат таймера
      // console.log(`Секунд - ${sec}, Минут - ${min}, Часов - ${hours}`);
      timerEl.innerHTML = `${addZero(hours)}:${addZero(min)}:${addZero(
        sec
      )} - ${hours} ${declensionNum(hours, [
        "час",
        "часа",
        "часов",
      ])}, ${min} ${declensionNum(min, [
        "минута",
        "минуты",
        "минут",
      ])}, ${sec} ${declensionNum(sec, ["секунда", "секунды", "секунд"])}`;
      seconds--;
    }, 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener("input", (e) => {
  // можно с помощью регулярки,
  // можно дать тип для input как "number", вместо "text", и стилями убрать стрелочки увеличения и уменьшения
  return (e.target.value = e.target.value.replace(/\D/g, ""));
  // Очистите input так, чтобы в значении
  // оставались только числа
});

buttonEl.addEventListener("click", () => {
  const seconds = Number(inputEl.value);

  // проверяем, что в input не 0
  if (seconds > 0) {
    timerEl.innerHTML = "hh:mm:ss";
    animateTimer(seconds);
  }

  inputEl.value = "";
});
