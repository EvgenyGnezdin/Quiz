'use strict'
const questions = [
    {
        question: 'Раздел науки о языке изучающий правила?',
        answers: ['Орфография', 'Пунктуация', 'Семантика', 'Лексика'],
        correct: 1
    },
    {
        question: 'Третья столица России?',
        answers: ['Новгород', 'Екатеринбург', 'Казань', 'Уфа'],
        correct: 3
    },    
    {
        question: 'Какой праздник отмечают 1 сентября в России?',
        answers: ['Новый год', 'Пасху', 'День Защитника Отечества', 'День знаний'],
        correct: 4
    },
    {
        question: 'Кто автор "Горе от ума"?',
        answers: ['Пушкин', 'Тургенев', 'Грибоедов', 'Пастернак'],
        correct: 3
    }
]

const headerQuestions = document.querySelector('.window__header');
const listQuestions = document.querySelector('#list');
const buttonQuestions = document.querySelector('#submit');

let score = 0;
let questionIndex = 0;

//Очищем шаблон HTML
function clearHTML () {
    headerQuestions.innerHTML = '';
    listQuestions.innerHTML = '';
}

//Функция показа карточек с вопросами
function showQuestion () {
    //Вывод вопроса на страницу
    const headerTemplate = `<h2 class="window__title">%title%</h2>`;
    const title = headerTemplate.replace('%title%', questions[questionIndex].question)
    headerQuestions.innerHTML = title;
    //Вывод ответов на страницу
    questions[questionIndex].answers.forEach((item, i) => {
        const questionTemplate = `
            <li>
                <label>
                    <input value="%number%" type="radio" class="window__answer" name="answer">
                    <span>%answers%</span>
                </label>
            </li>
            `;
        let answer = questionTemplate.replace('%answers%', item);
        //Вместо number подставляем порядковый номер вопроса
        answer = answer.replace('%number%', (i + 1));
        //Прибавляем в верстку по 1му элементу и выводим  
        listQuestions.innerHTML += answer;  
  
    })
}

//Функция проверки ответа и добавлея счета
function checkBtn () {
    //Находим активную кнопку
    let checkedInput = listQuestions.querySelector('input[type="radio"]:checked');
    //Проверяем нажата ли радио кнопка
    if (!checkedInput) {
        //Запускаем return и завершаем работу функции
        buttonQuestions.blur();
        return   
    }
    //Получаем value из инпута и переводим его в числовой тип данных
    const userAnswer = parseInt(checkedInput.value);
    //Проверяем соответствует ли value выбранной кнопки ответу из массива с вопросами  
    if (userAnswer === questions[questionIndex]['correct']){
        //Если условие выполнено то увеличиваем счет на 1 очко
        score++;
        console.log(score)
    }
    //Проверяем последний ли это вопрос сравнивая индекс текущего вопроса и индекс послднего вопроса
    if(questionIndex !== (questions.length - 1)){
        //Увеличиваем индекс вопросов на 1
         questionIndex++;
         //Очищаем разметку страницы
         clearHTML();
         //Запускаем функцию отображения новой карточки с вопросом
         showQuestion();
         //Данная функция отобразить новый вопрос, так как мы увеличи индекс 1 
    } else {
        clearHTML();
        showResults();
    }
}

//Функция показа результатов
function showResults() {
    const resultTemplate = `    
        <h2 class="title">%title%</h2>
        <h3 class="summary">%message%</h3>
        <p class="result">%result%</p>
    ` 
    let title, message;
    //Формируем ответы исходя из колличества очков набраных пользователем
    if (score === questions.length){
        title = 'Поздравляем! 🤟';
        message = 'Вы ответили верно на все вопросы! 🥳';
    } else if (score >= (questions.length / 2)) {
        title = 'Хорошо!';
        message = 'Вы ответили на половину или более вопросов! 🤠'
    } else {
        title = 'Стоит посторатьcя(((';
        message = 'Пока у вас меньше половины правильных ответов🥺';
    }
    //Переноси данные в результат и выводим его на экран
    let result = `${score} из ${questions.length}`;
    const finalMessage = resultTemplate.replace("%title%", title).replace('%message%', message).replace('%result%', result);
    listQuestions.innerHTML = finalMessage;
    buttonQuestions.blur();
    buttonQuestions.innerText = 'Играть снова';
    //Данный метод равносилен обновлению страницы и тем самым мы снова начинаем игру
    buttonQuestions.onclick = () => history.go();
}

//При клике на кнопку запускаем функцию
buttonQuestions.onclick = checkBtn;

clearHTML();

showQuestion();