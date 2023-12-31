import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

const quizContext = createContext()

export const QuizProvider = ({children}) => {

    const [questions,setQuestions] = useState([])
    const [categories,setCategories] = useState([])

    const navigate = useNavigate()

    useEffect(()=>{
        fetch('https://the-trivia-api.com/v2/categories')
        .then((res) => res.json())
        .then((res) => setCategories(Object.keys(res)))
    },[])
    
    const fetchQuestions = (e,{limit,difficulties,category}) => {
        e.preventDefault()

        let cat = category.toLowerCase().replace(/ /g,"_").replace("&","and")

        let url = `https://the-trivia-api.com/v2/questions?limit=${limit}&&categories=${cat}&&difficulties=${difficulties}`
        fetch(url)
        .then((res) => res.json())
        .then((res) => setQuestions(res))

        navigate('/quiz')

    }

    const quizData ={
        questions,
        categories,
        fetchQuestions,
    }

    return(
        <quizContext.Provider value={quizData}>
            {children}
        </quizContext.Provider>
    );
}

export const useQuiz = () => { return useContext(quizContext) }
export default quizContext;