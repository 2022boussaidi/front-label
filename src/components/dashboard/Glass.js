import './Glass.css'
import { useState } from 'react'
import axios from 'axios'

function Glass() {
  const [ProjectStartDate, setProjectStartDate] = useState('')
  const [ProjectEndDate, setProjectEndDate] = useState('')
  const [PerformanceScore, setPerformanceScore] = useState('')
  const [ProgressPercentage, setProgressPercentage] = useState('')
  const [result, setResult] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const params = { ProjectStartDate, ProjectEndDate, PerformanceScore, ProgressPercentage }

    // You can add a description here to explain the utility of this feature
    const description = "This feature predicts XYZ based on the provided project data."

    axios.post('http://127.0.0.1:5004/predict/XGBoost_2_AutoML_1_20230930_234233', params)
      .then((res) => {
        const data = res.data.Prediction;
        const parameters = JSON.stringify(params);
        const msg = `Prediction: ${data} \nParameters: ${parameters}`;
        alert(msg);
        setResult(msg);
        reset();
      })
      .catch((error) => alert(`Error: ${error.message}`))
  }

  const reset = () => {
    setProjectStartDate('')
    setProjectEndDate('')
    setPerformanceScore('')
    setProgressPercentage('')
  }

  return (
    
    <div className="glass">
     <h2>Project Data Prediction</h2>
<p>Use this feature to predict the outcome of your project based on the provided data. Follow these steps to make a prediction:</p>
<ol>
  <li>Enter the project's start date in the "Project Start Date" field.</li>
  <li>Enter the project's end date in the "Project End Date" field.</li>
  <li>Provide the performance score in the "Performance Score" field (e.g., a numerical value).</li>
  <li>Specify the progress percentage in the "Progress Percentage" field (e.g., a number between 0 and 100).</li>
  <li>Click the "Submit" button to get the prediction result.</li>
</ol>
<p>The prediction result will be displayed below, showing the projected outcome based on the provided information. Please ensure that all fields are filled out correctly before submitting.</p>

     
      <form onSubmit={(e) => handleSubmit(e)} className="glass__form">
       
        <div className="glass__form__group">
          <input
            id="gender"
            className="glass__form__input"
            placeholder="Project start date"
            required
            type="text"
            value={ProjectStartDate}
            onChange={(e) => setProjectStartDate(e.target.value)}
          />
        </div>

        <div className="glass__form__group">
          <input
            id="bsc"
            className="glass__form__input"
            placeholder="Project end date"
            required
            type="text"
            title="Project end date"
            value={ProjectEndDate}
            onChange={(e) => setProjectEndDate(e.target.value)}
          />
        </div>

        <div className="glass__form__group">
          <input
            id="workex"
            className="glass__form__input"
            placeholder="Performance score"
            required
            type="text"
            value={PerformanceScore}
            onChange={(e) => setPerformanceScore(e.target.value)}
          />
        </div>

        <div className="glass__form__group">
          <input
            id="etest_p"
            className="glass__form__input"
            placeholder="Progress percentage"
            required
            type="text"
            value={ProgressPercentage}
            onChange={(e) => setProgressPercentage(e.target.value)}
          />
        </div>

        <div className="glass__form__group">
          <button type="submit" className="glass__form__btn">
            Submit
          </button>
        </div>
      </form>
     
      <p>{result}</p>
     
      
    
    </div>
   
  )
}

export default Glass
