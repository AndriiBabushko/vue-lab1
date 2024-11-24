<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import DefaultLayout from '@/components/layout/DefaultLayout.vue'
import { ref, computed, watch } from 'vue'
import { type Question, useTestsStore } from '@/stores/test'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { ROUTE_NAMES } from '@/utils'

const currentQuestion = ref(0)
const testStore = useTestsStore()
const router = useRouter()
const { t } = useI18n()

const currentValidationSchema = computed(() =>
  getValidationSchema(testStore.tests[0].questions[currentQuestion.value])
)

watch(testStore.tests[0].questions, () => {
  console.log(`Questions updated -> ${JSON.stringify(testStore.tests[0].questions, null, 2)}`)
})

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

const currentQuestionData = computed(
  () =>
    testStore.tests[0].questions.find((question) => question.id === currentQuestion.value) ||
    testStore.tests[0].questions[0]
)

const singleChoiceAnswer = computed({
  get() {
    return currentQuestionData.value ? currentQuestionData.value.selectedAnswers[0] : null
  },
  set(value) {
    if (currentQuestionData.value) currentQuestionData.value.selectedAnswers = [value]
  }
})

const multipleChoiceAnswer = computed({
  get() {
    return currentQuestionData.value ? currentQuestionData.value.selectedAnswers[0] : null
  },
  set(value) {
    if (currentQuestionData.value) currentQuestionData.value.selectedAnswers = [value]
  }
})

const numericAnswer = computed({
  get() {
    const value = currentQuestionData.value.selectedAnswers[0]
    return value ? Number(value) : null
  },
  set(value) {
    currentQuestionData.value.selectedAnswers = [value]
  }
})

const yesNoAnswer = computed({
  get() {
    return currentQuestionData.value.selectedAnswers[0] || null
  },
  set(value) {
    currentQuestionData.value.selectedAnswers = [value]
  }
})

const dateAnswer = computed({
  get() {
    const value = currentQuestionData.value.selectedAnswers[0] || null
    return value ? new Date(value) : null
  },
  set(value) {
    if (value) {
      const date = new Date(value)
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
      currentQuestionData.value.selectedAnswers = [formattedDate]
    } else {
      currentQuestionData.value.selectedAnswers = []
    }
  }
})

const textAnswer = computed({
  get() {
    const value = currentQuestionData.value.selectedAnswers[0]
    return value ? String(value) : null
  },
  set(value) {
    currentQuestionData.value.selectedAnswers = [value ?? null]
  }
})

const nextQuestion = () => {
  if (currentQuestion.value < testStore.tests[0].questions.length - 1) {
    currentQuestion.value++
  } else {
    finishTest()
  }
}

const previousQuestion = () => {
  if (currentQuestion.value > 0) currentQuestion.value--
}

const calculateResults = () => {
  const questions = testStore.tests[0].questions
  let totalScore = 0

  questions.forEach((question) => {
    let questionScore = 0

    switch (question.type) {
      case 'multiple-choice': {
        if (question.selectedAnswers.length > question.correctAnswers.length) {
          questionScore = 0
        } else {
          const correctSelectedCount = question.selectedAnswers.filter((answer) =>
            question.correctAnswers.includes(answer)
          ).length

          questionScore = correctSelectedCount / question.correctAnswers.length
        }
        break
      }

      case 'single-choice':
      case 'yes-no':
      case 'date': {
        const selectedAnswer = question.selectedAnswers[0]

        console.log(selectedAnswer)

        if (
          question.selectedAnswers.length === 1 &&
          selectedAnswer === question.correctAnswers[0]
        ) {
          questionScore = 1
        }
        break
      }

      case 'numeric': {
        if (
          question.selectedAnswers.length === 1 &&
          Number(question.selectedAnswers[0]) === question.correctAnswers[0]
        ) {
          questionScore = 1
        }
        break
      }

      case 'text': {
        if (
          question.selectedAnswers.length === 1 &&
          String(question.selectedAnswers[0]).includes(question.validationConfig.keywords[0])
        ) {
          questionScore = 1
        }
        break
      }

      default:
        break
    }

    totalScore += questionScore
  })

  const successRate = (totalScore / questions.length) * 100
  return { correctAnswers: totalScore, successRate, totalScore }
}

const finishTest = () => {
  const isComplete = testStore.tests[0].questions.every(
    (question) => question.selectedAnswers.length > 0
  )

  if (isComplete) {
    const { correctAnswers, successRate, totalScore } = calculateResults()

    router.push({
      name: ROUTE_NAMES.RESULT,
      query: { correctAnswers, successRate, totalScore }
    })
  } else {
    alert(t('validation.completeAllQuestions'))
    currentQuestion.value = testStore.tests[0].questions.findIndex(
      (question) => question.selectedAnswers.length === 0
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

      <Form :validation-schema="currentValidationSchema" @submit="nextQuestion">
        <!-- Single Choice Question -->
        <div class="pt-[16px]" v-if="currentQuestionData.type === 'single-choice'">
          <div class="flex flex-col gap-2">
            <Field name="singleChoice" v-slot="{ field }">
              <div
                v-for="(option, index) in currentQuestionData.options"
                :key="index"
                class="flex items-center gap-2"
              >
                <input
                  type="radio"
                  v-bind="field"
                  :name="index.toString()"
                  :id="index.toString()"
                  :value="option"
                  v-model="singleChoiceAnswer"
                  class="mr-2"
                />
                <label :for="index.toString()" class="text-white">{{ option }}</label>
              </div>
            </Field>
            <ErrorMessage name="singleChoice" />
          </div>
        </div>

        <!-- Multiple Choice Question -->
        <!--        <div class="pt-[16px]" v-else-if="currentQuestionData.type === 'multiple-choice'">-->
        <!--          <div class="flex flex-col gap-2">-->
        <!--            <div-->
        <!--              v-for="(option, index) in currentQuestionData.options"-->
        <!--              :key="option"-->
        <!--              class="flex items-center gap-2"-->
        <!--            >-->
        <!--              <input-->
        <!--                type="checkbox"-->
        <!--                :name="currentQuestionData.id.toString()"-->
        <!--                :id="index.toString()"-->
        <!--                :value="option"-->
        <!--                v-model="multipleChoiceAnswer"-->
        <!--                class="mr-2"-->
        <!--              />-->
        <!--              <label :for="index.toString()" class="text-white">{{ option }}</label>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--          <ErrorMessage name="multipleChoice" />-->
        <!--        </div>-->

        <div class="pt-[16px]" v-else-if="currentQuestionData.type === 'numeric'">
          <div class="flex flex-col gap-2">
            <Field name="numericAnswer">
              <InputNumber v-model="numericAnswer" class="w-full" />
            </Field>
          </div>
          <ErrorMessage name="numericAnswer" />
        </div>

        <div class="pt-[16px]" v-else-if="currentQuestionData.type === 'yes-no'">
          <div class="flex flex-col gap-2">
            <Field name="yesNoAnswer">
              <div
                v-for="option in currentQuestionData.options"
                :key="option"
                class="flex items-center gap-2"
              >
                <input
                  type="radio"
                  :id="option"
                  :value="option"
                  v-model="yesNoAnswer"
                  class="mr-2"
                />
                <label :for="option" class="text-white">{{ option }}</label>
              </div>
            </Field>
          </div>
          <ErrorMessage name="yesNoAnswer" />
        </div>

        <div class="pt-[16px]" v-else-if="currentQuestionData.type === 'date'">
          <div class="flex flex-col gap-2">
            <Field name="dateAnswer">
              <DatePicker v-model="dateAnswer" class="w-full" />
            </Field>
          </div>
          <ErrorMessage name="dateAnswer" />
        </div>

        <div class="pt-[16px]" v-else-if="currentQuestionData.type === 'text'">
          <div class="flex flex-col gap-2">
            <Field name="textAnswer">
              <InputText v-model="textAnswer" class="w-full" />
            </Field>
          </div>
          <ErrorMessage name="date" />
        </div>
      </Form>
    </div>
  </DefaultLayout>
</template>
