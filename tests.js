const head = document.querySelector('head')
const body = document.querySelector('body')

// mocha CSS link
const mochaCSSPath = "https://cdnjs.cloudflare.com/ajax/libs/mocha/8.3.2/mocha.min.css"
const mochaCSSLinkEl = document.createElement('link')
mochaCSSLinkEl.rel = 'stylesheet'
mochaCSSLinkEl.href = mochaCSSPath
head.prepend(mochaCSSLinkEl)

// custom styles for mocha runner
const mochaStyleEl = document.createElement('style')
mochaStyleEl.innerHTML =
  `#mocha {
    font-family: sans-serif;
    position: fixed;
    overflow-y: auto;
    z-index: 1000;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 48px 0 96px;
    background: white;
    color: black;
    display: none;
    margin: 0;
  }
  #mocha * {
    letter-spacing: normal;
    text-align: left;
  }
  #mocha .replay {
    pointer-events: none;
  }
  #mocha-test-btn {
    position: fixed;
    bottom: 50px;
    right: 50px;
    z-index: 1001;
    background-color: #007147;
    border: #009960 2px solid;
    color: white;
    font-size: initial;
    border-radius: 4px;
    padding: 12px 24px;
    transition: 200ms;
    cursor: pointer;
  }
  #mocha-test-btn:hover:not(:disabled) {
    background-color: #009960;
  }
  #mocha-test-btn:disabled {
    background-color: grey;
    border-color: grey;
    cursor: initial;
    opacity: 0.7;
  }`
head.appendChild(mochaStyleEl)

// mocha div
const mochaDiv = document.createElement('div')
mochaDiv.id = 'mocha'
body.appendChild(mochaDiv)

// run tests button
const testBtn = document.createElement('button')
testBtn.textContent = "Loading Tests"
testBtn.id = 'mocha-test-btn'
testBtn.disabled = true
body.appendChild(testBtn)

const scriptPaths = [
  "https://cdnjs.cloudflare.com/ajax/libs/mocha/8.3.2/mocha.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/chai/4.3.4/chai.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/sinon.js/10.0.1/sinon.min.js",
  // "jsdom.js" // npx browserify _jsdom.js --standalone JSDOM -o jsdom.js
]
const scriptTags = scriptPaths.map(path => {
  const scriptTag = document.createElement('script')
  scriptTag.type = 'text/javascript'
  scriptTag.src = path
  return scriptTag
})

let loaded = 0
if (localStorage.getItem('test-run')) {
  // lazy load test dependencies
  scriptTags.forEach(tag => {
    body.appendChild(tag)
    tag.onload = function () {
      if (loaded !== scriptTags.length - 1) {
        loaded++
        return
      }
      testBtn.textContent = 'Run Tests'
      testBtn.disabled = false
      testBtn.onclick = __handleClick
      runTests()
    }
  })
} else {
  testBtn.textContent = 'Run Tests'
  testBtn.disabled = false
  testBtn.onclick = __handleClick
}

function __handleClick() {
  if (!localStorage.getItem('test-run') && this.textContent === 'Run Tests') {
    localStorage.setItem('test-run', true)
  } else {
    localStorage.removeItem('test-run')
  }
  window.location.reload()
}

function runTests() {
  testBtn.textContent = 'Running Tests'
  testBtn.disabled = true
  mochaDiv.style.display = 'block'
  body.style.overflow = 'hidden'

  mocha.setup("bdd");
  const expect = chai.expect;

  describe("Quiz Game Redux", function () {
    let clock
    const startQuiz = () =>
      document.getElementById('start-quiz').click()
    const chooseCorrectly = () => {
      const questionObj = qArr
        .find(qObj => getQuizHTML().includes(qObj.question))
      Array.from(document.querySelectorAll('#quiz button'))
        .find(btn => btn.textContent === questionObj.answer)
        .click()
    }
    const chooseIncorrectly = () => {
      const questionObj = qArr
        .find(qObj => getQuizHTML().includes(qObj.question))
      Array.from(document.querySelectorAll('#quiz button'))
        .find(btn => btn.textContent !== questionObj.answer)
        .click()
    }
    const getQuizHTML = () => document.getElementById('quiz').innerHTML
    const qArr = [
      {
        question: "banana",
        options: ['[', '@', '#', '$'],
        answer: '['
      },
      {
        question: "coconut",
        options: ['^', '&', '*', '('],
        answer: '&'
      },
      {
        question: "kiwi",
        options: [')', '+', '_', '['],
        answer: '['
      },
    ]
    before(() => {
      clock = sinon.useFakeTimers()
      expect(questionsArr).to.exist
      expect(Array.isArray(questionsArr)).to.be.true
      expect(questionsArr.length >= 5).to.be.true
      var runningTests = localStorage.getItem('test-run')
      localStorage.clear()
      if (runningTests)
        localStorage.setItem('test-run', true)
    })
    beforeEach(() => {
      sinon
        .stub(window, 'questionsArr')
        .value(qArr)
    })
    after(() => {
      sinon.restore()
      testBtn.textContent = 'Close Tests'
      testBtn.disabled = false
    })
    it('should show first question text, choices, and remaining time of 10 when start is clicked', () => {
      expect(getQuizHTML().includes(qArr[0].question)).to.be.false
      startQuiz()
      expect(getQuizHTML().includes(qArr[0].question)).to.be.true
      qArr[0]
        .options
        .forEach(option =>
          expect(getQuizHTML().includes(option)).to.be.true)
      expect(getQuizHTML().includes('30')).to.be.true
    })
    it('should count down from 30 one second at a time', () => {
      clock.tick(1000)
      expect(getQuizHTML().includes('29')).to.be.true
      clock.tick(1000)
      expect(getQuizHTML().includes('28')).to.be.true
    })
    it('should show the next question and reset the timer when a correct option is chosen', () => {
      expect(getQuizHTML().includes('28')).to.be.true
      chooseCorrectly()
      expect(getQuizHTML().includes('30')).to.be.true
      expect(getQuizHTML().includes(qArr[0].question)).to.be.false
      qArr[0]
        .options
        .forEach(option =>
          expect(getQuizHTML().includes(option)).to.be.false)
      expect(getQuizHTML().includes(qArr[1].question)).to.be.true
      qArr[1]
        .options
        .forEach(option =>
          expect(getQuizHTML().includes(option)).to.be.true)
    })
    it('should show the next question and reset the timer when an incorrect option is chosen', () => {
      clock.tick(3000)
      expect(getQuizHTML().includes('27')).to.be.true
      chooseIncorrectly()
      expect(getQuizHTML().includes('30')).to.be.true
      expect(getQuizHTML().includes(qArr[1].question)).to.be.false
      qArr[1]
        .options
        .forEach(option =>
          expect(getQuizHTML().includes(option)).to.be.false)
      expect(getQuizHTML().includes(qArr[2].question)).to.be.true
      qArr[2]
        .options
        .forEach(option =>
          expect(getQuizHTML().includes(option)).to.be.true)
    })
    it('should end game when timer runs out on last question', () => {
      expect(getQuizHTML().includes('30')).to.be.true
      clock.tick(1000)
      expect(getQuizHTML().includes('29')).to.be.true
      clock.tick(30 * 1000)
      const currentHTML = getQuizHTML()
      qArr.forEach(({question, options}) => {
        expect(currentHTML.includes(question)).to.be.false
        options.forEach(option =>
          expect(currentHTML.includes(option)).to.be.false)
      })
      expect(/\d!%/.test(currentHTML)).to.be.false
    })
    it('should show score when game is over and start quiz button', () => {
      expect(getQuizHTML().includes('33%')).to.be.true
      expect(document.getElementById('start-quiz')).to.exist
    })
    it('should store score in localStorage under the key "previous-score"', () => {
      expect(localStorage.getItem('previous-score')).to.exist
    })
  });

  mocha.run();
}