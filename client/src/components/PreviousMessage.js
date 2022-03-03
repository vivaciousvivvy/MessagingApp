import React from 'react'
import ReactEmoji from 'react-emoji'

const PreviousMessage = ({ message, userName }) => {
    let currentMessage = message.split(':');
    let sentByThisUser = false;
    const trimmedUserName = userName.trim().toLowerCase();
    if(currentMessage[0] === trimmedUserName) {
      sentByThisUser = true;
    }
    return (
        <>
        {!sentByThisUser ? (
        <div className='msg left-msg'>
        <div className='msg-bubble'>
          <div className='msg-info'>
            <div className='msg-info-name'>
              <u>{currentMessage[0]}</u>
            </div>
          </div>
  
          <div className='msg-text'>{ ReactEmoji.emojify(currentMessage[1])}</div>
        </div>
      </div> ) : ( 
      <div className='msg right-msg'>
      <div className='msg-bubble'>
        <div className='msg-info'>
          <div className='msg-info-name'>
            <u>{currentMessage[0]}</u>
          </div>
        </div>
  
        <div className='msg-text'>{ ReactEmoji.emojify(currentMessage[1])}</div>
      </div>
    </div>
    )}
      </>
    )
}

export default PreviousMessage