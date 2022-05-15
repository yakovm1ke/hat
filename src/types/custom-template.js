/**
 * NOTE: расширяем типизацию typescript-plugin-css-modules до [key: string]: string, чтобы конструкция styles.classNameDoesNotExistsInCss не считалось ошибкой.
 * Делаем выбор в пользу DX, оставляя от плагина только suggestion.
 */

module.exports = (dts) => {
	/**
   * FYI: замена export default classes на export default classes as typeof classes & {...} ломает подсветку типов при opt + mouseover на styles
   */
	const newDts = dts.replace('declare let classes: {', 'declare let classes: { \n [key:string]:string \n')

	return newDts
}