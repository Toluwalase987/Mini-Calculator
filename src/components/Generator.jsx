import Button from "./Button"
import '../components/css/Generator.css'
import { FaDivide, FaTimes, FaPlus, FaMinus, FaEquals, FaPercentage } from "react-icons/fa";
import { TbSquareRoot } from "react-icons/tb"
import { useReducer } from "react";

const ADDITIONSYMBOL = 'addition-symbol'
const MINUSSYMBOL = 'minus-symbol'
const DIVISIONSYMBOL = 'division-symbol'
const TIMESSYMBOL = 'times-symbol'
const CLEARFORM = 'clear-form'
const INPUTFIELD = 'input-field'
const SQUAREROOT = 'square-root'
const SETRESULT = 'set-result'

const reducer = (state, action)=>{
    switch(action.type){
        case ADDITIONSYMBOL:
            return {
                ...state,
                sign: '+'
            }
        case MINUSSYMBOL:
            return {
                ...state,
                sign: '-'
            }
        case DIVISIONSYMBOL:
            return {
                ...state,
                sign: '/'
            }
        case TIMESSYMBOL:
            return {
                ...state,
                sign: '*'
            }
        case CLEARFORM:
            return {
                ...state,
                formData: {
                    firstNumber:'',
                    secondNumber:''
                },
                result: 0,
                sign: ''
            }
        case INPUTFIELD:
            return {
                ...state,
                formData: action.payload
             }
        case SQUAREROOT:
            const result = Math.sqrt(parseFloat(state.result));
            return {
                ...state,
                result,
        };
        case SETRESULT:
            return {
                ...state,
                result: action.payload
             }
        default:
            return state;
    }
}


export default function Generator(){
    const [state, dispatch] = useReducer(reducer, {
        formData: {
            firstNumber: '',
            secondNumber: '',
        },
        result: 0,
        sign: ''
    })
    
    function handleChange(e) {
        const { name, value } = e.target;
        dispatch({
          type: INPUTFIELD,
          payload: {
            ...state.formData,
            [name]: value,
          },
        });
      }
      
      

    function handleSquareRoot(e) {
        e.preventDefault()
        dispatch({
            type: SQUAREROOT
        });
      }

      function handleSubmit(e) {
        e.preventDefault();
        let result;
        if (state.sign === '+') {
          result = parseFloat(state.formData.firstNumber) + parseFloat(state.formData.secondNumber);
        } else if (state.sign === '*') {
          result = parseFloat(state.formData.firstNumber) * parseFloat(state.formData.secondNumber);
        } else if (state.sign === '-') {
          result = parseFloat(state.formData.firstNumber) - parseFloat(state.formData.secondNumber);
        } else if (state.sign === '/') {
          result = parseFloat(state.formData.firstNumber) / parseFloat(state.formData.secondNumber);
        } else {
          return;
        }

        dispatch({
            type: SETRESULT,
            payload: result
        })
      }
      
        
      function handleClear(e) {
        e.preventDefault();
        dispatch({
            type:CLEARFORM
        })
      }

    function handleAddition(e){
        e.preventDefault()
        dispatch({
            type: ADDITIONSYMBOL
        })
    }
    function handleMultiplication(e){
        e.preventDefault()
        dispatch({
            type:TIMESSYMBOL
        })
    }
    function handleSubtraction(e){
        e.preventDefault()
        dispatch({
            type:MINUSSYMBOL
        })
    }
    function handleDivision(e){
        e.preventDefault()
        dispatch({
            type:DIVISIONSYMBOL
        })
    }

    return (
        <div className="generator">
            <div className="result">{state.result}</div>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} name='firstNumber' value={state.formData.firstNumber} className="input1" type="number"/>
                <label className="sign">{state.sign}</label>
                <input onChange={handleChange} name='secondNumber' value={state.formData.secondNumber} className="input2" type="number"/><br/>
               
                <Button onClick={handleAddition} style={{marginTop:'70px', marginRight:'10px', width: '100px'}}>
                    <FaPlus/>
                </Button>
                <Button onClick={handleMultiplication} style={{width: '100px'}}>
                        <FaTimes/>
                </Button>
                <Button onClick={handleSubtraction} style={{marginLeft:'10px', width: '100px'}}>
                        <FaMinus/>
                </Button><br/>
                <Button onClick={handleSquareRoot} style={{marginTop:'30px', marginRight:'10px', width: '100px'}}>
                    <TbSquareRoot/>A
                </Button>
                <Button onClick={handleDivision} style={{width: '100px'}}>
                    <FaDivide/>
                </Button>
                <Button onClick={handleClear} 
                    style={{marginLeft:'10px', width: '100px'}}>AC</Button><br/>
                <Button onSubmit={handleSubmit} style={{marginTop:'40px', padding:"20px", width: '200px'}}>
                    <FaEquals/>
                </Button>
            </form>
        </div>
    )
}