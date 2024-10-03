const renderTitle = (title, design) => (
    <div className="p-2">
        <h3 className="text-[6vw] font-bold" style={{ color: design.questionColor }}>{title.val}</h3>
        {title?.description && (
            <p className="text-lg" style={{ color: design.answerColor }}>{title.description}</p>
        )}
    </div>
);

const renderQuestion = (question, design) => (
    <div className="p-2">
        <h3 className="text-[6vw] md:text-[3vw] font-bold" style={{ color: design.questionColor }}>{question.val}</h3>
        {question.description && (
            <p className="md:text-lg" style={{ color: design.answerColor }}>{question.description}</p>
        )}
    </div>
);

const renderInput = (input, inputIndex, pageId, formValues, handleChange, design) => {
    const inputName = `${pageId}-input-${inputIndex}`;
    return (
        <div key={inputName} className="mb-4">
            <label className="block text-sm font-medium mb-1" style={{ color: design.questionColor }}>{input.label}</label>
            <input
                type={input.type}
                name={inputName}
                placeholder={input.placeholder}
                className="p-2 outline-none border-b"
                style={{ 
                    borderColor: design.buttonColor,
                    color: design.answerColor,
                    backgroundColor: 'transparent'
                }}
                onChange={handleChange}
                value={formValues[inputName] || ''}
                minLength={input.minVal}
                maxLength={input.maxVal}
            />
        </div>
    );
};

const renderButton = (button, onClick, design) => (
    <button
        type="button"
        className="mt-4 p-2 text-center px-5 rounded"
        style={{ 
            backgroundColor: design.buttonColor,
            color: design.buttonTextColor
        }}
        onClick={onClick}
    >
        {button.val}
    </button>
);

const renderScale = (scale, scaleName, formValues, handleChange, design) => (
    <div className="mb-4">
        <label style={{ color: design.questionColor }}>{`1-${scale.val}`}</label>
        <input
            type="range"
            min="1"
            max={scale.val}
            name={scaleName}
            onChange={handleChange}
            value={formValues[scaleName] || '0'}
            style={{ accentColor: design.starRatingColor }}
        />
    </div>
);

const renderDropdown = (dropdown, dropdownName, formValues, handleChange, design) => (
    <div className="mb-4">
        <label style={{ color: design.questionColor }}>{dropdown.placeholder}</label>
        <select
            name={dropdownName}
            onChange={handleChange}
            value={formValues[dropdownName] || ''}
            className="p-2 outline-none border-b"
            style={{ borderColor: design.buttonColor, color: design.answerColor }}
        >
            <option value="" disabled>{dropdown.placeholder}</option>
            {dropdown.options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
            ))}
        </select>
    </div>
);

export { renderScale, renderInput, renderQuestion, renderTitle, renderButton, renderDropdown };
