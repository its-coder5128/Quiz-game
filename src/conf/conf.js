const conf = {
    appwrite_url : String(import.meta.env.VITE_APPWRITE_URL),
    appwrite_Project_ID : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwrite_Database_ID : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwrite_Contest_Ques_Collection_ID : String(import.meta.env.VITE_APPWRITE_CONTEST_QUESTIONS_COLLECTION_ID),
    appwrite_Contest_Players_Collection_ID : String(import.meta.env.VITE_APPWRITE_CONTEST_PLAYERS_COLLECTION_ID),
}

export default conf