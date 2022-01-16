import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';

export default function Comment(props) {
  const { id, name, body, email } = props.comment;
  const { callback,enableDelete } = props;
  const deleteClick = () => callback(id, props.comment);

  return (
    <div>
      <div className="d-flex flex-row-reverse">
       {enableDelete ? <DeleteIcon style={{
          color: "tomato", cursor: 'pointer', marginRight: "10px",
          marginBottom: "10px", marginTop: "10px"
        }} className="align-me" onClick={() => deleteClick()} /> : <div/>}
      </div>

      <div className="media mb-3">
        <div className="media-body p-2 shadow-sm rounded bg-light border ">
          <small className="float-end text-muted">{email}</small>
          <h6 className="mt-0 mb-1 text-muted pb-2">{name}</h6>
          {body}
        </div>
      </div>

    </div>
  );
}