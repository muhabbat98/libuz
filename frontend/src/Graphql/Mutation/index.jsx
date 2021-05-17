
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