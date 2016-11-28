import * as React from "react";

interface CharacterProps {
    class: string;
    imgSrc: string;
}

export class Character extends React.Component<CharacterProps, {}> {
    render() {
        return (
            <div className={this.props.class}>
                <img src={this.props.imgSrc} />
            </div>
        );
    }
}