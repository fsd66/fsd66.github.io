import React from "react";

class WorkRequestForm extends React.Component {
    static defaultProps = {
        messageMaxLength: 300,
        submitMessage: "Thank you for your request, I will get back to you as soon as I can."
    }

    constructor(props) {
        super(props);

        this.state = {
            submitted: false,
            additionalInfoLength: 0
        }

        this.formData = {
            message: "",
            companyName: "",
            contactName: "",
            contactEmail: ""
        };

        this.countChars = this.countChars.bind(this);
        this.updateFormValue = this.updateFormValue.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    countChars(text, e) {
        this.setState({ additionalInfoLength: text.length });

        this.updateFormValue(e.target.name, text);
    }

    updateFormValue(name, value) {
        this.formData[name] = value;
    }

    submitForm(e) {
        e.preventDefault();
        this.setState({ submitted: true });

        fetch("https://api.fsd66.net/contact/", {
            method: "POST",
            credentials: "omit",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.formData)
        }).then(res => {
            return res.json();
        }).then(data => console.log("Data:", data)).catch(err => console.log("Error:", err));
    }

    render() {
        if (this.state.submitted) {
            return (
                <div>
                    {this.props.submitMessage}
                </div>
            );
        }

        const createSpecifyField = (formValue) => {
            const onChange = (value, e) => {
                this.updateFormValue(formValue, value);
            };

            return (
                <div>
                    <input type="text" placeholder="Please specify" className="form-input" onChange={(e) => onChange(e.target.value, e)} />
                </div>
            );
        };

        return (
            <div>
                <form className="work-form">
                    <div className="form-section">
                        <h4>Contact:</h4>
                    </div>

                    <div className="form-section">
                        <label className="form-label">Name: </label>
                        <input type="text" className="form-input" name="contactName" onChange={e => this.updateFormValue(e.target.name, e.target.value)} required={true} />
                    </div>

                    <div className="form-section">
                        <label className="form-label">Email: </label>
                        <input type="email" className="form-input" name="contactEmail" onChange={e => this.updateFormValue(e.target.name, e.target.value)} required={true} />
                    </div>

                    <div>
                        <label className="form-label">Message: </label>
                        <textarea className="form-input form-textarea" name="message" maxLength={this.props.messageMaxLength} onChange={e => this.countChars(e.target.value, e)} required={true}></textarea>
                    </div>

                    <div>
                        <input type="submit" className="form-input" value="Submit" onClick={e => this.submitForm(e)} />
                    </div>
                </form>
            </div>
        );
    }
}

export default WorkRequestForm;
