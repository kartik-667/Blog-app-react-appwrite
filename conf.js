const conf={
    vite_test:String(import.meta.env.VITE_TEST),
    project_id:String(import.meta.env.VITE_APPWRITE_PROJECTID),
    database_url:String(import.meta.env.VITE_DATABASE_URL),
    collection_id:String(import.meta.env.VITE_COLLECTION_ID),
    appwrite_url:String(import.meta.env.VITE_APPWRITE_URL),
    bucket_id:String(import.meta.env.VITE_BUCKET_ID),

}

export default conf