import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    actions, getProfile, getStatus, savePhoto, saveProfile, updateStatus
} from "../../Redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {RouteComponentProps} from "react-router";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {profileApi} from "../../api/profile-api";
import {AppStateType} from "../../Redux/Redux-store";
import {ProfileType} from "../../types/types";

type MapPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchType = {
    setUserProfile: (profile: ProfileType) => void
    getProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}
type PathParamsType = {
    userId: string
}


type PropsType = MapPropsType & MapDispatchType & RouteComponentProps<PathParamsType>;

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {

        let userId: number | null = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorisedUserId;
            if(!userId) {
                this.props.history.push('/login')
            }
        }
        if (!userId) {
            console.error('ID should exist')
        } else {
            this.props.getProfile(userId)
            this.props.getStatus(userId)
        }

    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }
    render() {


        // if (!this.props.isAuth) return <Redirect to={'/login'} />
        return (
            <Profile profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
                     isOwner={!this.props.match.params.userId}
                     savePhoto={this.props.savePhoto}
                     saveProfile={this.props.saveProfile}
            />
        )
    }
}
// let AuthRedirectComponent = withAuthRedirect(ProfileContainer)
// let WithUrlProfileContainer = withRouter(AuthRedirectComponent);

let mapStateToProps = (state: AppStateType) => {
    return {
        profile: state.profilePage.profile as ProfileType,
        status: state.profilePage.status,
        authorisedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        setUserProfile: actions.setUserProfile,
        getProfile,
        getStatus,
        updateStatus,
        savePhoto,
        saveProfile
    }),
    withRouter,
    // withAuthRedirect
)(ProfileContainer)



// export default connect(mapStateToProps, {
//     setUserProfile,
//     getProfile
// })(WithUrlProfileContainer);