import React from "react";

class WorkRequestForm extends React.Component {
    static defaultProps = {
        additionalInfoMaxLength: 300,
        defaultCompensationAmount: 150,
        defaultCompensationRate: "hr",
        submitMessage: "Thank you for your request, I will get back to you as soon as I can."
    }

    constructor(props) {
        super(props);

        this.state = {
            workTypeOther: false,
            workCategoryOther: false,
            submitted: false,
            additionalInfoLength: 0
        }

        this.formData = {
            workType: "",
            workCategory: "",
            workLength: "",
            timeframe: "",
            compensation: this.props.defaultCompensationAmount,
            compensationRate: this.props.defaultCompensationRate,
            additionalInfo: "",
            companyName: "",
            contactName: "",
            contactEmail: ""
        };

        this.countChars = this.countChars.bind(this);
        this.checkWorkTypeOther = this.checkWorkTypeOther.bind(this);
        this.checkWorkCategoryOther = this.checkWorkCategoryOther.bind(this);
        this.updateFormValue = this.updateFormValue.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    countChars(text, e) {
        this.setState({ additionalInfoLength: text.length });

        this.updateFormValue(e.target.name, text);
    }

    checkWorkTypeOther(type, e) {
        this.setState({ workTypeOther: type.toLowerCase() === "other" });

        this.updateFormValue(e.target.name, type);
    }

    checkWorkCategoryOther(category, e) {
        this.setState({ workCategoryOther: category.toLowerCase() === "other" });

        this.updateFormValue(e.target.name, category);
    }

    updateFormValue(name, value) {
        this.formData[name] = value;
    }

    submitForm(e) {
        e.preventDefault();
        console.log(this.formData);
        this.setState({ submitted: true });

        fetch("https://api.fsd66.net/contact/", {
            method: "POST",
            credentials: "omit",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.formData)
        }).then(res => {
            console.log("Response:", res);
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

        const specify = (
            <div>
                <input type="text" placeholder="Please specify" className="form-input" />
            </div>
        );
        const workTypeOther = this.state.workTypeOther ? specify : null;
        const workCategoryOther = this.state.workCategoryOther ? specify : null;

        return (
            <div>
                <form className="work-form">
                    <div>
                        <h4>Work Information:</h4>
                    </div>
                    <div className="form-section">
                        <label className="form-label">Type of work*: </label>
                        <select className="form-input wide-select" name="workType" onChange={e => this.checkWorkTypeOther(e.target.value, e)} defaultValue="" required={true}>
                            <option value="" disabled={true}>Please Select</option>
                            <option>New Project</option>
                            <option>Bug Fix</option>
                            <option>Maintenance</option>
                            <option>Research</option>
                            <option>Consulting</option>
                            <option>Other</option>
                        </select>

                        {workTypeOther}
                    </div>

                    <div className="form-section">
                        <label className="form-label">Category*: </label>
                        <select className="form-input wide-select" name="workCategory" onChange={e => this.checkWorkCategoryOther(e.target.value, e)} defaultValue="" required={true}>
                            <option value="" disabled={true}>Please Select</option>
                            <option>Web</option>
                            <option>Video Game</option>
                            <option>Backend / Server</option>
                            <option>Desktop Application</option>
                            <option>Mobile</option>
                            <option>Other</option>
                        </select>

                        {workCategoryOther}
                    </div>

                    <div className="form-section">
                        <label className="form-label">Length of work*: </label>
                        <select className="form-input wide-select" name="workLength" defaultValue="" onChange={e => this.updateFormValue(e.target.name, e.target.value)} required={true}>
                            <option value="" disabled={true}>Please Select</option>
                            <option>Full-time / Permanent</option>
                            <option>1 - 2 Weeks</option>
                            <option>2 - 4 Weeks</option>
                            <option>1 - 6 Months</option>
                            <option>6 - 12 Months</option>
                            <option>1+ Years</option>
                        </select>
                    </div>

                    <div className="form-section">
                        <label className="form-label">Timeframe*: </label>
                        <select className="form-input wide-select" name="timeframe" defaultValue="" onChange={e => this.updateFormValue(e.target.name, e.target.value)} required={true}>
                            <option value="" disabled={true}>Please Select</option>
                            <option>Immediately</option>
                            <option>This month</option>
                            <option>Next month</option>
                            <option>This year</option>
                        </select>
                    </div>

                    <div className="form-section">
                        <label className="form-label">Compensation*: </label>
                        $<input type="number" className="form-input number-input" name="compensation" defaultValue={this.props.defaultCompensationAmount} onChange={e => this.updateFormValue(e.target.name, e.target.value)} required={true} />
                        <select className="form-input" name="compensationRate" onChange={e => this.updateFormValue(e.target.name, e.target.value)} defaultValue={this.formData["compensationRate"]} required={true}>
                            <option value="hr">/ Hr</option>
                            <option value="yr">/ Yr</option>
                            <option value="total">Total</option>
                        </select>
                    </div>

                    <div>
                        <label className="form-label">Additional Information: </label>
                        <textarea className="form-input form-textarea" name="additionalInfo" maxLength={this.props.additionalInfoMaxLength} onChange={e => this.countChars(e.target.value, e)}></textarea>
                    </div>

                    <div className="form-section">
                        <h4>Contact Information:</h4>
                    </div>

                    <div className="form-section">
                        <label className="form-label">Company Name: </label>
                        <input type="text" className="form-input" name="companyName" onChange={e => this.updateFormValue(e.target.name, e.target.value)} />
                    </div>

                    <div className="form-section">
                        <label className="form-label">Contact Name*: </label>
                        <input type="text" className="form-input" name="contactName" onChange={e => this.updateFormValue(e.target.name, e.target.value)} required={true} />
                    </div>

                    <div className="form-section">
                        <label className="form-label">Email*: </label>
                        <input type="email" className="form-input" name="contactEmail" onChange={e => this.updateFormValue(e.target.name, e.target.value)} required={true} />
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
