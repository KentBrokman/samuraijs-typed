import {PhotosType, ProfileType} from "../types/types";
import {APIResponseType, instance, ResultCodesType} from "./api";


type SavePhotoProfileApiType = APIResponseType<{ photos: PhotosType }>

export const profileApi = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`)
            .then(response => response.data)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
            .then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put<APIResponseType>(`profile/status`, {status})
            .then(response => response.data)
    },
    savePhoto(file: any) {
        const formData = new FormData();
        formData.append("image", file);
        return instance.put<SavePhotoProfileApiType>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data)
    },
    saveProfile(profile: ProfileType) {
        return instance.put<APIResponseType>('profile', profile)
            .then(response => response.data)
    }
}