import React from "react";

import WorkRequestForm from "./WorkRequestForm";

class WorkRequest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contactOpened: false
        };

        this.toggleContactForm = this.toggleContactForm.bind(this);
    }

    toggleContactForm(e) {
        this.setState({ contactOpened: !this.state.contactOpened });
    }

    render() {
        return (
            <div>
                <h4>Looking to hire or need a job done?</h4>
                <div>
                    <input className="button" type="button" value={this.state.contactOpened ? "Close" : "Contact"} onClick={this.toggleContactForm} />
                </div>

                <div className={this.state.contactOpened ? "" : "display-none"}>
                    <WorkRequestForm />
                </div>
            </div>
        );
    }
}

export default WorkRequest;
