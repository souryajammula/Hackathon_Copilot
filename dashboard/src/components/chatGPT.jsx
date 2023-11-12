// import React from "react";
// import "./chatGPT.css"; 
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";

// const ChatGPT = () =>{


//     const openChatbotModal = () => {
//         // Trigger Bootstrap modal by its ID
//         const modal = document.getElementById("chatbotModal");
//         if (modal) {
//           modal.style.display = "block";
//         }
//     };

//     const closeChatbotModal = () => {
//         // Close Bootstrap modal by its ID
//         const modal = document.getElementById("chatbotModal");
//         if (modal) {
//           modal.style.display = "none";
//         }
//       };
    

//     return (
//         <div>
//             <h1>Chat GPT</h1>


//             <button onClick={openChatbotModal} className="btn btn-primary">
//         Open Chatbot
//       </button>


// {/* Bootstrap Modal */}
// <div className="modal" id="chatbotModal">
//         <div className="modal-dialog modal-lg">
//           <div className="modal-content">
//             {/* Modal Header */}
//             <div className="modal-header">
//               <h4 className="modal-title">Chatbot</h4>
//               <button
//                 type="button" class="close btn btn-light" className="close" data-dismiss="modal" aria-label="Close" onClick={closeChatbotModal}>
//                 &times;
//               </button>
//             </div>

//             {/* Modal Body */}
//             <div className="modal-body">
//               {/* Your chatbot UI content goes here */}
//               <div className="chatbot-container">
//                 {/* Chatbot messages and input */}
//                 {/* ... */}

//                 <div>
//                     <div className="chat-history">
//                         <div className="message">Hello, how can I help you?</div>
//                         <div className="message">This is a response.</div>
//                         <div className="message">Hello, how can I help you?</div>
//                         <div className="message">This is a response.</div><div className="message">Hello, how can I help you?</div>
//                         <div className="message">This is a response.</div><div className="message">Hello, how can I help you?</div>
//                         <div className="message">This is a response.</div><div className="message">Hello, how can I help you?</div>
//                         <div className="message">This is a response.</div><div className="message">Hello, how can I help you?</div>
//                         <div className="message">This is a response.</div><div className="message">Hello, how can I help you?</div>
//                         <div className="message">This is a response.</div><div className="message">Hello, how can I help you?</div>
//                         <div className="message">This is a response.</div><div className="message">Hello, how can I help you?</div>
//                         <div className="message">This is a response.</div><div className="message">Hello, how can I help you?</div>
//                         <div className="message">This is a response.</div>
//                     </div>
//                 </div>

//                 <div className="row userInputClass">
//                     <div className="col-lg-10">
//                         <input className="margin20" type="text" id="inputTextBox" name="inputTextBox"  placeholder="Type a new Question(eg:- Does my plan cover annual eye exams?)🙋‍♂️" />
//                     </div>

//                     <div className="submitClass col-lg-2">
//                         <button type="button" class="btn btn-primary">Submit</button>
//                     </div>
//                 </div>

//               </div>
//             </div>
//           </div>
//         </div>
//       </div>



//         </div>
//     )
// }

// export default ChatGPT;






import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import "./chatGPT.css"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const ChatGPT = () =>{

    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const chatContainerRef = useRef(null);
    const scrollToBottom = useRef(null);

    useEffect(()=>{
        console.log("FFFFFFFFF");
        setUserInput('');
    },[]);

    useEffect(() => {
        if (scrollToBottom.current) {
          scrollToBottom.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, [chatHistory]);
    
    
      useEffect(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, [chatHistory]);


      const LoadingAnimation = () => {
        return (
          <div className="loading-animation">
            <img src="/loading.gif" alt="Loading..." />
            <div className="loading-text">Loading...</div>
          </div>
        );
      };


    const openChatbotModal = () => {
        const modal = document.getElementById("chatbotModal");
        if (modal) {
          modal.style.display = "block";
        }
    };

    const closeChatbotModal = () => {
        const modal = document.getElementById("chatbotModal");
        if (modal) {
          modal.style.display = "none";
        }
      };


    const backendCall = async () =>{
        setIsLoading(true);
        try{
            console.log(userInput);
            const res = await axios.post("http://localhost:8000/chat",{
                user_input: userInput,
            })
        }
        catch (error) {
            console.log(error);
        }
        finally{
            setIsLoading(false);
            setUserInput('');
            getChatHistory();
        }  
    };

    const getChatHistory = async () => {
        try {
          const res = await axios.get('http://localhost:8000/get_chat_history');
          setChatHistory(res.data);
          console.log("RES:::::",res);
        } catch (error) {
          console.error('Error fetching chat history:', error);
        }
      };
    

    return (
        <div>
            <h1>Chat GPT</h1>

            <button onClick={openChatbotModal} className="btn btn-primary">Open Chatbot</button>
            <button onClick={backendCall} className="btn btn-primary">Call</button>

{/* Bootstrap Modal */}
<div className="modal" id="chatbotModal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">

            <div className="modal-header">
              <h4 className="modal-title">Chatbot</h4>
              <button
                type="button" class="close btn btn-light" className="close" data-dismiss="modal" aria-label="Close" onClick={closeChatbotModal}>
                &times;
              </button>
            </div>

            <div className="modal-body">

              <div className="chatbot-container">


                <div>
                    <div className="chat-history">
                        <div className="responseClass chat-container" ref={chatContainerRef}>
                        {chatHistory.map((message, index) => (
                        <div
                            key={index}
                            className={message.user === 'User' ? 'user-message' : 'bot-message'}
                        >
                            {message.text}
                        </div>
                        ))}
                        {isLoading && <LoadingAnimation />}
                        <div ref={scrollToBottom}></div>
                    </div>
                    </div>
                </div>

                <div className="row userInputClass">
                    <div className="col-lg-10">
                        {/* <input className="margin20" type="text" value={userInput} id="inputTextBox" name="inputTextBox" onChange={e => setUserInput(e.target.value)} placeholder="Your question🙋‍♂️" /> */}

                        <input className="margin20" type="text" value={userInput} id="inputTextBox" name="inputTextBox" onChange={e => setUserInput(e.target.value)} placeholder="Type a new Question(eg:- Does my plan cover annual eye exams?)🙋‍♂️" />
                    </div>

                    <div className="submitClass col-lg-2">
                        <button type="button" onClick={backendCall} class="btn btn-primary">Submit</button>
                    </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>



        </div>
    )
}

export default ChatGPT;