const map = {
	'Name': 'Имя',
	'Phone': 'Телефон',
	'Done': 'Зарегистрировать',
	'Registered':'готов',
	'Fight':'Поехали',
	'Time to answer':'Осталось времени',
	'Player 1 score':'Игрок 1',
	'Player 2 score':'Игрок 2',
	'Question':'Вопрос',
	'Answer variants':'Варианты',
	'The winner is player':'Победил игрок',
	'Player 1 rating':'Рейтинг игрока 1',
	'Player 2 rating':'Рейтинг игрока 2',
	'Go back to reg':'Новый матч',
	'Value': 'Стоимость вопроса',
	'New game': 'Новая игра',
	'Players rating': 'Рейтинг игроков',
	'Loading...': 'Загрузка'
};

export default function(msg) {
	return map[msg] || msg;
}