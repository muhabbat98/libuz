
import { gql} from '@apollo/client';

export const ADD_READER = gql`
    mutation addReader(
        $username: String!
        $password: String!
        $email: String
        $phone: String
        $readerRole: Int
    ) {
        addReader(
            username: $username
            password: $password
            readerEmail: $email
            readerPhone: $phone
            readerRole: $readerRole
        )
    }
`
export const LOGIN_READER = gql`
    mutation loginReader(
        $username: String!,
        $password: String!
    ) {
        loginReader(
            username: $username,
            password: $password
        )
    }
`
export const READER_CREATE_QUESTION = gql`
    mutation createQuestion(
    $readerId: Int
    $questionText: String
    $theme: Int
    $library: Int
    ) {
    createQuestion(
        readerId: $readerId
        questionText: $questionText
        theme: $theme
        library: $library
    ) {
        questionId
        questionText
        theme
        library
        createdAt
    }
    }

`
export const ROOM_QUESTION = gql`
    mutation roomQuestion($roomId:Int $questionText:String){
    roomQuestion(roomId:$roomId, questionText:$questionText)
    }

`
export const CREATE_LIBRARIAN = gql`
    mutation AddLibrarian(
        $username: String
        $password: String
        $firstName: String
        $lastName: String
        $librarianPhone: String
        $library: Int
        ) {
        addLibrarian(
            username: $username
            password: $password
            firstName: $firstName
            lastName: $lastName
            librarianPhone: $librarianPhone
            library: $library
        ) 
    }
`

export const CREATE_READER = gql`
    mutation AddReader(
        $username: String
        $password: String
        $readerEmail: String
        $readerRole: Int
        $readerPhone:String
        ) {
        addReader(
            username: $username
            password: $password
            readerEmail: $readerEmail
            readerRole: $readerRole
            readerPhone:$readerPhone
        )
    }
`
export const CREATE_ROOM = gql`
    mutation CreateRoom($questionId:Int! $librarianId:Int!){
        createRoom(questionId:$questionId librarianId:$librarianId)
    }
`
export const CREATE_ANSWER = gql`
    mutation CreateAnswer(
        $questionId: Int!
        $librarianId: Int!
        $answerText: String
        
        ) {
        createAnswer(
            questionId: $questionId
            librarianId: $librarianId
            answerText: $answerText
        )
    }

`
export const UPDATE_STATUS_QUESTION = gql`
   mutation UpdateQuestionStatus($questionId:Int!){
        updateQuestionStatus(questionId:$questionId)
    }
`
// export const UPLOAD_FILE = gql`
//    mutation UploadFile($file:FileUpload!){
//         singleUpload(file:$file)
//     }
// `
export const CREATE_RECORD = gql`
    mutation CreateRecord(
        $title: String
        $fileId: Int
        $imageId: Int
        $creator:String
        $subject: String
        $description: String
        $type:String
        $source:String
        $relation:String
        $coverage:String
        $publisher:String
        $contributor:String
        $rights:String
        $date: String
        $format:String
        $identifier:String
        $language:String
        $audience:String
        $provenance:String
        $right_holders:String
        $instructional_method:String
        $accrual_method:String
        $accrual_periodicity:String
        $accrual_policy:String
        ) {
        createRecord(
            records: {
            title: $title
            fileId: $fileId
            imageId: $imageId
            creator:$creator
            subject: $subject
            description: $description
            type:$type
            source: $source
            relation:$relation
            coverage:$coverage
            publisher:$publisher
            contributor:$contributor
            rights:$rights
            date:$date
            format:$format
            identifier:$identifier
            language:$language
            audience:$audience
            provenance:$provenance
            right_holders:$right_holders
            instructional_method:$instructional_method
            accrual_method:$accrual_method
            accrual_periodicity:$accrual_periodicity
            accrual_policy:$accrual_policy
            }
        )
        }

`
export const DOWNLOADED = gql`
    mutation DownloadedRecord($fileId:Int!){
        dowloadedRecord(fileId:$fileId)
    }

`
