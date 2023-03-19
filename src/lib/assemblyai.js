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
            audio_url: url,
            speaker_labels: true,
            summarization: true,
            summary_type: "bullets",
        })
}

// export async function getTranscriptionID_demo() {
//   return assembly
//       .post("/transcript", {
//           audio_url: "https://cdn.assemblyai.com/upload/2e6b2077-5863-444b-836d-4d9d6caa249b",
//           speaker_labels: true
//       })
// }



export async function getTranscript(id) {
    return assembly
        .get(`/transcript/${id}`)
}

// ryef1h547f-7c73-4378-9475-f7db976080b3
export async function getTranscript_demo() {
  return assembly
      .get(`/transcript/rxza5gau3x-5fb0-43aa-bad0-b7a31fb521d7`)
}


export async function getAllTranscripts() {
  return assembly
    .get("/transcript")
}