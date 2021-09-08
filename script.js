const send = document.querySelector('#send')
const input = document.querySelector('#input')

const stringAddSpaces = (letters, spaceIndex) => {
  for(let i=0; i<letters.length; i++) {
    if(i % spaceIndex === 0 && i !== 0) {
      letters.splice(i, 0, " ")
    } 
  }

  return letters
}

const stringRemoveSpaces = (letters, spaceIndex) => {
  const result = letters
  let countDelete = 0
  for(let i=0; i<letters.length; i++) {
    if((i+countDelete) % spaceIndex === 0 && i !== 0){
      result.splice(i, 1)
      countDelete++
    }
  }

  return result
}

const stringReplaceLetter = (letters, replacements) => {
  const replacementKeys = Object.keys(replacements)
  const replacementValues = Object.values(replacements)

  letters.forEach((ch, i) => { 
    if (replacementKeys.includes(ch)) {
      const replacementIndex = replacementKeys.indexOf(ch)
      letters[i] = replacementValues[replacementIndex]
    }
    else if(replacementValues.includes(ch)) {
      const replacementIndex = replacementValues.indexOf(ch)
      letters[i] = replacementKeys[replacementIndex]
    }
  })

  return letters
}

const stringToAscii = (string, step) => string.map(char => char.charCodeAt() + step)

const asciiToString = (string, step) => String.fromCharCode(...string.map(ch => ch - step))

const encodeString = (string, key) => {
  string = string.split('')
  let result = string

  showLeft(result.join(''))
  result = stringAddSpaces(result, key.spaceIndex)  
  showLeft(result)
  result = stringReplaceLetter(result, key.replacements)
  showLeft(result)
  result = stringToAscii(result, key.step)
  showLeft(result)

  return result
}

const decodeString = (string, key) => {
  let result = string

  showRight(result)
  result = asciiToString(result, key.step).split('')
  showRight(result)
  result = stringReplaceLetter(result, key.replacements)
  showRight(result)
  result = stringRemoveSpaces(result, key.spaceIndex)  
  showRight(result)

  return result
}



const showLeft = (letters) => {
  const ul = document.querySelector('ul')

  const li = document.createElement('li')
  li.classList.add('left')

  let text = ''
  if (Array.isArray(letters)) {
    for(const letter of letters) {
      text += `${letter},`
    }
    text.slice(0, -1)
  }
  else {
    text = letters
  }
  

  li.innerHTML = text
  ul.append(li)
}

const showRight = (letters) => {
  const ul = document.querySelector('ul')

  const li = document.createElement('li')
  li.classList.add('right')

  let text = ''
  if (Array.isArray(letters)) {
    for(const letter of letters) {
      text += `${letter},`
    }
    text.slice(0, -1)
  }
  else {
    text = letters
  }
  

  li.innerHTML = text
  ul.append(li)
}

const person1 = {
  key: {
    spaceIndex: 2,
    replacements: {
      ' ': 'п',
      'а': 'р',
      'е': 'н',
      'и': 'в',
      'я': 'к',
      'у': 'ф'
    },
    step: 3
  }
}

send.addEventListener('click', () => {
  const text = input.value
  input.value = ''

  const code = encodeString(text, person1.key)
  console.log('---------------')
  const decode = decodeString(code, person1.key)
})