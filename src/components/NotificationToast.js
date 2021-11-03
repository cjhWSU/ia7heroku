import React from 'react';

class NotificationToast extends React.Component {

    render() {
        return(
            <div className="toast-container">
                <p className="toast-text">{this.props.message}</p>
                <button className="toast-close" onClick={() => this.props.removeToast()}>&times;</button>
            </div>
        )
    }
}

export default NotificationToast;