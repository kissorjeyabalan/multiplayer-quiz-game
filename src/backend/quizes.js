const quizzes = [
    {
        "topic": "Norway",
        "questions": [
            {
                "question": "What is the capital of Norway?",
                "answers": [
                    "Oslo",
                    "Trondheim",
                    "Ålesund",
                    "Bergen"
                ],
                "correctAnswer": 0
            },
            {
                "question": "What is the currenct in Norway?",
                "answers": [
                    "Euro",
                    "Krone",
                    "Pound",
                    "Dollar"
                ],
                "correctAnswer": 1
            },
            {
                "question": "Norway is not a member of ",
                "answers": [
                    "The European Union",
                    "North Atlantic Treaty Organization",
                    "World Trade Organization",
                    "International Organization for Standardization"
                ],
                "correctAnswer": 0
            },
            {
                "question": "In 1905, which country did Norway become officially independent from?",
                "answers": [
                    "Great Britain",
                    "Denmark",
                    "Sweden",
                    "Finland"
                ],
                "correctAnswer": 2
            },
            {
                "question": "The indigenous people of Norway are known as",
                "answers": [
                    "Maya",
                    "Basque",
                    "Ojibew",
                    "Sami"
                ],
                "correctAnswer": 3
            },
            {
                "question": "In 1905, which country did Norway become officially independent from?",
                "answers": [
                    "Great Britain",
                    "Denmark",
                    "Sweden",
                    "Finland"
                ],
                "correctAnswer": 2
            },
            {
                "question": "Which of the following is most rude according to Norwegian social codes?",
                "answers": [
                    "Getting drunk in front of your superiors",
                    "Leaving a party without saying goodbye",
                    "Talking to a stranger sitting next to you on a bus",
                    "Not talking to anyone"
                ],
                "correctAnswer": 2
            }
        ]
    },
    {
        "topic": "ReactJS",
        "questions": [
            {
                "question": "JSX is typesafe",
                "answers": [
                    "True",
                    "False"
                ],
                "correctAnswer": 0
            },
            {
                "question": "Which is the smallest building block in ReactJS?",
                "answers": [
                    "None of these",
                    "Props",
                    "Components",
                    "Elements"
                ],
                "correctAnswer": 3
            },
            {
                "question": "In React state can be accessed using",
                "answers": [
                    "current",
                    "state",
                    "current()",
                    "state()"
                ],
                "correctAnswer": 1
            },
            {
                "question": "How can we prevent default behavior in React?",
                "answers": [
                    "None of these",
                    "revokeDefault()",
                    "preventDefault()",
                    "avoidDefault()"
                ],
                "correctAnswer": 2
            },
            {
                "question": "Invoked only once on the client, after rendering",
                "answers": [
                    "componentDidMount",
                    "componentWillMount",
                    "shouldComponentUpdate",
                    "componentWillUnmount"
                ],
                "correctAnswer": 0
            },
            {
                "question": "Lifecycle methods are mainly used to..",
                "answers": [
                    "Keep track of event history",
                    "To enhance components",
                    "Free up resources",
                    "None of these"
                ],
                "correctAnswer": 2
            },
        ]
    }
];

function getRandomQuiz() {
    return quizzes[Math.floor(Math.random()*quizzes.length)];
}

module.exports = {getRandomQuiz};