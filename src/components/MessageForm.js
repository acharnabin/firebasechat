import React, { useRef, useState } from "react";
import Attachment from "./svg/Attachment";

const MessageForm = ({ handleSubmit, text, setText, setImg }) => {
  console.log("text", text.length);
  const [navigatorSafari, setSafariNavigator] = useState(null);
  const [file, setfile] = useState("");
  const [url, sturl] = useState("");
  let chunks2 = [];

  const stopRecording = () => {
    console.log("ami stop");
    navigatorSafari?.stop();

  };
  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        let navigatorInstance = new MediaRecorder(stream);

        // Initalize_mediaRecorderWithNavigator3();

        navigatorInstance.ondataavailable = (e) => {
          // setStore_recorded_blobs([...store_recorded_blobs, e.data]);
          chunks2.push(e.data);
        };

        navigatorInstance.onpause = (e) => {
          //on pause get the blob
        };

        navigatorInstance.onstop = (e) => {
          let audioBlob = new Blob(chunks2, {
            type: "audio/wav",
          });

          const audioUrl = URL.createObjectURL(audioBlob); //convert blob to URL

          console.log(audioUrl);

          sturl(audioUrl);

          //   setFile(audioUrl);
          //
          // let temp = [...store_recorded_blobs, audioBlob];
          // setStore_recorded_blobs(temp);

          // chunks = [];
          let mergedFiles = [];

          async function conevrtTofile() {
            let file2 = await fetch(audioUrl)
              .then((r) => r.blob())
              .then(
                (blobFile) =>
                  new File([blobFile], `rrt.wav`, {
                    type: "audio/wav",
                    lastModified: new Date().getTime(),
                  })
              );

            console.log(file2);

            setfile(file2);

            // setLatestFile(file2);
            // downloadFile(file2);

            // mergedFiles = updateRecorededFiles(file2);
          }

          // async function conevrtTofile2() {
          //   let file2 = await fetch(audioUrl)
          //     .then((r) => r.blob())
          //     .then(
          //       (blobFile) =>
          //         new File([blobFile], `${generateId()}.wav`, {
          //           type: "audio/wav",
          //           lastModified: new Date().getTime(),
          //         })
          //     );

          //   const form = new FormData();

          //   // dispatch(set_recorded_audio(mediaURL));
          //   form.append("audio", file2);
          //   form.append("caseInfoId", caseInfoId);
          //   dispatch(uploadAudioFiles(form));
          // }

          conevrtTofile();

          // if (recording_start_counter === 1) {
          //   console.log("upload file on single stop");
          //   // conevrtTofile2();
          // } else {
          //   console.log("upload file on multiple pause");
          //   // conevrtTofile();
          //   // setLoading2(false);
          // }

          // For stoping the recording icon in the chrome
          let tracks = stream.getTracks();

          tracks.forEach(function (track) {
            track.stop();
          });

          // OnStopMakeFile(store_recorded_blobs);
        };
        navigatorInstance.onerror = (e) => {};

        navigatorInstance.start();

        // errorCallback

        setSafariNavigator(navigatorInstance);
        // setRecording_status("recording");
        // setFile(null);
        // setPlaying(true);
        // setRecordingStart(true);
        // setIsActive(true);

        // setStatus("recording");
      })
      .catch((e) => {
        console.log(e, "error");
      });
  };

  const audioref=useRef()

  return (
    <>
      {file !== '' && (
        <audio controls   ref={audioref}>
           <source src={url} type='audio/wav' />
        </audio>
      )}

      <form className="message_form" onSubmit={handleSubmit}>
        <label htmlFor="img">
          <Attachment />
        </label>
        <input
          onChange={(e) => setImg(e.target.files[0])}
          type="file"
          id="img"
          accept="image/*"
          style={{ display: "none" }}
        />
        <div>
          <input
            type="text"
            placeholder="Enter message"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={text?.length === 0 ? true : false}
            className="btn"
          >
            Send
          </button>
        </div>
        <button onClick={startRecording} type="button">
          Recording
        </button>
        <button onClick={stopRecording} type="button">
          Stop
        </button>
      </form>
    </>
  );
};

export default MessageForm;
