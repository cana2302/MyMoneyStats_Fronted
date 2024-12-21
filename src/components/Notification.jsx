const Notification = ({ message, messageType }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={messageType ? 'notification' : 'error'}>
      {message}
    </div>
  )
}

export default Notification