async function fetchGames() {
    try {
        console.log('Fetching games...'); // تتبع بدء جلب الألعاب
        const response = await fetch('http://localhost:5002/api/games');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`); // تحقق من الاستجابة
        }
        const games = await response.json();
        console.log(games); // طباعة الألعاب المستردة

        const gameGrid = document.querySelector('.game-grid');
        gameGrid.innerHTML = '';  // تفريغ المحتويات السابقة

        games.forEach(game => {
            const gameCard = document.createElement('div');
            gameCard.classList.add('game-card');

            gameCard.innerHTML = `
                <img src="${game.thumbnail}" alt="${game.title}">
                <h3>${game.title}</h3>
                <p>Genre: ${game.genre}</p>
                <p>Platform: ${game.platform}</p>
            `;

            gameGrid.appendChild(gameCard);
        });
    } catch (error) {
        console.error('Error fetching games:', error);
    }
}

// جلب الألعاب عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', fetchGames);
