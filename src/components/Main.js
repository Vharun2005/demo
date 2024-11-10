import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import "./main.css";
import { FaRegLightbulb } from "react-icons/fa";
import { BsCompass } from "react-icons/bs";
import { Container, Row, Col } from "react-bootstrap";
import { FaRegMessage } from "react-icons/fa6";
import { FaCode } from "react-icons/fa";
import { LuSendHorizonal } from "react-icons/lu";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { RiImageAddFill } from "react-icons/ri";
import { Context } from "../context/Context";
import { BackendContext } from "../context/BackendContext";
import axios from "axios";
import Sidenav from "./Sidenav";

const Main = () => {
  const {
    onsent,
    input,
    setInput,
    resultData,
    setResultdata,
    recentPrompt,
    setRecentPrompt,
    loading,
    setloading,
    showResult,
    setShowresult,
    prevPrompt,
    setPrevprompt,
  } = useContext(Context);
  const { user, dispatch } = useContext(BackendContext);
  axios.defaults.headers.common["Authorization"] = user;
  const token = localStorage.getItem("token");
  const [name, setName] = useState();
  const [Questions, setQuestions] = useState([]);
  const [extended, setExtended] = useState(false);

  const getQuestions = async () => {
    try {
      const getqUestions = await axios.post(
        "https://full-stack-ai-chatbot-1.onrender.com/api/getQuestions",
        { username: name }
      );
      const QuestionsArray = await getqUestions.data;
      setQuestions(QuestionsArray);
      
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
      } else {
        console.log("error occured in data" + err);
      }
    }
  };

  const getUser = async () => {
    try {
      const getUsername = await axios.get("https://full-stack-ai-chatbot-1.onrender.com/api/getuser");
      const name = await getUsername.data;
      setName(name);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
      } else {
        console.log("error occured in data" + err);
      }
    }
  };
  const postQuestions = async (message) => {
    try {
      const newArr = [...Questions, message];
      setQuestions(newArr);
      await axios.post("https://full-stack-ai-chatbot-1.onrender.com/api/postquestions", {
        username: name,
        question: message,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    dispatch({
      type:'LOGOUT'
    })
    localStorage.removeItem('token')
  }

  useEffect(() => {
    getUser();
    if (name) {
      getQuestions();
    }
  }, [name]);

  return (
    <div className="d-flex">
      <div>
        <Sidenav
          Questions={Questions}
          setQuestions={setQuestions}
          postQuestions={postQuestions}
          extended ={extended}
          setExtended = {setExtended}
          logout={logout}
          showResult={showResult}
          setShowresult={setShowresult}
        />
      </div>
      <div className="main" onClick={()=>setExtended(false)}>
        <div className="nav">
          <Nav />
        </div>
        <div>
          {!showResult ? (
            <div className="main-container">
              <div className="text-center cus-to">
                <p className=" display-1 fw-medium mt-2">
                  Hello,{name ? name : "Dev"}
                </p>
                <p className="fs-5 mt-2">How can I help u today ?</p>
              </div>
              <div className="cards">
                <Container>
                  <Row className="d-flex justify-content-center mt-5">
                    <Col
                      className="  ms-3 rounded width custom-card mt-2"
                      lg={2}
                      md={5}
                      sm={3}
                    >
                      <div>
                        <p className=" custom-p">
                          suggest beautiful places to see on an upcoming road
                          trip
                        </p>
                        <p className="fs-3  fw-medium text-end">
                          <span>
                            <FaRegLightbulb />
                          </span>
                        </p>
                      </div>
                    </Col>
                    <Col
                      className="border  rounded ms-3 width custom-card mt-2"
                      lg={2}
                      md={5}
                      sm={3}
                    >
                      <div>
                        <p className=" custom-p">
                          {" "}
                          briefly summarize this concept urban planning
                        </p>
                        <p className="fs-3 fw-medium text-end">
                          <span>
                            <BsCompass />
                          </span>
                        </p>
                      </div>
                    </Col>
                    <Col
                      className="border  rounded ms-3 width custom-card mt-2"
                      lg={2}
                      md={5}
                      sm={3}
                    >
                      <div>
                        <p className=" custom-p">
                          Brainsform team bonding activities for our work
                          retreat
                        </p>
                        <p className="fs-3  fw-medium text-end">
                          <span>
                            <FaRegMessage />
                          </span>
                        </p>
                      </div>
                    </Col>
                    <Col
                      className="border  rounded ms-3 width custom-card mt-2"
                      lg={2}
                      md={5}
                      sm={3}
                    >
                      <div>
                        <p className=" custom-p">
                          Improve the readability of the following code to get
                          idea
                        </p>
                        <p className="fs-3  fw-medium text-end">
                          <span>
                            <FaCode />
                          </span>
                        </p>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
          ) : (
            <Container className="mt-5">
              <div className="result-container">
                <div className="result-title d-flex">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/9385/9385289.png"
                    width={30}
                    height={30}
                    alt="user"
                  ></img>
                  <p className="fs-5 fw-medium text-info">{recentPrompt}</p>
                </div>
                <div className="res-data d-flex mt-4">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/2048px-ChatGPT_logo.svg.png"
                    width={30}
                    height={30}
                    alt=''
                  ></img>
                  {loading ? (
                    <div className="loader">
                      <hr />
                      <hr />
                      <hr />
                    </div>
                  ) : (
                    <p
                      className=" line fw-medium pb-5"
                      dangerouslySetInnerHTML={{ __html: resultData }}
                    ></p>
                  )}
                </div>
              </div>
            </Container>
          )}
        </div>
        <div className="cus-container  custom-search ">
          <Container className="d-flex justify-content-center">
            <div className="main-bottom border rounded  w-75 cus-media ">
              <div className="search-box d-flex justify-content-between">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="m-2 w-75 cus-input"
                  placeholder="Enter the prompt here"
                ></input>
                <div className="d-flex cusicon">
                  <p
                    onClick={() => onsent(input)}
                    className="pe-2 fs-4 fw-medium mt-2"
                    style={{ cursor: "pointer" }}
                  >
                    <LuSendHorizonal onClick={() => postQuestions(input)} />
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Main;
