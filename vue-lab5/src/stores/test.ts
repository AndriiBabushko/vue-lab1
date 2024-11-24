import { defineStore } from 'pinia'

export type QuestionType =
  | 'single-choice'
  | 'multiple-choice'
  | 'numeric'
  | 'yes-no'
  | 'date'
  | 'text'

export interface ValidationConfig {
  errorMessage?: string
  minValue?: number
  maxValue?: number
  keywords?: string[]
}

export interface Question {
  id: number
  question: string
  type: QuestionType
  correctAnswers: (string | number)[]
  options?: string[]
  validationConfig: ValidationConfig
  selectedAnswers: (string | number)[]
}

export interface Test {
  id: number
  title: string
  questions: Question[]
}

interface State {
  tests: Test[]
}

export const useTestsStore = defineStore('tests', {
  state: (): State => ({
    tests: [
      {
        id: 1,
        title: 'Test 1',
        questions: [
          {
            id: 0,
            type: 'single-choice',
            question: 'Виберіть одну відповідь',
            options: ['Варіант 1', 'Варіант 2', 'Варіант 3'],
            correctAnswers: ['Варіант 2'],
            validationConfig: { errorMessage: 'Оберіть варіант' },
            selectedAnswers: []
          },
          {
            id: 1,
            type: 'numeric',
            question: 'Введіть число',
            correctAnswers: [100],
            validationConfig: {
              errorMessage: 'Введіть число',
              minValue: 1,
              maxValue: 100
            },
            selectedAnswers: []
          },
          {
            id: 2,
            type: 'yes-no',
            question: 'Виберіть так або ні',
            options: ['Так', 'Ні'],
            correctAnswers: ['Так'],
            validationConfig: { errorMessage: 'Це поле обов’язкове' },
            selectedAnswers: []
          },
          {
            id: 3,
            type: 'date',
            question: 'Введіть дату історичної події',
            correctAnswers: ['2022-02-24'],
            validationConfig: { errorMessage: 'Невірний формат дати' },
            selectedAnswers: []
          },
          {
            id: 4,
            type: 'text',
            question: 'Введіть текст, що містить ключове слово "приклад"',
            correctAnswers: ['Це приклад тексту'],
            validationConfig: {
              errorMessage: 'Текст має містити слово "приклад"',
              keywords: ['приклад']
            },
            selectedAnswers: []
          }
          // {
          //   id: 5,
          //   type: 'multiple-choice',
          //   question: 'Виберіть декілька варіантів',
          //   options: ['Варіант 1', 'Варіант 2', 'Варіант 3'],
          //   correctAnswers: ['Варіант 1', 'Варіант 3'],
          //   validationConfig: { errorMessage: 'Оберіть хоча б один варіант' },
          //   selectedAnswers: []
          // }
        ]
      }
    ]
  }),
  actions: {
    selectAnswer(questionId: number, answer: string | number) {
      const question = this.tests[0].questions.find((q) => q.id === questionId)
      if (question) {
        switch (question.type) {
          case 'single-choice': {
            console.log(answer)
            question.selectedAnswers = [answer]
            break
          }
          case 'multiple-choice': {
            const index = question.selectedAnswers.indexOf(answer)
            console.log(JSON.stringify(question, null, 2))
            console.log(index)
            if (index === -1) {
              question.selectedAnswers.push(answer)
            } else {
              question.selectedAnswers.splice(index, 1)
            }
            break
          }
          case 'numeric': {
            question.selectedAnswers = [answer]
            break
          }
        }
      }
    }
  }
})
