import React, { useReducer, useMemo } from "react";
import "./DynamicForm.css";

const formConfig = [
  {
    pageName: "Borrower Company Info",
    fields: [
      { fieldId: "1", fieldName: "Property Name", type: "string", required: true, info:"Please fill the name as per identity" },
      { fieldId: "2", fieldName: "Property Type", type: "dropdown", selectableValues: ["Own House", "Rented"], },
      { fieldId: "3", fieldName: "Number of Units", type: "dropdown", selectableValues: ["1", "2"], required: true },
      { fieldId: "4", fieldName: "Property Address", type: "textarea", },
      { fieldId: "5", fieldName: "File Attachment", type: "file", required: true }
    ]
  },
  {
    pageName: "Director Info",
    fields: [
      { fieldId: "1", fieldName: "Director Name", type: "string", required: true },
      { fieldId: "2", fieldName: "Director Type", type: "dropdown", selectableValues: ["Owner", "Renter"], required: true }
    ]
  },
  {
    pageName: "Financial Info",
    fields: [
      { fieldId: "1", fieldName: "Director Name", type: "string", required: true },
      { fieldId: "2", fieldName: "Director Type", type: "dropdown", selectableValues: ["Owner", "Renter"], required: true }
    ]
  },
  {
    pageName: "Past Performance Info",
    fields: [
      { fieldId: "1", fieldName: "Director Name", type: "string", required: true },
      { fieldId: "2", fieldName: "Director Type", type: "dropdown", selectableValues: ["Owner", "Renter"], required: true }
    ]
  },
  {
    pageName: "Document Upload",
    fields: [
      { fieldId: "1", fieldName: "Director Name", type: "string", required: true },
      { fieldId: "2", fieldName: "Director Type", type: "dropdown", selectableValues: ["Owner", "Renter"], required: true }
    ]
  }
];

// Initial State
const initialState = {
  currentStep: 0,
  formData: {},
  completedSteps: []
};

// Reducer Function
const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.pageName]: {
            ...state.formData[action.pageName],
            [action.fieldId]: action.value
          }
        }
      };
    case "NEXT_STEP":
      if (state.currentStep < formConfig.length - 1) {
        return {
          ...state,
          currentStep: state.currentStep + 1,
          completedSteps: [...new Set([...state.completedSteps, state.currentStep])]
        };
      } 
      return state;
    case "PREV_STEP":
      if (state.currentStep > 0) {
        return { ...state, currentStep: state.currentStep - 1 };
      }
      return state;
    default:
      return state;
  }
};

const DynamicForm = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const currentPage = formConfig[state.currentStep];

  // Validate current step form
  const isFormValid = useMemo(() => {
    return currentPage.fields.every((field) => {
      const value = state.formData[currentPage.pageName]?.[field.fieldId];
      return !field.required || (value && value !== "");
    });
  }, [state.formData, state.currentStep]);

  const handleChange = (e, field) => {
    const value = field.type === "file" ? e.target.files[0] : e.target.value;
    dispatch({ type: "UPDATE_FIELD", pageName: currentPage.pageName, fieldId: field.fieldId, value });
  };

  const handleSubmit = () => {
    alert("Form Submitted Successfully!");
  };

  return (
    <div className="form-container">
      {/* Stepper */}
      <div className="stepper">
        {formConfig.map((step, index) => (
            <div
            key={index}
            className={`step 
                ${state.currentStep === index ? "active" : ""} 
                ${state.completedSteps.includes(index) ? "completed" : ""}`}
            >
            <div className="circle">{index + 1}</div>
            <p>{step.pageName}</p>
            </div>
        ))}
      </div>

      {/* Form Fields */}
      <div className="form">
        <h2 className="pageTitle">{currentPage.pageName}</h2>
        <div className="form-group">
            {currentPage.fields.map((field) => (
                <div key={field.fieldId} className={field.type === "textarea"? "form-fullWidth" : (field.type === "file" ? "form-fullWidth" : "form-field")}>
                    <label>
                        {field.fieldName} 
                        {field.info && ( // Show info icon only if field has tooltip text
                            <span className="info-icon" title={field.info}>ℹ️</span>
                        )}
                        <span className="mandatory">{field.required && " *"}</span>
                    </label>
                    
                    {field.type === "string" && (
                        <input type="text" className={field.fieldName == "Property Name" ? "propertyName" : ""} value={state.formData[currentPage.pageName]?.[field.fieldId] || ""} onChange={(e) => handleChange(e, field)} />
                    )}

                    {field.type === "dropdown" && (
                        <select value={state.formData[currentPage.pageName]?.[field.fieldId] || ""} onChange={(e) => handleChange(e, field)}>
                        <option value="">Select</option>
                        {field.selectableValues.map((option, idx) => (
                            <option key={idx} value={option}>{option}</option>
                        ))}
                        </select>
                    )}

                    {field.type === "textarea" && (
                        <textarea value={state.formData[currentPage.pageName]?.[field.fieldId] || ""} onChange={(e) => handleChange(e, field)} />
                    )}

                    {field.type === "file" && (
                        <input type="file" className="fileDotted" onChange={(e) => handleChange(e, field)} />
                    )}
                </div>                
            ))}
            </div>


        {/* Navigation Buttons */}
        <div className="buttons">
          <button className="secondary" onClick={() => dispatch({ type: "PREV_STEP" })} disabled={state.currentStep === 0}>
            Back
          </button>
          {state.currentStep < formConfig.length - 1 ? (
            <button 
              onClick={() => isFormValid && dispatch({ type: "NEXT_STEP" })} 
              className={isFormValid ? "primary" : "disabled"} 
              disabled={!isFormValid}>
              Next
            </button>
          ) : (
            <button 
              onClick={handleSubmit} 
              className={isFormValid ? "primary" : "disabled"} 
              disabled={!isFormValid}>
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DynamicForm;
