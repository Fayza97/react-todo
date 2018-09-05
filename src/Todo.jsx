import React from 'react';

export default ({id, text, onDone}) => (
    <div className="row">
        <div className="col-md-9">
            <h3>{text}</h3>
        </div>
        <div className="col-md-3">
            <div className="btn-group btn-group-sm">
                <button onClick={() => onDone(id)} className="btn btn-info">
                    {'🐸'}
                </button>
                <button className="btn btn-danger">
                    {'x'}
                </button>
            </div>
        </div>
    </div>
);