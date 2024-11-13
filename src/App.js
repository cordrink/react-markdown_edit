import './App.css';
import {sampleText} from "./sampleText";
import {useEffect, useState} from "react";
import {marked} from "marked";

function App() {

    const [sampleTxt, setSampleTxt] = useState(() => {
        const savedTxt = localStorage.getItem("sampleTxt");
        return savedTxt ? savedTxt : sampleText;
    });

    useEffect(() => {
        // met a jour le localstorage lorsque sampleTxt change avec une condition evitant un contenu vide
        if (sampleTxt) {
            localStorage.setItem("sampleTxt", sampleTxt);
        }
    }, [sampleTxt]);


    const handleChange = (e) => {
        const text = e.target.value;

        setSampleTxt(text);
    }

    const textRender = () => {
        let rawMarkup = marked.parse(sampleTxt);
        return {__html: rawMarkup}
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-6">
                    <textarea className={"form-control"} rows="35" value={sampleTxt} onChange={handleChange}></textarea>
                </div>
                <div className="col-sm-6">
                    <div dangerouslySetInnerHTML={textRender()}></div>
                </div>
            </div>
        </div>
    );
}

export default App;
