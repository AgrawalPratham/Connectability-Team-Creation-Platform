import React, { useState } from 'react';
import '../indicator_button/indicatorbutton.css';

function IndicatorButton({ flag }) {
    return (
        <div className={`indicatorbox ${flag === 0 ? 'finished' : ''}`}>
            <div className="indicatortext">
                {flag === 1 ? 'Active' : 'Finished'}
            </div>
        </div>
    );
}

export default IndicatorButton;