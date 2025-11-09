import Swal from "sweetalert2";
import type { Operator } from "./type/operator";


export default function calculate() {

  const calc = async (a: number, b: number, operator: string) => {

    let isError = false;

    switch(operator) {

      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return a / b;
      case "%":
        return a * (b/100);
      default:


    }

    if(isError) {
      Swal.fire({
        title: "",
        text: "",
        
      })
    }

  };
  
};