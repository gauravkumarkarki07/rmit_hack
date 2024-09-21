import { useState } from "react"
import InputField from "../components/InputField"

function Index() {
  const [transcribedMessage, setTranscribedMessage] = useState<string>();
  const [summarizedData, setSummarizedData] = useState<string>();

  const setData = (data: string) => {
    setTranscribedMessage(data)
  }

  const setSummarized = (data: string) => {
    setSummarizedData(data);
  }
  return (
    <section className="flex flex-col relative min-h-screen justify-between bg-gray-200">
      <section className="py-2 mx-20 border border-black mt-2 px-2 rounded-lg flex flex-col h-[100px]">
        <span className="text-lg text-black">Transcribed Message</span>
        {transcribedMessage ?
          <p className="text-gray-500 text-sm overflow-y-auto">
            {transcribedMessage}
          </p>
          :
          <p className="text-gray-500 text-sm">
            Record your message
          </p>
        }
      </section>
      <section className="flex flex-col py-2 px-20 items-center justify-center overflow-y-auto ">
        {summarizedData ? (
          <p>
            {summarizedData}
          </p>
        ) : (
          <p className="text-gray-500 text-sm">No summarized data yet</p>
        )}
      </section>
      <section className="sticky bottom-0 flex items-center justify-center w-full bg-gray-400 py-2 h-full rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60
">
        <InputField setTranscribedData={setData} setSummarized={setSummarized} />
      </section>
    </section>
  )
}

export default Index