import React, { useEffect, useState } from "react";

export default function CommentForm(props) {

    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(props.loading);
    }, [props.loading]);


    const handleFieldChange = event => {
        setMessage(event.target.value);
        setError(null);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!isFormValid()) {
            setError("Please enter message");
            return;
        }
        props.addComment(message);
        setMessage('');
    }

    const isFormValid = () => {
        return message !== "";
    }

    const renderError = () => {
        return error ? (
            <div className="alert alert-danger">{error}</div>
        ) : null;
    }

    return (
        <React.Fragment>
            <form method="post" onSubmit={onSubmit}>
                <div className="form-group">
                    <textarea
                        onChange={handleFieldChange}
                        value={message}
                        className="form-control"
                        placeholder="Your Comment"
                        name="message"
                        rows="5"
                    />
                </div>

                {renderError()}

                <div className="form-group pt-4 pb-4">
                    <button disabled={loading} className="btn btn-primary">
                        Comment &#10148;
                    </button>
                </div>
            </form>
        </React.Fragment>
    );
}
