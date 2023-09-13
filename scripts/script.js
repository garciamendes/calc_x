function setHistory(value) {
  var containerHistory = document.getElementById("container_history")

  const contentLi = document.createElement('li')

  const strongElement = document.createElement('strong')
  strongElement.innerText = 'R$ '

  const spanElement = document.createElement('span')
  spanElement.innerText = value

  contentLi.appendChild(strongElement)
  contentLi.appendChild(spanElement)

  containerHistory.appendChild(contentLi)
}

/**
 *
 * @param {string} inputValue
 * @param {boolean} isOnLoad
 */
function addHistory(inputValue, isOnLoad = false) {
  const historiesValuesStringGet = sessionStorage.getItem('histories_values')
  const historiesValues = JSON.parse(historiesValuesStringGet) || []

  if (!historiesValues.length && isOnLoad) {
    const historiesValuesString = JSON.stringify([])
    sessionStorage.setItem('histories_values', historiesValuesString)
  }

  if (inputValue) {
    let newArray = [...historiesValues, Number(inputValue)]
    const historiesValuesString = JSON.stringify(newArray)
    sessionStorage.setItem('histories_values', historiesValuesString)
  }

  if (isOnLoad) {
    for (let historyValue of historiesValues) {
      setHistory(historyValue)
    }
  } else {
    setHistory(inputValue)
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

  if (isOnLoad && !totalValue) {
    sessionStorage.setItem('total_value', 0)
    return
  }

  if (totalValue) {
    totalValue = newValue ? newValue : totalValue
    sessionStorage.setItem('total_value', totalValue)
  }

  if (!totalValue) {
    sessionStorage.setItem('total_value', newValue)
  }

  let final_value = Number(sessionStorage.getItem('total_value')).toFixed(2)
  containerTotalValue.innerText = final_value
}

function sum(value) {
  let totalValue = Number(sessionStorage.getItem('total_value')) || null

  if (totalValue)
    return value + totalValue

  return value
}

function subtract(value) {
  let totalValue = Number(sessionStorage.getItem('total_value')) || null

  if (totalValue)
    return totalValue - value

  return value
}

function setValue(type) {
  var inputValue = document.getElementById("input_value").value
  let totalValue = null

  if (!inputValue)
    return alert('Um valor precisa ser passado')

  switch (type) {
    case 'sum':
      totalValue = sum(Number(inputValue))
      break;
    case 'subtract':
      totalValue = subtract(Number(inputValue))
      break;
    default:
      break;
  }

  addHistory(inputValue)

  setInfoTotal(totalValue)
  document.getElementById("input_value").value = ''
}

function onPage() {
  setInfoTotal(null, true)
  addHistory('', true)
}