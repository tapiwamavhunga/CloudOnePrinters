import React from 'react';


const modal = (props) => {
    return (
        <div>
            <div className="modal-wrapper"
                style={{
                    transform: props.show ? 'translateY(-40vh)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                
                <div className="modal-body">
                    <p>
                        {props.children}
                    </p>
                    <button className="btn btn-danger" onClick={props.close}>No</button>
                    <button className="btn btn-primary  ml-10" onClick={props.delete}>Yes</button>
                </div>
                
            </div>
        </div>
    )
}

export default modal;
