<template>
  <div class="calculator-wrapper">
    <div :class="['calculator', `calculator-${props.theme}`]">
      <!-- 디스플레이 -->
      <div class="display">
        <div class="display-history">{{ displayHistory }}</div>
        <div class="display-current">{{ displayValue }}</div>
      </div>

      <!-- 버튼 그리드 -->
      <div class="buttons">
        <!-- 첫 번째 줄: AC, ±, %, ÷ -->
        <button class="btn btn-function" @click="clearAll">AC</button>
        <button class="btn btn-function" @click="toggleSign">±</button>
        <button class="btn btn-function" @click="setPercentage">%</button>
        <button class="btn btn-operator" @click="setOperator('/')">÷</button>

        <!-- 두 번째 줄: 7, 8, 9, × -->
        <button class="btn btn-number" @click="calculatorInput('7')">7</button>
        <button class="btn btn-number" @click="calculatorInput('8')">8</button>
        <button class="btn btn-number" @click="calculatorInput('9')">9</button>
        <button class="btn btn-operator" @click="setOperator('×')">×</button>

        <!-- 세 번째 줄: 4, 5, 6, - -->
        <button class="btn btn-number" @click="calculatorInput('4')">4</button>
        <button class="btn btn-number" @click="calculatorInput('5')">5</button>
        <button class="btn btn-number" @click="calculatorInput('6')">6</button>
        <button class="btn btn-operator" @click="setOperator('-')">-</button>

        <!-- 네 번째 줄: 1, 2, 3, + -->
        <button class="btn btn-number" @click="calculatorInput('1')">1</button>
        <button class="btn btn-number" @click="calculatorInput('2')">2</button>
        <button class="btn btn-number" @click="calculatorInput('3')">3</button>
        <button class="btn btn-operator" @click="setOperator('+')">+</button>

        <!-- 다섯 번째 줄: 0, ., = -->
        <button class="btn btn-number btn-zero" @click="calculatorInput('0')">0</button>
        <button class="btn btn-number" @click="inputDecimal">.</button>
        <button class="btn btn-equals" @click="calculatorExec">=</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  
  import type { CalculatorProps } from '@/types/CalculatorProps';
  import { useSwal } from '@/utils/sweetalert2/composable/SwalModule.ts';
  import { ref, computed, onMounted, onUnmounted } from 'vue';

  const swalModule = useSwal();

  const currentValue = ref<string>('0');
  const previousValue = ref<string>('0');
  const calcOperator = ref<string>('');
  const waitingForOperand = ref<boolean>(false);


  const displayHistory = ref<string>('');
  const displayValue = computed(() => {
    return currentValue.value;
  });

  const props = withDefaults(defineProps<CalculatorProps>(), {
    theme: "default"
  });

  const clearAll = async () => {
    currentValue.value = '0';
    previousValue.value = '';
    calcOperator.value = '';
    waitingForOperand.value = false;
    displayHistory.value = '';
  };

  const handleKeyPress = (event: KeyboardEvent) => {

    const eventKey = event.key;
    const currValueLength = currentValue.value.length;

    /^[0-9]$/.test(eventKey) && (function() {
      calculatorInput(eventKey);
    })();

    eventKey === '.' && (function() {
      inputDecimal();
    })();

    (eventKey === '+' || eventKey === "-" || eventKey === "x" || eventKey === "/" ) && (function() {
      setOperator(eventKey);
    })();

    (eventKey === "%") && (function() {
      setPercentage();
    });

    (eventKey === 'Enter' || eventKey === '=') && (function() {
      calculatorExec();
    })();

    (eventKey === "Escape" || eventKey === "c" || eventKey === "C") && (function() {
      clearAll();
    })();

    (eventKey === "Backspace" && currValueLength > 1) && (function() {
      currentValue.value = currentValue.value.slice(0, -1);
    })();

    (eventKey === "Backspace" && currValueLength < 1) && (function(){
      currentValue.value = '0';
    })();

  };

  const calculatorInput = async (num: string) => {

    await (waitingForOperand.value == true) && (async function() { 
      currentValue.value = num;
      waitingForOperand.value = false;
    })();

    await (waitingForOperand.value == false && num == '0') && (async function() {
      currentValue.value = num;
    })();

    await (waitingForOperand.value == false && num != '0') && (async function() {
      
      if(currentValue.value === '0') currentValue.value = currentValue.value.slice(0 , -1);
      
      if(currentValue.value.length < 12) {
        currentValue.value += num;
      }
    })();

  };

  // 부호 변경
  const toggleSign = () => {

    if (currentValue.value === '0' || currentValue.value === 'Error') {
      return;
    }

    if (currentValue.value.startsWith('-')) {
      currentValue.value = currentValue.value.slice(1);
    } else {
      currentValue.value = '-' + currentValue.value;
    }

  };

  const setOperator = async (oper: string) => {

    await calcOperator.value && !waitingForOperand.value && (async function() {
      calculatorExec();
    })();

    previousValue.value = currentValue.value;
    calcOperator.value = oper;

    displayHistory.value = `${previousValue.value} ${oper}`;
    currentValue.value = '0';
    
  };

  // 퍼센트
  const setPercentage = () => {
    const value = parseFloat(currentValue.value);
    currentValue.value = (value / 100).toString();
  };

  const calculatorExec = async () => {

    if(!calcOperator.value || !previousValue.value) return false;

    const prevValue = parseFloat(previousValue.value);
    const currValue = parseFloat(currentValue.value);

    let resultValue = 0;

    switch(calcOperator.value) {
      case "+":
        resultValue = prevValue + currValue;
        break;
      case "-":
        resultValue = prevValue - currValue;
        break;
      case "x":
        resultValue = prevValue * currValue;
        break;
      case "/":
         currValue === 0 && (async function() {
          swalModule.error("입력값 오류", "0은 나눌수 없습니다").then(function() {
            currentValue.value = "0";
            calcOperator.value = '';
            previousValue.value = '';
            displayHistory.value = '';
          });
          return false;
        })();
        currValue !== 0 && (async function() {
          resultValue = prevValue / currValue;
        })();
        break;
      default:
        (async function() {
          swalModule.error("기호 오류", "잘못된 기호입니다.").then(function() {
            currentValue.value = "0";
            calcOperator.value = '';
            previousValue.value = '';
            displayHistory.value = '';
          });
          return false;
        })();
        break;

    }

    // 결과를 문자열로 변환 ( 소수점 처리 )
    const resultStr = resultValue.toString();

    await resultStr.length > 12 && (async function() {
      currentValue.value = parseFloat(resultStr).toExponential(6);
    })();

    await resultStr.length < 12 && (async function() {
      currentValue.value = resultStr;
    })();

    // 히스토리 업데이트
    displayHistory.value = `${prevValue} ${calcOperator.value} ${currValue} = ${resultValue}`;
    calcOperator.value = '';
    previousValue.value = '';
    waitingForOperand.value = true;

  };

  // 소수점 입력
  const inputDecimal = () => {
    if (waitingForOperand.value) {
      currentValue.value = '0.';
      waitingForOperand.value = false;
      return;
    }

    if (!currentValue.value.includes('.')) {
      currentValue.value += '.';
    }
  };

  onMounted(() => {
    window.addEventListener("keydown", handleKeyPress);
  });

  onUnmounted(() => {
    window.removeEventListener("keydown", handleKeyPress);
  });

</script>

<style>
  @import url("@/assets/css/Calculator.css");
</style>
