/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows
    this.elem = document.createElement('TABLE')
    let thead = ['Имя','Возраст','Зарплата','Город'].map ( item => `<th>${item}</th>`).join('')
    this.elem.innerHTML = `<thead><tr>${thead}</tr></thead>`
    
    let tbody = document.createElement('TBODY')
    
    tbody = this.rows
    .map(item => Object.values(item)
      .map(item => `<td>${item}</td>`)
      .join(''))
    .map (item => `<tr>${item}<td><button>X</button></td></tr>`)
    .join('')

    this.elem.insertAdjacentHTML('beforeend', tbody)
    this.elem.addEventListener('click', this.remove)

  }
  remove (event) {
    if (event.target.tagName === 'BUTTON') {
      event.target.closest('tr').remove()
    }
  }
}