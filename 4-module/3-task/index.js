function highlight(table) {
  for (let i = 1; i < table.rows.length; i++) {
    let row = table.rows[i]
    if (row.cells[3].hasAttribute('data-available')) {
      if (row.cells[3].getAttribute('data-available') === 'true') {
        row.classList.add('available')
      } else {
        row.classList.add('unavailable')
      }
    } else {
      row.setAttribute('hidden','')
    }
    if (row.cells[2].textContent == 'm') {
      row.classList.add('male')
    } else {
      row.classList.add('female')
    }
    if (row.cells[1].textContent < 18) {
      row.style = "text-decoration: line-through"
    }
  }
}
