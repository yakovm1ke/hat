import { VueComponent, Component } from '@/types';

import styles from './index.module.css'

@Component
export class HomeView extends VueComponent {

	public render() {
		return (
			<div>
				<div class={styles.bigTitle}>
					Шляпа
				</div>
				<div class={styles.content}>
					<div class={styles.block}>
						<div class={styles.mainText}>
							Число игроков
						</div>
						<div class={styles.subText}>
							от 4 до 9 (от 2 до 4 команд)
						</div>
					</div>

					<div class={styles.block}>
						<div class={styles.mainText}>
							Подготовка
						</div>
						<div class={styles.subText}>
							В начале игры каждый участник(ца) от своего имени добавляет в шляпу от 4 до 6 слов. После этого, в зависимости от количества игроков случайно формируются команды и их очередность.
						</div>
					</div>

					<div class={styles.block}>
						<div class={styles.mainText}>
						Игра
						</div>
						<div class={styles.subText}>
							Игра разделена на 3 этапа:
						</div>
						<ul class={[styles.subText, styles.highlightedText]}>
							<li>Объяснение</li>
							<li>Пантомима</li>
							<li>Одно слово</li>
						</ul>
						<div class={styles.subText}>
							Этап идет до тех пор, пока все слова в шляпе не закончатся.
						</div>
					</div>

					<div class={styles.block}>
						<div class={styles.mainText}>
							Ход
						</div>
						<ul class={styles.subText}>
							<li>На каждый ход выделяется по 60 секунд</li>
							<li>Каждый ход по очереди играет только одна команда</li>
							<li>Пропускать слова не допускается</li>
							<li>Если участник(ца) не успел(а) объяснить последнее слово, то ход переходит к следующей команде</li>
							<li>Если команда успела объяснить все оставшиеся слова из шляпы, то оставшееся время переходит на следующий этап для этой команды</li>
						</ul>
					</div>

					<div class={styles.block}>
						<div class={styles.mainText}>
							1 Этап. Объяснение
						</div>
						<div class={styles.subText}>
							Участник(ца) объясняет своей команде слово, которое ему(ей) выпало.{' '}
							<span class={styles.highlightedText}>
								Не используйте однокоренные слова и не объясняйте слова по буквам.
							</span>
						</div>
					</div>

					<div class={styles.block}>
						<div class={styles.mainText}>
							2 Этап. Пантомима
						</div>
						<div class={styles.subText}>
							Участник(ца) показывает своей команде слово, которое ему(ей) выпало.{' '}
							<span class={styles.highlightedText}>
								Не показывайте слова по буквам и не издавайте звуки.
							</span>
						</div>
					</div>

					<div class={styles.block}>
						<div class={styles.mainText}>
							3 Этап. Одно слово
						</div>
						<div class={styles.subText}>
							Участник(ца) говорит своей команде только одно слово, которое ассоциируется с выпавшим.{' '}
							<span class={styles.highlightedText}>
								Не используйте однокоренные слова и не говорите только одно.
							</span>
						</div>
					</div>

					<div class={styles.block}>
						<div class={styles.mainText}>
							Приятной игры!
						</div>
						<div class={styles.subText}>
							После ознакомления с правилами желаем вам интересных слов и честной игры.
						</div>
					</div>

					<div class={styles.block}>
						<router-link to="/start">
							<button class={styles.button}>
								Начать
							</button>
						</router-link>
					</div>
				</div>
			</div>
		)
	}
}