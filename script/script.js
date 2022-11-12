class Calculator{
  constructor(p_display, c_display){
    this.p_display = p_display
    this.c_display = c_display
    this.clear()
  }

  clear(){
    this.previous_local = ''
    this.current_local = ''
    this.op = undefined
  }
  
  delet(){
    this.current_local = this.current_local.toString().slice(0, -1)
  }

  append(num){
    if (num === "." && this.current_local.includes('.'))return
    this.current_local = this.current_local.toString() + num.toString()
    console.log(this.current_local)
  }

 op_selection(op){
  if(this.current_local==='')return
  if(this.previous_local !== ''){
    this.calc()
  }
  this.op = op
  this.previous_local = this.current_local
  this.current_local = ''
 }

 calc(){
  let calc
  const p_value = parseFloat(this.previous_local)
  const c_value = parseFloat(this.current_local)
  if(isNaN(p_value) || isNaN(c_value)) return
  switch(this.op){
    case '+':
      calc = p_value + c_value
      break
    case '-':
      calc = p_value - c_value
      break
    case 'x':
      calc = p_value * c_value
      break  
    case '÷':
      calc = p_value / c_value
      break 
    default: 
      return   
  }
  this.current_local = calc
  this.op = undefined
  this.previous_local= ''
 }

 updateDisplay(){
  this.c_display.innerText=this.current_local
  this.p_display.innerText=this.previous_local
 }
}

const num_btn = document.querySelectorAll('[data-num]')
const op_btn = document.querySelectorAll('[data-op]')
const equal_btn = document.querySelector('[data-equal]')
const clear_btn = document.querySelector('[data-clear]')
const del_btn = document.querySelector('[data-del]')
const p_display = document.querySelector('[data-previous]')
const c_display = document.querySelector('[data-current]')

const calculator = new Calculator (p_display,c_display)


clear_btn.addEventListener('click',()=>{
  calculator.clear()
  calculator.updateDisplay()
})

num_btn.forEach(button => {
  button.addEventListener('click',()=>{
    calculator.append(button.innerText)
    calculator.updateDisplay()
  })
})

op_btn.forEach(button => {
  button.addEventListener('click',()=>{
    calculator.op_selection(button.innerText)
    calculator.updateDisplay()
  })
})

equal_btn.addEventListener('click', button =>{
  calculator.calc()
  calculator.updateDisplay()
})

del_btn.addEventListener('click', button =>{
  calculator.delet()
  calculator.updateDisplay()
})