import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ID,Query } from "appwrite";
import { database } from "../appwriteconfig";
import { useAuth } from "./AuthContext";
import conf from "../conf/conf";

const quizContext = createContext()

export const QuizProvider = ({children}) => {

    const {user} = useAuth()

    const [contestPlayerData,setContestPlayerData] = useState({contestId: "",PlayerName: "", Score: ""})
    const [isContest,setIscontest] = useState(false)
    const [questions,setQuestions] = useState([])
    const [contests,setContest] = useState([])
    const [contestQuesData,setContestQuesData] = useState(null)
    const [contestName,setContestName] = useState("")
    const [categories,setCategories] = useState([])
    const [leaderBoard,setLeaderBoard] = useState([])

    const navigate = useNavigate()

    useEffect(()=>{
        getAllContest()
        setIscontest(JSON.parse(window.localStorage.getItem("ContestLive")))
        setContestQuesData(JSON.parse(window.localStorage.getItem("contestQuesData")))
        setContestPlayerData(JSON.parse(window.localStorage.getItem("PlayerData")))
        fetch('https://the-trivia-api.com/v2/categories')
        .then((res) => res.json())
        .then((res) => setCategories(Object.keys(res)))
    },[])
    useEffect(()=>{
        if(contestPlayerData && contestPlayerData.PlayerName?.length>0)
            window.localStorage.setItem("PlayerData",JSON.stringify(contestPlayerData))
    },[contestPlayerData])
    const getAllContest = async () => {
        let response = await database.listDocuments(conf.appwrite_Database_ID, conf.appwrite_Contest_Ques_Collection_ID,[Query.orderDesc("$createdAt"),Query.limit(100)])
        console.log(response)
        setContest(response.documents)
    } 
    useEffect(()=>{
        if(questions && questions.length>0)
        {     
            if(isContest && !contestQuesData)
            {
                setIscontest(false)
                const ques = JSON.stringify(questions);
                createContest({User_ID: user?.$id,ContestName: contestName,Questions: ques})
                getAllContest()
                navigate("")  
            }
            else{
                const quizData = {
                    question : questions,
                    indices : 0,
                    scores : 0
                }
                window.localStorage.setItem("list",JSON.stringify(quizData))

                if(contestQuesData)
                {
                    window.localStorage.setItem("contestQuesData",JSON.stringify(contestQuesData))
                    setIscontest(true)
                    navigate("/contest")
                }
                else{
                    navigate("/quiz")
                }
            }
        }
    },[questions])

    const handleContestPlayerData = (name,value) => {
        setContestPlayerData((prev) => ({...prev, [name] : value}))
        setContestPlayerData((prev) => ({...prev, contestId : contestQuesData?.$id}))
    }

    const createContest = async (contestData) => {
        try{
            let response = await database.createDocument(conf.appwrite_Database_ID,conf.appwrite_Contest_Ques_Collection_ID, ID.unique(),contestData);
            getAllContest()
            
        }catch(error){
            console.error(error)
        }
    }

    const changeIsContestto = (val) =>{
        setIscontest(val)
    }
    
    const fetchQuestions = (e,{limit,difficulties,category}) => {
        e.preventDefault()

        let cat = category.toLowerCase().replace(/ /g,"_").replace("&","and")

        let url = `https://the-trivia-api.com/v2/questions?limit=${limit}&&categories=${cat}&&difficulties=${difficulties}`
        fetch(url)
        .then((res) => res.json())
        .then((res) => setQuestions(res))

    }
    const fetchQuestionsforContest = (e,{limit,difficulties,category,name}) => {
        e.preventDefault()

        setContestName(name)

        let cat = category.toLowerCase().replace(/ /g,"_").replace("&","and")

        let url = `https://the-trivia-api.com/v2/questions?limit=${limit}&&categories=${cat}&&difficulties=${difficulties}`
        fetch(url)
        .then((res) => res.json())
        .then((res) => setQuestions(res))

    }
    const removeContest = async (contest_id) =>{
        await database.deleteDocument(conf.appwrite_Database_ID,conf.appwrite_Contest_Ques_Collection_ID,contest_id);
        getAllContest()
    } 

    const handleContestReq = async (contestData) => {
        console.log("contestData",contestData)
        let response = await database.listDocuments(conf.appwrite_Database_ID, conf.appwrite_Contest_Players_Collection_ID,[Query.equal("contestId", [contestData.$id]),Query.orderDesc("Score"),Query.limit(100)])
        console.log(response)
        window.localStorage.setItem("LeaderBoard",JSON.stringify(response.documents))
        handleContestPlayerData("contestId",contestData.$id)
        setContestQuesData(contestData)
        setQuestions(JSON.parse(contestData.Questions))
        
    }
    const handleContestData = (data) =>{
        setContestQuesData(data)
    }
    const createContestEntry = async () => {
        let item = JSON.parse(window.localStorage.getItem("PlayerData"))
        console.log(item)
        try{
            let response = await database.createDocument(conf.appwrite_Database_ID,conf.appwrite_Contest_Players_Collection_ID, ID.unique(),item);
            console.log("response of player submit: ",response)
        }catch(error){
            console.error(error)
        }
    }

    const quizData ={
        questions,
        categories,
        isContest,
        contests,
        contestQuesData,
        changeIsContestto,
        fetchQuestions,
        fetchQuestionsforContest,
        removeContest,
        handleContestReq,
        handleContestData,
        handleContestPlayerData,
        createContestEntry,
    }

    return(
        <quizContext.Provider value={quizData}>
            {children}
        </quizContext.Provider>
    );
}

export const useQuiz = () => { return useContext(quizContext) }
export default quizContext;