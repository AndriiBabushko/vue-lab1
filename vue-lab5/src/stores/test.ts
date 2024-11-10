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
  correctAnswer: string | string[] | number
  options?: string[]
  validationConfig?: ValidationConfig
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
            id: 1,
            type: 'single-choice',
            question: 'Виберіть одну відповідь',
            options: ['Варіант 1', 'Варіант 2', 'Варіант 3'],
            correctAnswer: 'Варіант 2',
            validationConfig: { errorMessage: 'Оберіть варіант' }
          },
          {
            id: 2,
            type: 'multiple-choice',
            question: 'Виберіть декілька варіантів',
            options: ['Варіант 1', 'Варіант 2', 'Варіант 3'],
            correctAnswer: ['Варіант 1', 'Варіант 3'],
            validationConfig: { errorMessage: 'Оберіть хоча б один варіант' }
          },
          {
            id: 3,
            type: 'numeric',
            question: 'Введіть число',
            correctAnswer: 42,
            validationConfig: {
              errorMessage: 'Введіть число',
              minValue: 1,
              maxValue: 100
            }
          },
          {
            id: 4,
            type: 'yes-no',
            question: 'Виберіть так або ні',
            options: ['Так', 'Ні'],
            correctAnswer: 'Так',
            validationConfig: { errorMessage: 'Це поле обов’язкове' }
          },
          {
            id: 5,
            type: 'date',
            question: 'Введіть дату історичної події',
            correctAnswer: '1991-08-24',
            validationConfig: { errorMessage: 'Невірний формат дати' }
          },
          {
            id: 6,
            type: 'text',
            question: 'Введіть текст, що містить ключове слово "приклад"',
            correctAnswer: 'Це приклад тексту',
            validationConfig: {
              errorMessage: 'Текст має містити слово "приклад"',
              keywords: ['приклад']
            }
          }
        ]
      }
    ]
  })
})
