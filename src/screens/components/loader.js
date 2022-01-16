import React from 'react';
import { useEffect } from 'react';
import {Rings} from "react-loader-spinner";


export default function CustomLoader(props) {
    const [showLoader, setShowLoader] = React.useState(false);

    useEffect(() => {
        if (props.showLoader !== undefined) {
            setShowLoader(props.showLoader);
        }
    }, [props.showLoader]);


    return (
        <div>
            {showLoader ?
                <div style={{
                    "top": "50%",
                    "left": "50%",
                    "transform": "translate(-50%, -50%)",
                    "position" : "fixed",
                }}>
                    <Rings
                        color="#165FC7"
                        height={100}
                        width={100}
                        visible={showLoader ? true : false}
                    /> 
                     </div>
                :
                <div></div>
            }
        </div>
    );
}
