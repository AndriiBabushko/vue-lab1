<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import DefaultLayout from '@/components/layout/DefaultLayout.vue'
import { ref, computed, watch } from 'vue'
import { type Question, useTestsStore } from '@/stores/test'
import router from '@/router'
import { ROUTE_PATHS } from '@/utils'
import { useI18n } from 'vue-i18n'

const currentQuestion = ref(0)
const testStore = useTestsStore()
const { t } = useI18n()

// Структура для зберігання відповідей
const answers = ref<Record<number, any>>({})

// Стежимо за змінами в answers, щоб зберігати дані
watch(answers, (newAnswers) => {
  console.log('Answers updated:', newAnswers)
})

// Валідація для поточного питання
const currentValidationSchema = computed(() =>
  getValidationSchema(testStore.tests[0].questions[currentQuestion.value])
)

// Функція для отримання валідаційної схеми
const getValidationSchema = (question: Question) => {
  const { validationConfig = {} } = question

  switch (question.type) {
    case 'single-choice':
      return yup.string().required(validationConfig.errorMessage || t('validation.selectOption'))
    case 'multiple-choice':
      return yup.array().min(1, validationConfig.errorMessage || t('validation.selectAtLeastOne'))
    case 'numeric':
      return yup
        .number()
        .required(validationConfig.errorMessage || t('validation.enterNumber'))
        .min(
          validationConfig.minValue ?? Number.NEGATIVE_INFINITY,
          t('validation.minValue', { minValue: validationConfig.minValue })
        )
        .max(
          validationConfig.maxValue ?? Number.POSITIVE_INFINITY,
          t('validation.maxValue', { maxValue: validationConfig.maxValue })
        )
    case 'yes-no':
      return yup.string().required(validationConfig.errorMessage || t('validation.selectOption'))
    case 'date':
      return yup.date().required(validationConfig.errorMessage || t('validation.enterDate'))
    case 'text':
      return yup
        .string()
        .required(validationConfig.errorMessage || t('validation.enterText'))
        .test(
          'containsKeyword',
          validationConfig.errorMessage || t('validation.containsKeyword'),
          (value) => validationConfig.keywords?.some((keyword) => value?.includes(keyword)) || false
        )
    default:
      return yup.string()
  }
}

const currentQuestionData = computed(() => testStore.tests[0].questions[currentQuestion.value])

// Функція для збереження відповіді
const saveAnswer = (questionId: number, value: any) => {
  console.log(`questionId: ${questionId}, value: ${value}`)
  answers.value[questionId] = value
}

// Перехід до наступного питання
const nextQuestion = () => {
  const currentQuestionId = testStore.tests[0].questions[currentQuestion.value].id
  const currentAnswer = answers.value[currentQuestionId]
  saveAnswer(currentQuestionId, currentAnswer)

  if (currentQuestion.value < testStore.tests[0].questions.length - 1) {
    currentQuestion.value++
  } else {
    finishTest()
  }
}

// Перехід до попереднього питання
const previousQuestion = () => {
  const currentQuestionId = testStore.tests[0].questions[currentQuestion.value].id
  const currentAnswer = answers.value[currentQuestionId]
  saveAnswer(currentQuestionId, currentAnswer)

  if (currentQuestion.value > 0) currentQuestion.value--
}

// Обчислення результатів тесту
const calculateResults = () => {
  const correctAnswers = testStore.tests[0].questions.filter(
    (question) =>
      JSON.stringify(answers.value[question.id]) === JSON.stringify(question.correctAnswer)
  ).length
  const successRate = (correctAnswers / testStore.tests[0].questions.length) * 100
  return { correctAnswers, successRate }
}

// Завершення тесту
const finishTest = () => {
  const isComplete = testStore.tests[0].questions.every(
    (question) => answers.value[question.id] != null
  )

  if (isComplete) {
    const { correctAnswers, successRate } = calculateResults()
    router.push({
      name: ROUTE_PATHS.RESULT,
      params: { correctAnswers, successRate }
    })
  } else {
    alert(t('validation.completeAllQuestions'))
    currentQuestion.value = testStore.tests[0].questions.findIndex(
      (question) => answers.value[question.id] == null
    )
  }
}
</script>

<template>
  <DefaultLayout>
    <div class="p-4 max-w-3xl mx-auto bg-[#18181b] shadow-md rounded border-2 border-[#3f3f46]">
      <div class="flex justify-between items-center gap-[16px] pb-4 border-b-2 border-[#3f3f46]">
        <div>
          <p class="text-sm text-gray-400">
            {{
              t('question.number', {
                current: currentQuestion + 1,
                total: testStore.tests[0].questions.length
              })
            }}
          </p>
          <h2 class="text-lg text-white font-semibold">{{ currentQuestionData.question }}</h2>
        </div>
        <div class="flex flex-row gap-[8px]">
          <Button
            icon="pi pi-arrow-left"
            @click="previousQuestion"
            :disabled="currentQuestion === 0"
          />
          <Button
            @click="nextQuestion"
            :icon="
              currentQuestion !== testStore.tests[0].questions.length - 1
                ? 'pi pi-arrow-right'
                : 'pi pi-check-circle'
            "
          />
        </div>
      </div>

      <Form @submit="nextQuestion">
        <!-- Single Choice Question -->
        <div class="pt-[16px]" v-if="currentQuestionData.type === 'single-choice'">
          <Field name="singleChoice" :rules="currentValidationSchema" v-slot="{ field }">
            <div class="flex flex-col gap-2">
              <div
                v-for="option in currentQuestionData.options"
                :key="option"
                class="flex items-center gap-2"
              >
                <input
                  type="radio"
                  :id="option"
                  :value="option"
                  v-model="answers[currentQuestionData.id]"
                  class="mr-2"
                  v-bind="field"
                />
                <label :for="option" class="text-white">{{ option }}</label>
              </div>
            </div>
          </Field>
        </div>

        <!-- Multiple Choice Question -->
        <div class="pt-[16px]" v-else-if="currentQuestionData.type === 'multiple-choice'">
          <Field
            v-model="answers[currentQuestionData.id]"
            name="multipleChoice"
            type="checkbox"
            :rules="currentValidationSchema"
          >
            <div class="flex flex-col gap-2">
              <div
                v-for="option in currentQuestionData.options"
                :key="option"
                class="flex items-center gap-2"
              >
                <input type="checkbox" :id="option" :value="option" class="mr-2" />
                <label :for="option" class="text-white">{{ option }}</label>
              </div>
            </div>
          </Field>
          <ErrorMessage name="multipleChoice" />
        </div>

        <!-- Numeric Input Question -->
        <div class="pt-[16px]" v-else-if="currentQuestionData.type === 'numeric'">
          <Field
            v-model="answers[currentQuestionData.id]"
            name="numeric"
            type="number"
            :rules="currentValidationSchema"
          />
          <ErrorMessage name="numeric" />
        </div>

        <!-- Yes/No Question -->
        <div class="pt-[16px]" v-else-if="currentQuestionData.type === 'yes-no'">
          <Field
            v-model="answers[currentQuestionData.id]"
            name="yesNo"
            as="select"
            :rules="currentValidationSchema"
          >
            <option value="">{{ t('validation.selectOption') }}</option>
            <option value="yes">{{ t('validation.yes') }}</option>
            <option value="no">{{ t('validation.no') }}</option>
          </Field>
          <ErrorMessage name="yesNo" />
        </div>

        <!-- Date Input Question -->
        <div class="pt-[16px]" v-else-if="currentQuestionData.type === 'date'">
          <Field
            v-model="answers[currentQuestionData.id]"
            name="date"
            type="date"
            :rules="currentValidationSchema"
          />
          <ErrorMessage name="date" />
        </div>

        <!-- Text Input Question -->
        <div class="pt-[16px]" v-else-if="currentQuestionData.type === 'text'">
          <Field
            v-model="answers[currentQuestionData.id]"
            name="text"
            type="text"
            :rules="currentValidationSchema"
          />
          <ErrorMessage name="text" />
        </div>
      </Form>
    </div>
  </DefaultLayout>
</template>
