
import {gql} from '@apollo/client';

export const ROOM_QUESTION_SUBSCRIBE = gql`
    subscription($roomId:Int){
        newRoomQuestion(roomId:$roomId)
    }

`
export const SUBSCRIBE_STATUS = gql`
    subscription IsPublicSub($questionId:Int){
        isPublicSubscript (questionId:$questionId)
    }
`
export const SUBSCRIBE_DOWNLOAD = gql`
    subscription{
        subscribeDownload
    }
`