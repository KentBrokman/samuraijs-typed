import React from 'react';
import {actions} from "../../Redux/dialogues-reducer";
import {connect} from "react-redux";
import Dialogs from "./Dialogs";
import {Redirect} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {DialogsType, MessagesType} from "../../types/types";
import {AppStateType} from "../../Redux/Redux-store";

type MapStatePropsType = {
    dialogues: Array<DialogsType>
    dialoguesItem: {
        messages: Array<MessagesType>
    }
}
type MapDispatchPropsType = {
    addMessage: (formData: any) => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType

class DialogsContainer extends React.Component<PropsType> {
    render() {
        // if (!this.props.isAuth) return <Redirect to={'/login'} />
        return <Dialogs dialogues={this.props.dialogues}
                        dialoguesItem={this.props.dialoguesItem}
                        addMessage={this.props.addMessage}
        />
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogues: state.dialoguesPage.dialogues,
        dialoguesItem: state.dialoguesPage.dialogueItem,
    }
}

export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, { addMessage: actions.addMessage }),
    withAuthRedirect
)(DialogsContainer)

//<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>

// let AuthRedirectComponent = withAuthRedirect(DialogsContainer)
//
// export default connect(mapStateToProps, {addMessage, updateNewMessage})(AuthRedirectComponent);

