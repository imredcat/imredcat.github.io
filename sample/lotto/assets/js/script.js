document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Display Latest Winning Numbers ---
    const latestNumbers = {
        winning: [1, 12, 16, 19, 23, 43],
        bonus: 21
    };

    const winningNumbersContainer = document.querySelector('.winning-numbers');
    const bonusNumberContainer = document.querySelector('.bonus-number');

    // Function to get ball color based on number
    const getBallColor = (number) => {
        if (number <= 10) return 'ball-yellow';
        if (number <= 20) return 'ball-blue';
        if (number <= 30) return 'ball-red';
        if (number <= 40) return 'ball-gray';
        return 'ball-green';
    };

    // Function to create a lotto ball element
    const createLottoBall = (number) => {
        const ball = document.createElement('div');
        ball.className = `lotto-ball ${getBallColor(number)}`;
        ball.textContent = number;
        return ball;
    };

    // Display winning numbers
    latestNumbers.winning.forEach(num => {
        winningNumbersContainer.appendChild(createLottoBall(num));
    });

    // Display bonus number
    bonusNumberContainer.appendChild(createLottoBall(latestNumbers.bonus));


    // --- 2. Lotto Number Generator ---
    const generateBtn = document.getElementById('generate-btn');
    const generatedNumbersContainer = document.querySelector('.generated-numbers');

    generateBtn.addEventListener('click', () => {
        const numbers = new Set();
        while (numbers.size < 6) {
            const randomNum = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNum);
        }

        const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

        // Clear previous numbers
        generatedNumbersContainer.innerHTML = '';

        // Display new numbers
        sortedNumbers.forEach(num => {
            generatedNumbersContainer.appendChild(createLottoBall(num));
        });
    });
});