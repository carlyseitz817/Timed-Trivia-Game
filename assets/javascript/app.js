(function ($, window, undefined) {
    var quiz = {
        correctAnswers: 0,
        wrongAnswers: 0,
        currentIndex: 0,
        questions: [
            {
                question: 'How long do sugar gliders typically live in captivity?',
                choices: [
                    '3-5 years',
                    '5-8 years',
                    '1-2 years',
                    '10-15 years'
                ],
                correct: 3
            },
            {
                question: 'Newborn sugar gliders are called _________.',
                choices: [
                    'Joeys',
                    'Suglings',
                    'Spats',
                    'Marsies'
                ],
                correct: 0
            },
            {
                question: 'What noise do sugar gliders commonly make?',
                choices: [
                    'Crabbing',
                    'Barking',
                    'Hissing',
                    'All of the above'
                ],
                correct: 3
            },
            {
                question: 'What type of animal is a sugar glider?',
                choices: [
                    'Rodent',
                    'Marsupial',
                    'Flying Squirrel',
                    'All of the above'
                ],
                correct: 1
            },
            {
                question: 'What is an all-white sugar glider with black eyes called?',
                choices: [
                    'Albino',
                    'Cremino',
                    'Leucistic',
                    'Snow'
                ],
                correct: 2
            },
            {
                question: 'About how much do sugar gliders typically weigh in adulthood?',
                choices: [
                    '3-5 ounces',
                    '7-9 ounces',
                    '6-8 ounces',
                    '10-12 ounces'
                ],
                correct: 0
            },
        ],
        decreaseTime: function () {
            time--;
            $("#timer").html("<p>Time remaining: " + time + "</p>");

            if ((time === 0) && (quiz.currentIndex === (quiz.questions.length - 1))) {
                clearInterval(interval);
                alert("You're out of time! This counts as a wrong answer.");
                quiz.wrongAnswers++;
                quiz.finalResults();
            }
            else if ((time === 0) && (quiz.currentIndex < (quiz.questions.length - 1))) {
                alert("You're out of time! This counts as a wrong answer.");
                clearInterval(interval);
                quiz.wrongAnswers++;
                quiz.currentIndex++;
                quiz.init();
            }
        },

        init: function () {
            time = 10;
            $("#game-title").append("<h2><div id='timer'>")
            $("#timer").html("<p>Time remaining: " + time + "</p>");
            interval = setInterval(quiz.decreaseTime, 1000);
            $(".answer-choices").empty();
            $("#question-number").html("<p>Question " + (quiz.currentIndex + 1) + ":")
            $("#question").text(quiz.questions[quiz.currentIndex].question);
            for (i = 0; i < quiz.questions[quiz.currentIndex].choices.length; i++) {
                $(".answer-choices").append("<input type='radio' name='option' id='choice" + i + "' value=" + i + ">" + quiz.questions[quiz.currentIndex].choices[i] + '<br>');
            }
            $("#incorrect, #correct, #submit").show();
            $("#next").hide();
        },

        finalResults: function () {
            $(".quiz").html("<h1>Final Results:</h1><h2>Correct: " + quiz.correctAnswers + "</h2><h2>Incorrect: " + quiz.wrongAnswers)
        },

        theQuiz: function () {
            $("#submit").click(function () {
                // WITHOUT THIS EXTRA clearInterval LINE, THE TIMER WILL RUN FASTER
                // THAN EACH PREVIOUS QUESTION
                $("#submit").hide();
                clearInterval(interval);
                radioValue = $("input[name='option']:checked").val();
                if (radioValue == quiz.questions[quiz.currentIndex].correct) {
                    quiz.correctAnswers++;
                    $(".modal").show();
                    $("#incorrect").hide();
                }
                else {
                    quiz.wrongAnswers++;
                    $(".modal").show();
                    $("#correct").hide();
                    $("#right-answer").text(quiz.questions[quiz.currentIndex].choices[quiz.questions[quiz.currentIndex].correct])
                }

                if (quiz.currentIndex === (quiz.questions.length - 1)) {
                    clearInterval(interval);
                    $("#results").show();
                }
                else {
                    $("#next").show();
                }
            });
            
            $("#next").click(function () {
                $(".modal").hide();
                quiz.currentIndex++;
                quiz.init();
            });

            $("#results").click(function () {
                $(".modal").hide();
                quiz.finalResults();
            });

            // When enter is pressed, it clicks whatever was last clicked,
            // so this doubled the counts because it acted like submit was 
            // clicked again. To avoid this, we hide submit after its pressed
            // and don't show again until the next question is initialized.
            $(document).keyup(function(event) {
                if ((event.keyCode === 13) && ($("#next").is(":visible"))) {
                        $("#next").click();
                }
                else if ((event.keyCode === 13) && ($("#results").is(":visible"))) {
                        $("#results").click();
                }                
            });
        }
    }

    quiz.init();

    // This must be outside the init() function or it will cause a response
    // to the second question to result in two alerts, then no choices for the 3rd question,
    // which will show as question 4 -- BUT WHYYYYYYY?!?!??!?!
    quiz.theQuiz();

})($, window);