//import React from "react";
import React, { useState, useEffect } from "react";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-kotlin";
import "ace-builds/src-noconflict/mode-swift";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../editor.css";

import {
  Button,
  TextField,
  Select,
  MenuItem,
  makeStyles,
  createStyles,
  Backdrop,
  CircularProgress,
  LinearProgress,
  Theme,
} from "@material-ui/core";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import { ThemeProvider } from "@material-ui/styles";
import { darkTheme } from "../../../components/MaterialTheming";

import firebase from "../../../components/firebase.js";
import axios from "axios";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {
      display: "grid",
      gridGap: "0 20px",
      gridTemplateRows: "calc(100% - 200px) 200px",
      // "& .ace_selection": {
      //   background: "#ff711e36 !important"
      // },
      "& .ace_gutter": {
        backgroundColor: "#CD853F",
      },
      "& .ace_editor": {
        backgroundColor: "#CD853F",
      },
      "& .ace_support.ace_function": {
        color: "#CD853F",
      },
      [theme.breakpoints.up("sm")]: {
        gridTemplateRows: "unset",
        gridTemplateColumns: "calc(100% - 350px) 330px",
      },
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#4A00FF",
    },
    editor: {
      height: "100% !important",
      width: "100% !important",
      borderBottom: "2px solid #2196F3",
      "& *": {
        fontFamily: "monospace",
      },
      [theme.breakpoints.up("sm")]: {
        borderBottom: "none",
        borderRight: "2px solid #2196F3",
      },
    },
    output: {
      display: "grid",
      gridTemplateRows: "auto 1fr auto",
    },
    selectlang: {
      height: "32px",
      margin: "7px 0",
      textAlign: "left !important",
    },
    runPanel: {
      textAlign: "left !important",
    },
    runBtn: {
      marginRight: 10,
      marginBottom: 50,
    },
    inputModal: {
      height: "fit-content",
      width: "90%",
      maxHeight: 500,
      maxWidth: 400,
      background: "#19202b",
      borderRadius: "5px",
      padding: 15,
      textAlign: "left",
      "& text": {
        display: "block",
        color: "#4A00FF",
        fontSize: "20px",
      },
      "& smallertext": {
        display: "block",
        fontSize: "14px",
      },
    },
    modalInput: {
      width: "100%",
      marginTop: "10px",
    },
    runBtnOnModal: {
      marginTop: "20px",
    },
    buttonProgress: {
      color: "#CD853F",
      margin: "auto",
    },
    outputTitle: {
      color: "#ffffFF",
      margin: "7px 0 50px 0",
      textAlign: "left !important",
      borderTop: "1px solid white",
      marginBottom: "1em",
    },

    outputTerminal: {
      textAlign: "left",
      color: "#4A00FF",
      overflow: "auto",
      whiteSpace: "pre-line",
      fontFamily: "monospace",
      fontSize: "17px",
    },
  })
);
var code1;

function EditorBody({ storeAt, index }) {
  const classes = useStyles();
  const [codeFontSize, setCodeFontSize] = React.useState(16),
    [showLoader, setShowLoader] = React.useState(true),
    [lang, selectlang] = React.useState(""),
    [editorLanguage, setEditorLanguage] = React.useState("c_cpp"),
    [code, setCode] = React.useState(``),
    [code2, setCode2] = React.useState(``),
    [code3, setCode3] = React.useState(``),
    [outputValue, setOutputValue] = React.useState(""),
    [takeInput, setTakeInput] = React.useState(false),
    [executing, setExecuting] = React.useState(false),
    [input, setInput, textareaValue, setTextareaValue] = React.useState("");

  let notOwner = true;

  function setNotOwner(bool) {
    notOwner = bool;
  }

  if (
    localStorage.getItem("codex-codes") &&
    JSON.parse(localStorage.getItem("codex-codes"))[index].key ===
      storeAt.substring(storeAt.indexOf("/") + 1)
  )
    setNotOwner(false);
  console.log("Let edit: " + notOwner);

  console.log(storeAt);

  window.addEventListener("resize", (e) => {
    if (window.innerWidth > 600) {
      setCodeFontSize(20);
    } else {
      setCodeFontSize(14);
    }
  });

  React.useEffect(() => {
    if (window.innerWidth > 600) setCodeFontSize(20);
    else setCodeFontSize(14);

    firebase
      .database()
      .ref(storeAt)
      .once("value")
      .then((snap) => {
        setShowLoader(false);
        selectlang(snap.val().language);
        setCode(snap.val().code);
        /* setCode2(snap.val().code2);
                setCode3(snap.val().code3); */
      });
  }, []);

  React.useEffect(() => {
    if (lang !== "") {
      let langArray = {
        cpp: "c_cpp",
        java: "java",
        c: "c_cpp",
        cs: "csharp",
        rb: "ruby",
        py: "python",
        kt: "kotlin",
        swift: "swift",
      };
      console.log(langArray[lang]);
      setEditorLanguage(langArray[lang]);
    }
    if (lang !== "" && !notOwner) {
      firebase
        .database()
        .ref(storeAt + "/language")
        .set(lang);
      if (localStorage.getItem("codex-codes")) {
        let classNames = JSON.parse(localStorage.getItem("codex-codes"));
        classNames[index].lang = lang;
        localStorage.setItem("codex-codes", JSON.stringify(classNames));
      }
    }
  }, [lang]);

  React.useEffect(() => {
    if (code2.trim() !== "" && !notOwner) {
      firebase
        .database()
        .ref(storeAt + "/code")
        .set(code);
      firebase
        .database()
        .ref(storeAt + "/code2")
        .set(code2);
      firebase
        .database()
        .ref(storeAt + "/code3")
        .set(code3);
    }
  }, [code2, notOwner, storeAt]);

  /*  React.useEffect(() => {
          const codes = [code, code2, code3];
          codes.forEach((codeValue, index) => {
            if (codeValue.trim() !== "" && !notOwner) {
              firebase
                .database()
                .ref(`${storeAt}/code${index + 1}`)
                .set(codeValue);
            }
          });
        }, [code, code2, code3, notOwner, storeAt]); */

  const createExecutionRequest = () => {
    setTakeInput(false);
    setExecuting(true);
    var data = {
      code: code1,

      language: lang,
      input: input,
    };

    var config = {
      method: "post",
      url: "https://api.codex.jaagrav.in",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setExecuting(false);
        if (response.data?.output) setOutputValue(response.data.output);
        if (response.data?.error) {
          setOutputValue((outputValue) => outputValue + response.data?.error);
        }
      })
      .catch(function (error) {
        setExecuting(false);
        setOutputValue("Network Error");
      });
  };

  function SelectLanguage() {
    return (
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        value={lang}
        onChange={(e) => {
          selectlang(e.target.value);
        }}
        variant="outlined"
        className={classes.selectlang}
        disabled={executing}
        disabled={notOwner}
      >
        {<MenuItem value={"py"}>Python3</MenuItem>}
        {<MenuItem value={"c"}>C</MenuItem>}
        {/* { <MenuItem value={"cpp"}>C++</MenuItem> } */}
        <MenuItem value={"java"}>Java</MenuItem>
        {<MenuItem value={"cs"}>C#</MenuItem>}
        {/* { <MenuItem value={"go"}>Golang</MenuItem> } */}
        {<MenuItem value={"js"}>NodeJS</MenuItem>}
      </Select>
    );
  }

  const [time, setTime] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const handleStart = () => {
    setIsRunning(true);
    setTime(1000); // Temps en secondes
    setShowButton(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    setTime(0);
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    let intervalId = null;
    if (isRunning && time > 0) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      alert("Le temps est écoulé !");
      handleStop();
    }else if (time === -1){
        handleStart();
    }
    return () => {
      clearInterval(intervalId);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isRunning, time]);
  const handleBeforeUnload = (event) => {
    event.preventDefault(); // prevent default prompt
    event.returnValue = ""; // set custom message to prompt user
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Backdrop
        className={classes.backdrop}
        open={showLoader}
        onClick={() => {
          setShowLoader(false);
        }}
      >
        <CircularProgress color="#ffffff" />
      </Backdrop>
      <Backdrop
        className={classes.backdrop}
        open={takeInput}
        onClick={() => {
          setTakeInput(false);
          setExecuting(false);
        }}
      >
        <div
          className={classes.inputModal}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <text style={{ color: "#FFFFFF" }}>Input</text>
          <smallertext style={{ color: "#FFFFFF" }}>
            If your code requires an input, please type it down below otherwise
            leave it empty. For multiple inputs, type in all your inputs line by
            line.
          </smallertext>
          <TextField
            id="outlined-basic"
            label="STD Input"
            variant="filled"
            className={classes.modalInput}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            spellCheck={false}
            rowsMax={7}
            multiline
          />
          <Button
            variant="contained"
            color="#00FFFF"
            className={classes.runBtnOnModal}
            startIcon={<PlayArrowRoundedIcon />}
            onClick={createExecutionRequest}
          >
            Run
          </Button>
        </div>
      </Backdrop>
      <div>
        {/* {showButton && (
          <button onClick={handleStart}>Lancer le chronomètre</button>
        )} */}
        {isRunning && (
          <div style={{ color: "#ffffff" }}>
            Temps restant : {time} s{" "}
            <button onClick={handleStop}>Terminer</button>
          </div>
        )}

        <div id="carouselExampleIndicators" class="carousel slide">
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              class="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                style={{
                  color: "#000000",
                  fontSize: 20,
                  padding: "10px",
                  borderRadius: "15px",
                  width: "1000px",
                  height: "500px",
                  resize: "both",
                  boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.25)",
                  border: "2px solid #ccc",
                  backgroundColor: "#f8f8f8",
                }}
                readOnly={notOwner}
              />

              <div>code</div>
              <Button
                size="small"
                variant="contained"
                color="#007bff"
                className={classes.runBtn}
                startIcon={<PlayArrowRoundedIcon />}
                onClick={() => {
                  setTakeInput(true);
                  code1 = code;
                }}
                disabled={executing}
              >
                Run
              </Button>
            </div>
            <div class="carousel-item">
              <textarea
                value={code2}
                onChange={(e) => setCode2(e.target.value)}
                style={{
                  color: "#000000",
                  fontSize: 20,
                  padding: "10px",
                  borderRadius: "15px",
                  width: "1000px",
                  height: "500px",
                  resize: "both",
                  boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.25)",
                  border: "2px solid #ccc",
                  backgroundColor: "#f8f8f8",
                }}
                readOnly={notOwner}
              />

              <div>code 2</div>
              <Button
                size="small"
                variant="contained"
                color="#007bff"
                className={classes.runBtn}
                startIcon={<PlayArrowRoundedIcon />}
                onClick={() => {
                  setTakeInput(true);
                  code1 = code2;
                }}
                disabled={executing}
              >
                Run
              </Button>
            </div>
            <div class="carousel-item">
              <textarea
                value={code3}
                onChange={(e) => setCode3(e.target.value)}
                style={{
                  color: "#000000",
                  fontSize: 20,
                  padding: "10px",
                  borderRadius: "15px",
                  width: "1000px",
                  height: "500px",
                  resize: "both",
                  boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.25)",
                  border: "2px solid #ccc",
                  backgroundColor: "#f8f8f8",
                }}
                readOnly={notOwner}
              />
              <div>code 3</div>
              <Button
                size="small"
                variant="contained"
                color="primary"
                className={classes.runBtn}
                startIcon={<PlayArrowRoundedIcon />}
                onClick={() => {
                  setTakeInput(true);
                  code1 = code3;
                }}
                disabled={executing}
              >
                Run
              </Button>
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>

        <div className={classes.output}>
          <div className={classes.outputTitle}>Output</div>
          <div className={classes.outputTerminal}>{`${outputValue}`}</div>
          <div className={classes.runPanel}>
            {/* <Button
                size="small"
                variant="contained"
                color="primary"
                className={classes.runBtn}
                startIcon={<PlayArrowRoundedIcon />}
                onClick={() => {
                  setTakeInput(true);
                }}
                disabled={executing}
              >
                Run
              </Button> */}
            <SelectLanguage />
            {executing && (
              <LinearProgress size={14} className={classes.buttonProgress} />
            )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default EditorBody ;
