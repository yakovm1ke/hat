import { TextBlockProps } from '@/components/ui'
import { MOVE_TIME_IN_SECONDS } from '@/core/consts'

export const instructions: TextBlockProps[] = [
	{
		title: 'Число игроков',
		content: {
			text: 'от 4 до 9 (от 2 до 4 команд)',
		},
	},
	{
		title: 'Подготовка',
		content: {
			text: 'В начале игры каждый участник(ца) от своего имени добавляет в шляпу от 4 до 6 слов. После этого, в зависимости от количества игроков случайно формируются команды и их очередность.',
		},
	},
	{
		title: 'Игра',
		content: [
			{
				text: 'Игра разделена на 3 этапа:',
			},
			{
				isHtml: true,
				type: 'highlighted',
				text: (
					`<ul>
						<li>Объяснение</li>
						<li>Пантомима</li>
						<li>Одно слово</li>
					</ul>
					`
				),
			},
			{
				text: 'Этап идет до тех пор, пока все слова в шляпе не закончатся.',
			},
		],
	},
	{
		title: 'Ход',
		content: {
			isHtml: true,
			text: `
				<ul>
					<li>На каждый ход выделяется по ${MOVE_TIME_IN_SECONDS} секунд</li>
					<li>Каждый ход по очереди играет только одна команда</li>
					<li>Пропускать слова не допускается</li>
					<li>Если участник(ца) не успел(а) объяснить последнее слово, то ход переходит к следующей команде</li>
					<li>Если команда успела объяснить все оставшиеся слова из шляпы, то оставшееся время переходит на следующий этап для этой команды</li>
				</ul>
			`,
		},
	},
	{
		title: '1 Этап. Объяснение',
		content: [
			{
				text: 'Участник(ца) объясняет своей команде слово, которое ему(ей) выпало.',
			},
			{
				type: 'highlighted',
				text: 'Не используйте однокоренные слова и не объясняйте слова по буквам.',
			},
		],
	},
	{
		title: '2 Этап. Пантомима',
		content: [
			{
				text: 'Участник(ца) показывает своей команде слово, которое ему(ей) выпало.',
			},
			{
				type: 'highlighted',
				text: 'Не показывайте слова по буквам и не издавайте звуки.',
			},
		],
	},
	{
		title: '3 Этап. Одно слово',
		content: [
			{
				text: 'Участник(ца) говорит своей команде только одно слово, которое ассоциируется с выпавшим.',
			},
			{
				type: 'highlighted',
				text: 'Не используйте однокоренные слова и не говорите только одно.',
			},
		],
	},
	{
		title: 'Приятной игры!',
		content: {
			text: 'После ознакомления с правилами желаем вам интересных слов и честной игры.',
		},
	},
]
