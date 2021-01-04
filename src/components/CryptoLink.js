import React from "react";

class CryptoLink extends React.Component {
    static defaultProps = {
        addresses: []
    }

    constructor(props) {
        super(props);

        this.state = {
            addresses: this.props.addresses
        };
    }

    componentDidMount() {
        fetch("https://api.fsd66.net/crypto/addresses", {
            method: "GET",
            credentials: "omit",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.formData)
        }).then(res => {
            return res.json();
        }).then(data => {
            this.setState({ addresses: data.addresses });
        }).catch(err => console.log("Error:", err));
    }

    render() {
        const donationAddresses = []
        this.state.addresses.forEach((v, i) => {
            donationAddresses.push((
                <li key={`coin-${v.type}-${i}`}><span>{v.type}</span> : <span>{v.address}</span></li>
            ));
        });

        const cryptoList = donationAddresses?.length > 0 ? (<ul>{donationAddresses}</ul>) : "Not currently accepting any cryptocurrency.";

        return (
            <div>
                <div>
                    Donate Crypto:
                </div>

                <div>
                    {cryptoList}
                </div>
            </div>
        );
    }
}

export default CryptoLink;
