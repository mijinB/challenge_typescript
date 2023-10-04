type Words = {
  [key: string]: string
}

class Dictionary {
  private words: Words
  constructor() {
      this.words = {}
  }

  add(word: Word) {
      if (this.words[word.term] === undefined) {
          this.words[word.term] = word.definition
      }
  }

  getDefinition(term: string) {
      return this.words[term]
  }

  deleteFn(term: string) {
      delete (this.words[term])
  }

  update(term: string, definition: string) {
      if (this.words[term] !== undefined) {
          this.words[term] = definition
      }
  }

  showAll() {
      return this.words
  }

  count() {
      return Object.keys(this.words).length
  }

  upsert(word: Word) {
      if (this.words[word.term] !== undefined) {
          this.update(word.term, word.definition)
      } else {
          this.add(word)
      }
  }

  exists(term: string) {
      if (this.words[term] !== undefined) {
          return `${term} 단어가 존재합니다.`
      } else {
          return `${term} 단어가 존재하지 않습니다.`
      }
  }

  bulkAdd(wordList: Word[]) {
      wordList.forEach(word => {
          if (this.words[word.term] === undefined) {
              this.words[word.term] = word.definition
          }
      })
  }

  bulkDelete(termList: string[]) {
      termList.forEach(term => delete (this.words[term]))
  }
}

class Word {
  constructor(
      public term: string,
      public definition: string,
  ) { }
}

//test---------------------------------------------------------

const dictionary = new Dictionary

const apple = new Word("apple", "사과")
const strawberry = new Word("strawberry", "딸기")

dictionary.add(apple)
dictionary.add(strawberry)

const getResult = dictionary.getDefinition("strawberry")

dictionary.deleteFn("apple")
dictionary.add(apple)

dictionary.update("apple", "멜론")

const showAllResult = dictionary.showAll()

//callSignatures.ts 파일이랑 변수명이 겹쳐서 앞에 d 추가
const dcountResult = dictionary.count()

dictionary.upsert(new Word("apple", "사과"))
dictionary.upsert(new Word("banana", "바나나"))

const existsResult = dictionary.exists("kiwi")

dictionary.bulkAdd([
  new Word("tomato", "토마토"),
  new Word("carrot", "당근"),
  new Word("mango", "망고"),
])

dictionary.bulkDelete(["apple", "mango"])

//console.log(dictionary)
//console.log(ㅇㅇㅇResult)