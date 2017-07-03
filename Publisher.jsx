import React from 'react';

class Publisher extends React.Component {
    constructor(props) {
        super(props);
        this.publishMsg = this.publishMsg.bind(this);
        this.publishedMsgSet = new Set();
        this.state = {publishedMsg: ""}
        this.onChangeHandle = this.onChangeHandle.bind(this);
        this.getPublishedMsgsOutput = this.getPublishedMsgsOutput.bind(this);
        this.clearMsgs = this.clearMsgs.bind(this);
    }

    publishMsg(event) {
        event.preventDefault();
        console.log(this.input.value);
        if (this.input.value) {
            this.state.inputVal = "";
            this.publishedMsgSet.add(this.input.value);
            this.props.glEventHub.emit('pub-sub-channel', this.input.value);
            this.setState({publishedMsg: this.input.value});
        } else {
            alert("No content to publish !")
        }
    }

    getPublishedMsgsOutput() {
        let output = [];
        for (let key of this.publishedMsgSet.values()) {
            output.push(<div>[Sent] {new Date().toTimeString()} [Message] - {key}</div>);
        }
        return output;
    }

    clearMsgs() {
        this.setState({publishedMsg: ""});
        this.publishedMsgSet.clear();
    }

    onChangeHandle(event) {
        this.setState({inputVal: event.target.value});
    }

    render() {
        return (
            <section>
                <form onSubmit={this.publishMsg}>
                    <label style={{marginRight: 10}}>
                        What do you want to publish
                    </label>
                    <input type="text" ref={(input) => this.input = input} value={this.state.inputVal}
                           onChange={this.onChangeHandle}/>
                    <br></br>
                    <input type="submit" value="Publish"/>
                    <br></br>
                    <h4 style={{display: "inline", marginRight: 10}}>Sent Messages</h4>
                    <input type="button" value="Clear" onClick={this.clearMsgs}/>
                </form>
                {this.getPublishedMsgsOutput()}
            </section>
        )
    }
}

export default Publisher;