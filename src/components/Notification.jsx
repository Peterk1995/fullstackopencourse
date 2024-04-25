const Notification = ({ notification }) => {
    if (notification === null) {
        return null
    }

    const className = notification.type === 'success' ? 'popup' : 'error';

    return (
        <div className={className}>
            {notification.message}
        </div>
    )
}

export default Notification