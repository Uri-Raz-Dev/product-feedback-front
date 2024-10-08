export const utilService = {
  makeId,
  makeLorem,
  getRandomIntInclusive,
  debounce,
  convertTimestampToDate,
  toUpperCase,
}

function makeId(length: number = 6): string {
  var txt = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

function makeLorem(size: number = 100): string {
  var words = [
    'The sky',
    'above',
    'the port',
    'was',
    'the color of television',
    'tuned',
    'to',
    'a dead channel',
    '.',
    'All',
    'this happened',
    'more or less',
    '.',
    'I',
    'had',
    'the story',
    'bit by bit',
    'from various people',
    'and',
    'as generally',
    'happens',
    'in such cases',
    'each time',
    'it',
    'was',
    'a different story',
    '.',
    'It',
    'was',
    'a pleasure',
    'to',
    'burn',
  ]
  var txt = ''
  while (size > 0) {
    size--
    txt += words[Math.floor(Math.random() * words.length)] + ' '
  }
  return txt
}

function getRandomIntInclusive(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function debounce<Type extends (...args: any[]) => void>(
  func: Type,
  timeout = 300
): (...args: Parameters<Type>) => void {
  let timer: ReturnType<typeof setTimeout>

  return (...args: Parameters<Type>) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func(...args)
    }, timeout)
  }
}

function convertTimestampToDate(timestamp: number | string): string {
  const date = new Date(timestamp)
  const formattedDate = date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  })
  return formattedDate
}

function toUpperCase(str: string): string {
  const upperCaseStr = str.charAt(0).toUpperCase() + str.slice(1, str.length)

  return upperCaseStr
}
