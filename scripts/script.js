function setHistory(value, type) {
  var containerHistory = document.getElementById("container_history")

  const contentLi = document.createElement('li')

  const strongElement = document.createElement('strong')
  strongElement.innerText = 'R$ '

  const spanElement = document.createElement('span')
  spanElement.innerText = `${type === 'sum' ? '+ ' : '- '}${value}`

  contentLi.appendChild(strongElement)
  contentLi.appendChild(spanElement)

  containerHistory.appendChild(contentLi)
}

/**
 *
 * @param {string} inputValue
 * @param {'sum' | 'subtract'} type
 * @param {boolean} isOnLoad
 */
function addHistory(inputValue, type, isOnLoad = false) {
  const historiesValuesStringGet = sessionStorage.getItem('histories_values')
  const historiesValues = JSON.parse(historiesValuesStringGet) || []

  if (!historiesValues.length && isOnLoad) {
    const historiesValuesString = JSON.stringify([])
    sessionStorage.setItem('histories_values', historiesValuesString)
  }

  if (inputValue) {
    let valueTohistory = `${type === 'sum' ? '+' : '-'} ${inputValue}`
    let newArray = [...historiesValues, valueTohistory]
    const historiesValuesString = JSON.stringify(newArray)
    sessionStorage.setItem('histories_values', historiesValuesString)
  }

  if (isOnLoad) {
    for (let historyValue of historiesValues) {
      let [type, value] = historyValue?.split(' ')

      setHistory(value, type === '+' ? 'sum' : 'subtract')
    }
  } else {
    setHistory(Number(inputValue), type)
  }
}

/**
 *
 * @param {number} newValue
 * @param {boolean} isOnLoad
 */
function setInfoTotal(newValue, isOnLoad) {
  var containerTotalValue = document.getElementById("content_value")
  let totalValue = Number(sessionStorage.getItem('total_value'))

  if (isOnLoad && !totalValue && !newValue) {
    sessionStorage.setItem('total_value', 0)

    let final_value = Number(sessionStorage.getItem('total_value')).toFixed(2)
    containerTotalValue.innerText = final_value
    return
  }

  if (totalValue && newValue) {
    let value = newValue >= 0 ? newValue : totalValue
    sessionStorage.setItem('total_value', value)
  }

  if (!totalValue && newValue) {
    sessionStorage.setItem('total_value', newValue)
  }

  let final_value = Number(sessionStorage.getItem('total_value')).toFixed(2)
  containerTotalValue.innerText = final_value
}

function sum(value) {
  let totalValue = Number(sessionStorage.getItem('total_value')) || null

  return value + totalValue
}

function subtract(value) {
  let totalValue = Number(sessionStorage.getItem('total_value')) || null

  return totalValue - value
}

function setValue(type) {
  var inputValue = document.getElementById("input_value").value
  let totalValue = null

  if (!inputValue)
    return alert('Um valor precisa ser passado')

  switch (type) {
    case 'sum':
      totalValue = sum(Number(inputValue))
      addHistory(inputValue, 'sum')
      break;
    case 'subtract':
      totalValue = subtract(Number(inputValue))
      addHistory(inputValue, 'subtract')
      break;
    default:
      break;
  }

  setInfoTotal(totalValue)
  document.getElementById("input_value").value = ''
}

function onPage() {
  setInfoTotal(null, true)
  addHistory('', '', true)
}