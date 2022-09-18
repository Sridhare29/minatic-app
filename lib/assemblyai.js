// Call Assembly API

const axios = require("axios")
// const audioURL = "https://bit.ly/3yxKEIY"

const assembly = axios.create({
  baseURL: "https://api.assemblyai.com/v2",
  headers: {
    authorization: "224ddc6c7759424780cd544db3b788c6",
    "content-type": "application/json",
  },
})

export async function uploadMeetingAudio(audioFile) {
    return assembly
        .post("/upload", audioFile)
        // .then((res) => setUploadURL(res.data.upload_url))
        // .catch((err) => console.error(err))
}

export async function getTranscriptionID(url) {
    return assembly
        .post("/transcript", {
            audio_url: url
        })
}



export async function getTranscript(id) {
    return assembly
        .get(`/transcript/${id}`)
}

export async function getAllTranscripts() {
  return assembly
    .get("/transcript")
}