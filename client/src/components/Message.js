import React from 'react'

const Message = ({ message : {user, textContent}, userName }) => {
  let sentByThisUser = false;
  const trimmedUserName = userName.trim().toLowerCase();
  if(user === trimmedUserName) {
    sentByThisUser = true;
  }
  return (
      <>
      {!sentByThisUser ? 
      <div className='msg left-msg'>
      <div className='msg-bubble'>
        <div className='msg-info'>
          <div className='msg-info-name'>
            <u>John</u>
          </div>
        </div>

        <div className='msg-text'>text content</div>
      </div>
    </div> : 
    <div className='msg right-msg'>
    <div className='msg-bubble'>
      <div className='msg-info'>
        <div className='msg-info-name'>
          <u>Doe</u>
        </div>
      </div>

      <div className='msg-text'>text content</div>
    </div>
  </div> }
    </>
  )
}

export default Message