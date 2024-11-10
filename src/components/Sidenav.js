import React, { useContext, useState } from "react";
import "./sidenav.css";
import { MdMenu } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";
import { FaRegMessage } from "react-icons/fa6";
import { AiOutlineFieldTime } from "react-icons/ai";
import { RiQuestionMark } from "react-icons/ri";
import { Context } from "../context/Context";
import { IoIosLogOut } from "react-icons/io";

const Sidenav = ({
  Questions,
  setQuestions,
  postQuestions,
  extended,
  setExtended,
  logout,
}) => {
  const { setShowresult, setInput } = useContext(Context);

  return (
    <div className={extended ? "m back" : "m"}>
      <MdMenu
        className="menu-bar"
        onClick={() => setExtended(!extended)}
        height={200}
        width={200}
      />
      <nav className={extended ? "show sidenav" : "noShow sidenav"}>
        <div className="top">
          <div>
            <p className="recent-p">Recent</p>
            <div className="RECENT-MAIN">
              {Questions.length ? (
                <ul>
                  {Questions.map((item) => (
                    <div className="recent-div d-flex">
                      <FaRegMessage className="recent" />
                      <li className="questions" onClick={() => setInput(item)}>
                        {item}
                      </li>
                    </div>
                  ))}
                </ul>
              ) : (
                <p>No recent Chats</p>
              )}
            </div>
          </div>
        </div>
        <div className="bottom">
          <a
            href="https://support.google.com/gemini/?hl=en#topic=15280100"
            target="_blank"
          >
            <div className="help-div mt-3">
              <RiQuestionMark className="help" />
               <p>Help</p>
            </div>
          </a>
          <div className="setting-div" onClick={() => logout()}>
            <IoIosLogOut className="setting" />
             <p>LogOut</p>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidenav;
