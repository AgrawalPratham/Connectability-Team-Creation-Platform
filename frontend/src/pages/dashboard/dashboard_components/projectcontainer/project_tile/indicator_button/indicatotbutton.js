import React, { useState } from 'react';
import '../indicator_button/indicatorbutton.css';

function IndicatorButton(props) {
    return (
        <div className={`indicatorbox ${props.completed_status ==true ? 'finished' : ''}`}>
            <div className="indicatortext">
                {props.completed_status == false ? 'Active' : 'Finished'}
            </div>
        </div>
    );
}

export default IndicatorButton;