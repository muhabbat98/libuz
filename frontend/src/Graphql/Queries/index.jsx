
import { gql} from '@apollo/client';

export const COURSES = gql`
    {
        courses {
            courseId
            courseType
            courseStatus
            courseName
            file
          }
    }
`
export const UNREADED_ANSWERS = gql`
    query ($readerId:Int){
        readerUnread(readerId:$readerId)
    }
`
export const LIBRARIES = gql`
   query{
        lib{
        libraryId
        libraryName
        }
    }
`
export const THEMES = gql`
   query{
        themes{
            themeId
            themeName
        }
    }
`
export const READER_ROOMS = gql`
  query($readerId:Int){
        readerRooms(readerId:$readerId)
    }
`
export const TEXT_ROOM = gql`
    query ($roomId:Int){
        rooms(roomId: $roomId) {
            roomId
            answers {
            question{
                questionId
                theme
                library
                questionText
                createdAt
            }
            answerText
            createdAt
            }
        
        }
        notAnsweredRoom(roomId: $roomId) {
            questionId
            questionText
            questionStatus
            createdAt
        }
    }
`
export const NOT_ANSWERED_ROOM = gql`
    query($roomId: Int) {
        notAnsweredRoom(roomId: $roomId) {
            questionId
            questionText
            questionStatus
            createdAt
        }
    }
`
export const NOT_ANSWERED_QUESTION= gql`
    query($readerId:Int){
        notAnsweredQuestion(readerId:$readerId){
            questionId
            questionText
            questionStatus
            createdAt
        }
    }
`
export const OTHER_QUESTION = gql`
    query($readerId: Int) {
        libUnread(readerId: $readerId) {
            questionId
            theme
            library
            questionText
            createdAt
        }
    }
`
export const READER_LIB_DATA = gql`
    query{
        lib{
            libraryId
            libraryName
        }
        readerRoles{
            roleId
            roleName
        }
    }
`
export const LIBRARIAN = gql`
   query($librarianId:Int){
    librarians(librarianId:$librarianId){
        librarianId
        username
        firstName
        lastName
        librarianPhone
        library
        }
    }
`
export const QUESTIONS = gql`
   query($page:Int, $limit:Int){
        unreaded(page:$page, limit:$limit){
            questionId
            questionText
            readerId
            theme
            library
            questionStatus
            createdAt
        }
    }
`
export const IS_PUBLIC = gql`
    query IsPublic ($questionId:Int!){
        isPublic(questionId:$questionId)
    }
`
export const BOOKS = gql`
    query($page: Int, $limit: Int) {
        records(page: $page, limit: $limit) {
            fieldId
            title
            fileId {
                fileId
                path
                filename
            }
            imageId {
                imageId
                path
                filename
            }
            creator
            subject
            description
            type
            source
            relation
            coverage
            publisher
            contributor
            rights
            date
            format
            identifier
            language
            audience
            provenance
            right_holders
            instructional_method
            accrual_method
            accrual_periodicity
            accrual_policy
            countOfDownloads
        }
    }
`
export const MOST_DOWNLOADED = gql`
    {
        mostDownloaded {
            fieldId
            title
            fileId {
                fileId
                path
                filename
            }
            imageId {
                imageId
                path
                filename
            }
            creator
            subject
            description
            type
            source
            relation
            coverage
            publisher
            contributor
            rights
            date
            format
            identifier
            language
            audience
            provenance
            right_holders
            instructional_method
            accrual_method
            accrual_periodicity
            accrual_policy
            countOfDownloads
        }
    }
`